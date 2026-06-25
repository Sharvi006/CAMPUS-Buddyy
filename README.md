# CAMPUS Buddyy 🎓🤖

CAMPUS Buddyy is an AI-powered, friendly chatbot designed to solve real-world problems and answer college-related queries for students. Built with a modern Retrieval-Augmented Generation (RAG) architecture, it grounds its answers in a custom knowledge base by extracting information from uploaded documents (PDFs and Text files).

## 🌟 Features

- **Secure Authentication & RBAC**: Fully integrated JWT authentication with Role-Based Access Control. Admin users can manage the knowledge base, while Student users can chat with the AI.
- **Persistent User Database**: Uses a local SQLite database and SQLAlchemy, secured with bcrypt password hashing.
- **Friendly Persona-based Chat**: The assistant "Buddyy" interacts casually and professionally, maintaining a helpful persona.
- **RAG Architecture with Source Citations**: Answers are strictly based on the provided document context using Google's Gemini 2.5 Flash model. Every answer appends a `[Source: filename.pdf]` citation to guarantee transparency and reduce hallucinations.
- **Advanced File Management**: Upload multiple PDFs or TXT files via drag-and-drop. Easily view the active knowledge base and selectively delete files to clear orphaned vectors.
- **Fast Local Embeddings**: Utilizes HuggingFace's `all-MiniLM-L6-v2` for efficient, offline vector embeddings.
- **Persistent Vector Storage**: Stores document chunks locally using ChromaDB for persistent and fast retrieval.
- **Modern User Interface**: A responsive and beautiful frontend built with React, Tailwind CSS, and shadcn/ui.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI, Lucide React
- **State Management**: React Query, React Context (Auth), React Router DOM

### Backend (RAG & Auth)
- **Framework**: FastAPI, Python
- **Database**: SQLite with SQLAlchemy ORM
- **Security**: PyJWT for session management, passlib/bcrypt for password hashing
- **LLM Engine**: Google Gemini 2.5 Flash (`google-generativeai`)
- **Orchestration**: LangChain
- **Vector Database**: ChromaDB
- **Embeddings**: HuggingFace (`all-MiniLM-L6-v2`)
- **Document Processing**: PyMuPDF (`fitz`) for robust PDF parsing

## 🏗️ System Architecture & Hybrid RAG Workflow

This project is structured as a monorepo splitting production-ready serverless logic and heavy data-processing tasks:

* **Local Python RAG Backend (`/rag-backend`)**: Used for executing heavy document processing, text chunking, and managing localized vector embeddings. This acts as our core pipeline for developing, testing, and iterating on structural campus knowledge.
* **Supabase Edge Functions (`/frontend/supabase`)**: Handles lightweight authentication, quick data caching, and entry-point API requests. This hybrid design allows us to easily scale client-facing operations onto serverless infrastructure as bot traffic picks up.

## 📂 Project Structure

```
CAMPUS Buddyy/
├── frontend/             # React/Vite Frontend Application
│   ├── src/              # React components, pages, and auth context
│   ├── .env              # Frontend environment variables (API URLs)
│   └── package.json      # Frontend dependencies
├── rag-backend/          # FastAPI RAG Backend Application
│   ├── main.py           # Core FastAPI application and endpoints
│   ├── database.py       # SQLAlchemy engine and session setup
│   ├── models.py         # SQLite database models
│   ├── .env              # Secure backend secrets and API keys
│   ├── requirements.txt  # Python dependencies
│   ├── users.db          # Persistent SQLite user database (auto-generated)
│   └── chroma_db/        # Persistent local vector database (auto-generated)
└── start_app.bat         # Windows batch script to launch both servers
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+ recommended)
- **Python** (v3.9+)
- **Google API Key** (for Gemini LLM access)

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd rag-backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up your secure environment variables. Create a `.env` file in `rag-backend` and add your keys:
   ```env
   GOOGLE_API_KEY=your_google_api_key_here
   JWT_SECRET_KEY=generate_a_secure_random_string
   DATABASE_URL=sqlite:///./users.db
   ```
5. Start the FastAPI server:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
   *Note: On its first boot, the server will automatically create `users.db` and seed it with two default accounts (`admin@campus.edu` / `adminpassword` and `student@campus.edu` / `studentpassword`).*

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_BASE_URL=http://127.0.0.1:8000
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### 3. Quick Start (Windows Only)
You can use the included batch file to safely start both the backend and frontend concurrently in the correct environments.
```bash
.\start_app.bat
```

## 🔌 API Endpoints

- **Auth**
  - `POST /api/login`: Validates credentials against SQLite database and returns a signed JWT.
- **RAG & Files** (Protected Endpoints)
  - `POST /upload`: (Admin Only) Accepts multi-part file uploads (`.pdf`, `.txt`), chunks text, and stores them in ChromaDB with source metadata.
  - `GET /api/files`: (Admin Only) Lists all active knowledge base documents by extracting unique source metadata.
  - `DELETE /api/files/{filename}`: (Admin Only) Permanently purges specific files and their vector chunks from ChromaDB.
  - `POST /chat`: Accepts a JSON payload and returns an AI-generated answer complete with `[Source]` citations based on the stored document context.

## 📜 License
This project is open-source and free to use.
