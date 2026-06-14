import os
from dotenv import load_dotenv

load_dotenv(override=True)  # Load environment variables from .env and OVERRIDE existing ones

# If not in environment, you can set it here for local testing, but it's better to use a .env file!
if not os.environ.get("GOOGLE_API_KEY"):
    print("WARNING: GOOGLE_API_KEY is not set in the environment.")

import io
import uvicorn
from typing import List
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.openapi.utils import get_openapi
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import fitz  # 🚀 NEW: This is PyMuPDF (The heavy-duty PDF reader)

# LangChain and Gemini imports
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_huggingface import HuggingFaceEmbeddings # 🚀 Offline embeddings
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

app = FastAPI(title="FastAPI RAG Backend with Gemini and ChromaDB", openapi_version="3.0.2")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CHROMA_PERSIST_DIR = "./chroma_db"

print("Initializing AI Models... (This takes a few seconds)")
global_embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
global_vectorstore = Chroma(persist_directory=CHROMA_PERSIST_DIR, embedding_function=global_embeddings)
global_llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.2)

@app.post("/upload")
async def upload_documents(files: List[UploadFile] = File(...)):
    try:
        all_chunks = []
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
                
        if not all_chunks:
            raise HTTPException(status_code=400, detail="No extractable text found in any of the uploaded files.")
            
        # Convert to embeddings and store in ChromaDB
        global_vectorstore.add_texts(texts=all_chunks)
        
        return {
            "message": "Documents processed and stored successfully",
            "filenames": filenames,
            "total_chunks_stored": len(all_chunks)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing documents: {str(e)}")

class ChatRequest(BaseModel):
    query: str

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        query_lower = request.query.lower().strip()
        if "what can you help me with" in query_lower or "what can you do" in query_lower:
            return {
                "query": request.query,
                "answer": "I am CAMPUS Buddy! I can help you answer questions based on the documents you've uploaded. For example, you can ask me to extract information, explain concepts, or find specific details from the text."
            }
            
        retriever = global_vectorstore.as_retriever(search_kwargs={"k": 10})
        
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
        
        def format_docs(docs):
            return "\n\n".join(doc.page_content for doc in docs)
        
        rag_chain = (
            {"context": retriever | format_docs, "question": RunnablePassthrough()}
            | prompt
            | llm
            | StrOutputParser()
        )
        
        answer = rag_chain.invoke(request.query)
        
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
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)