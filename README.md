# CAMPUS Buddyy 🎓🤖

CAMPUS Buddyy is an AI-powered, friendly chatbot designed to solve real-world problems and answer college-related queries for students. Built with a modern Retrieval-Augmented Generation (RAG) architecture, it grounds its answers in a custom knowledge base by extracting information from uploaded documents (PDFs and Text files).

## 🌟 Features

- **Friendly Persona-based Chat**: The assistant "Buddyy" interacts casually and professionally, maintaining a helpful persona.
- **RAG Architecture**: Answers are strictly based on the provided document context using Google's Gemini 2.5 Flash model.
- **Multi-Document Support**: Upload multiple PDFs or TXT files at once.
- **Fast Local Embeddings**: Utilizes HuggingFace's `all-MiniLM-L6-v2` for efficient, offline vector embeddings.
- **Persistent Vector Storage**: Stores document chunks locally using ChromaDB for persistent and fast retrieval.
- **Modern User Interface**: A responsive and beautiful frontend built with React, Tailwind CSS, and shadcn/ui.
- **API Documentation**: Built-in Swagger UI for easy backend testing and API exploration.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI, Lucide React
- **State Management / Data Fetching**: React Query, React Router DOM
- **Other Tools**: Recharts (for analytics), Embla Carousel

### Backend (RAG)
- **Framework**: FastAPI, Python
- **LLM Engine**: Google Gemini 2.5 Flash (`google-generativeai`)
- **Orchestration**: LangChain
- **Vector Database**: ChromaDB
- **Embeddings**: HuggingFace (`all-MiniLM-L6-v2`) via `langchain-huggingface`
- **Document Processing**: PyMuPDF (`fitz`) for robust PDF parsing

## 🏗️ System Architecture & Hybrid RAG Workflow

This project is structured as a monorepo splitting production-ready serverless logic and heavy data-processing tasks:

* **Local Python RAG Backend (`/rag-backend`)**: Used for executing heavy document processing, text chunking, and managing localized vector embeddings. This acts as our core pipeline for developing, testing, and iterating on structural campus knowledge.
* **Supabase Edge Functions (`/frontend/supabase`)**: Handles lightweight authentication, quick data caching, and entry-point API requests. This hybrid design allows us to easily scale client-facing operations onto serverless infrastructure as bot traffic picks up.

* 
## 📂 Project Structure

```
CAMPUS Buddyy/
├── frontend/             # React/Vite Frontend Application
│   ├── src/              # React components, pages, and hooks
│   ├── public/           # Static assets
│   ├── package.json      # Frontend dependencies
│   └── tailwind.config.ts# Tailwind styling configuration
├── rag-backend/          # FastAPI RAG Backend Application
│   ├── main.py           # Core FastAPI application and endpoints
│   ├── requirements.txt  # Python dependencies
│   └── chroma_db/        # Persistent local vector database (auto-generated)
├── start_app.bat         # Windows batch script to launch both servers
└── README.md             # Project documentation (You are here)
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
4. Set up your environment variables. Create a `.env` file in `rag-backend` and add your API key:
   ```env
   GOOGLE_API_KEY=your_google_api_key_here
   ```
5. Start the FastAPI server:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
   *The API will be available at http://localhost:8000. You can explore the Swagger UI at http://localhost:8000/docs.*

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will typically be accessible at http://localhost:5173.*

### 3. Quick Start (Windows Only)
You can use the included batch file to start both the backend and frontend concurrently. 
*Note: Ensure the folder paths inside `start_app.bat` match your directory names.*
```bash
.\start_app.bat
```

## 🔌 API Endpoints

- `POST /upload`: Accepts multi-part file uploads (`.pdf`, `.txt`), chunks the text, creates embeddings using HuggingFace, and stores them in ChromaDB.
- `POST /chat`: Accepts a JSON payload `{"query": "your question"}` and returns an AI-generated answer based on the stored document context.

## 📜 License
This project is open-source and free to use.
