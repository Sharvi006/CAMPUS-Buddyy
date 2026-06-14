# FastAPI RAG Backend

This represents a fully functional Retrieval-Augmented Generation (RAG) backend API leveraging FastAPI, LangChain, ChromaDB, and Google's Gemini 2.5 Flash.

## Overview

This backend is designed to handle uploading PDF documents, extracting and storing the resulting text into a persistent local vector database (ChromaDB), and then querying that document context using LangChain and a Gemini LLM to return grounded answers.

It includes:
- **`POST /upload`**: Takes a PDF via `multipart/form-data`, reads the text, creates embeddings using `embedding-001`, and stores it in ChromaDB.
- **`POST /chat`**: Takes a JSON query payload, retrieves relevant chunks from ChromaDB, and asks Gemini 2.5 Flash a question.

CORS middleware is also configured so your React frontend (or other clients) can communicate seamlessly with the endpoints.

## Prerequisites
- Python 3.9+ installed natively or via Conda
- A valid Google API Key

## Setup and Run

1. **Install Dependencies**
   It's recommended to create a virtual environment first.
   ```bash
   python -m venv venv
   # On Windows (Command Prompt):
   venv\Scripts\activate.bat
   # On Windows (PowerShell):
   .\venv\Scripts\Activate.ps1
   # On Linux/MacOS:
   source venv/bin/activate
   ```
   Then install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure Environment Variable**
   You need to provide your Google API Key so the Gemini embeddings and ChatGenAI can function.
   
   **Windows Command Prompt:**
   ```cmd
   set GOOGLE_API_KEY=your_actual_api_key_here
   ```
   
   **Windows PowerShell:**
   ```powershell
   $env:GOOGLE_API_KEY="your_actual_api_key_here"
   ```
   
   **Linux/MacOS:**
   ```bash
   export GOOGLE_API_KEY=your_actual_api_key_here
   ```

3. **Start the Development Server**
   Start the FastAPI app via `uvicorn`:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
   Or execute the script directly:
   ```bash
   python main.py
   ```

## Test Execution Environment
Ensure the local server spins up properly on port `8000`. You can test endpoints via the Swagger UI available at:
[http://localhost:8000/docs](http://localhost:8000/docs)
