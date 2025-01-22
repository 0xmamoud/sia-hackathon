import os
from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
from tempfile import NamedTemporaryFile
from docling.document_converter import DocumentConverter

app = FastAPI()

# Request body structure
class ProcessInput(BaseModel):
    file_buffer: bytes  # Buffer du fichier

@app.post("/run-process/")
async def run_process(file: UploadFile = File(...)):
    try:
        # Lire le contenu du fichier uploadé
        file_buffer = await file.read()

        # Créer un fichier temporaire pour le traitement
        with NamedTemporaryFile(delete=False, suffix=f".{file.filename.split('.')[-1]}") as temp_file:
            temp_file.write(file_buffer)
            temp_file_path = temp_file.name

        try:
            # Convertir le fichier en Markdown
            converter = DocumentConverter()
            result = converter.convert(temp_file_path)

            # Exporter le résultat en Markdown
            markdown_content = result.document.export_to_markdown()

            # Supprimer le fichier temporaire
            os.unlink(temp_file_path)

            # Retourner le contenu Markdown
            return {"status": "success", "markdown_content": markdown_content}

        except Exception as e:
            # Supprimer le fichier temporaire en cas d'erreur
            if os.path.exists(temp_file_path):
                os.unlink(temp_file_path)
            raise HTTPException(
                status_code=500,
                detail=f"Error converting file: {str(e)}"
            )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")