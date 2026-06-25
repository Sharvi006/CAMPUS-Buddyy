import os
from dotenv import load_dotenv

load_dotenv(override=True)  # Load environment variables from .env and OVERRIDE existing ones

# If not in environment, you can set it here for local testing, but it's better to use a .env file!
if not os.environ.get("GOOGLE_API_KEY"):
    print("WARNING: GOOGLE_API_KEY is not set in the environment.")

import io
import uvicorn
from typing import List
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.openapi.utils import get_openapi
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import fitz  # 🚀 NEW: This is PyMuPDF (The heavy-duty PDF reader)
import jwt
from datetime import datetime, timedelta, timezone

from sqlalchemy.orm import Session
import bcrypt

import models
from database import engine, get_db

# --- AUTH CONFIG ---
SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
if not SECRET_KEY:
    raise ValueError("FATAL ERROR: JWT_SECRET_KEY is missing from the environment. Please set it in your .env file.")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

security = HTTPBearer()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
            
        user = db.query(models.User).filter(models.User.username == username).first()
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
            
        return {"username": user.username, "role": user.role}
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

# LangChain and Gemini imports
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_huggingface import HuggingFaceEmbeddings # 🚀 Offline embeddings
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

app = FastAPI(title="FastAPI RAG Backend with Gemini and ChromaDB", openapi_version="3.0.2")

@app.on_event("startup")
def on_startup():
    print("Initializing Database...")
    models.Base.metadata.create_all(bind=engine)
    
    # Seed default users if DB is empty
    db = next(get_db())
    if not db.query(models.User).first():
        print("Seeding initial users...")
        admin = models.User(
            username="admin@campus.edu",
            hashed_password=get_password_hash("adminpassword"),
            role="admin"
        )
        student = models.User(
            username="student@campus.edu",
            hashed_password=get_password_hash("studentpassword"),
            role="student"
        )
        db.add(admin)
        db.add(student)
        db.commit()
    db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://campus-buddy-frontend.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CHROMA_PERSIST_DIR = "./chroma_db"

print("Initializing AI Models... (This takes a few seconds)")
global_embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
global_vectorstore = Chroma(persist_directory=CHROMA_PERSIST_DIR, embedding_function=global_embeddings)
global_llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.2)

class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/api/login")
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == request.username).first()
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid ID or password")
        
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": request.username, "role": user.role}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "role": user.role}

@app.post("/upload")
async def upload_documents(files: List[UploadFile] = File(...), current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to upload documents")
    try:
        all_chunks = []
        all_metadatas = []
        filenames = []
        
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
        )
        
        for file in files:
            contents = await file.read()
            text = ""
            
            # 🚀 Handle PDFs
            if file.filename.lower().endswith(".pdf"):
                doc = fitz.open(stream=contents, filetype="pdf")
                for page in doc:
                    text += page.get_text()
                    
            # 🚀 Handle Text Files (The Hackathon Shortcut)
            elif file.filename.lower().endswith(".txt"):
                text = contents.decode("utf-8")
                
            else:
                continue # Skip unsupported files
                
            if text.strip():
                filenames.append(file.filename)
                chunks = text_splitter.split_text(text)
                all_chunks.extend(chunks)
                all_metadatas.extend([{"source": file.filename}] * len(chunks))
                
        if not all_chunks:
            raise HTTPException(status_code=400, detail="No extractable text found in any of the uploaded files.")
            
        # Convert to embeddings and store in ChromaDB with metadata
        global_vectorstore.add_texts(texts=all_chunks, metadatas=all_metadatas)
        
        return {
            "message": "Documents processed and stored successfully",
            "filenames": filenames,
            "total_chunks_stored": len(all_chunks)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing documents: {str(e)}")

@app.get("/api/files")
async def get_files(current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    try:
        results = global_vectorstore.get()
        metadatas = results.get("metadatas", [])
        
        sources = set()
        if metadatas:
            for meta in metadatas:
                if meta and "source" in meta:
                    sources.add(meta["source"])
                    
        return {"files": list(sources)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/files/{filename}")
async def delete_file(filename: str, current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    try:
        results = global_vectorstore.get(where={"source": filename})
        ids = results.get("ids", [])
        if not ids:
            raise HTTPException(status_code=404, detail="File not found in database")
        
        global_vectorstore.delete(ids=ids)
        return {"message": f"Successfully deleted {filename}"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class ChatRequest(BaseModel):
    query: str

@app.post("/chat")
async def chat(request: ChatRequest, current_user: dict = Depends(get_current_user)):
    try:
        query_lower = request.query.lower().strip()
        if "what can you help me with" in query_lower or "what can you do" in query_lower:
            return {
                "query": request.query,
                "answer": "I am CAMPUS Buddy! I can help you answer questions based on the documents you've uploaded. For example, you can ask me to extract information, explain concepts, or find specific details from the text."
            }
            
        retriever = global_vectorstore.as_retriever(search_kwargs={"k": 10})
        
        # Retrieve documents explicitly so we can extract metadata
        docs = retriever.invoke(request.query)
        
        # Extract unique sources
        sources = set()
        for doc in docs:
            if "source" in doc.metadata:
                sources.add(doc.metadata["source"])
        
        llm = global_llm
        
        # 🚀 NEW: A smarter, friendlier prompt!
        template = """You are a helpful and friendly assistant named Buddyy.
If the user says a casual greeting like "hello" or "hi", respond with exactly: "Hello! I'm Buddyy, your friendly assistant."
For specific questions, use the following document context to answer. 
If the answer is not in the context, just say "I don't have that information in my current documents."

Context:
{context}

Question: {question}

Answer:
"""
        prompt = PromptTemplate.from_template(template)
        
        def format_docs(documents):
            return "\n\n".join(doc.page_content for doc in documents)
            
        context_str = format_docs(docs)
        
        rag_chain = prompt | llm | StrOutputParser()
        
        answer = rag_chain.invoke({"context": context_str, "question": request.query})
        
        # Append citations if we actually used the documents to answer
        if sources and "I don't have that information" not in answer and "Hello! I'm Buddyy" not in answer:
            citation_str = ", ".join(sources)
            answer += f"\n\n[Source: {citation_str}]"
        
        return {
            "query": request.query,
            "answer": answer
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating answer: {str(e)}")

@app.get("/")
async def root():
    return {"message": "FastAPI RAG Backend is running."}

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="FastAPI RAG Backend with Gemini and ChromaDB",
        version="0.1.0",
        openapi_version="3.0.2",
        routes=app.routes,
    )
    # Fix the multiple files upload bug in Swagger UI
    if "Body_upload_documents_upload_post" in openapi_schema.get("components", {}).get("schemas", {}):
        schema = openapi_schema["components"]["schemas"]["Body_upload_documents_upload_post"]
        if "properties" in schema and "files" in schema["properties"]:
            schema["properties"]["files"]["items"] = {
                "type": "string",
                "format": "binary"
            }
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)