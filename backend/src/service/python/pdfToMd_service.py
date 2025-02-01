# RUN: uvicorn service.python.pdfToMd.service:app --reload

import os
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from tempfile import NamedTemporaryFile
from docling.document_converter import DocumentConverter

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Remplacez par l'URL de votre client
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProcessInput(BaseModel):
    file_buffer: bytes

@app.post("/run-process/")
async def run_process(file: UploadFile = File(...)):
    try:
        file_buffer = await file.read()

        with NamedTemporaryFile(delete=False, suffix=f".{file.filename.split('.')[-1]}") as temp_file:
            temp_file.write(file_buffer)
            temp_file_path = temp_file.name

        try:
            converter = DocumentConverter()
            result = converter.convert(temp_file_path)

            markdown_content = result.document.export_to_markdown()

            os.unlink(temp_file_path)

            return {"status": "success", "markdown_content": markdown_content}

        except Exception as e:
            if os.path.exists(temp_file_path):
                os.unlink(temp_file_path)
            raise HTTPException(
                status_code=500,
                detail=f"Error converting file: {str(e)}"
            )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
    
@app.get("/")
async def root():
    return {"message": "Welcome to PDF to Markdown Service!"}