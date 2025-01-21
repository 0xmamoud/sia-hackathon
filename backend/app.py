import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pathlib import Path
from docling.document_converter import DocumentConverter

app = FastAPI()

# Request body structure
class ProcessInput(BaseModel):
    path: str
    name: str

@app.post("/run-process/")
async def run_process(input_data: ProcessInput):
    try:
        path = Path(input_data.path)
        names = input_data.name

        if isinstance(names, str):
            names = [names]

        if not path.exists() or not path.is_dir():
            raise HTTPException(
                status_code=400, 
                detail=f"The provided path '{input_data.path}' does not exist or is not a directory."
            )

        results = {}
        for name in names:
            file_path = path / name

            if not file_path.exists() or not file_path.is_file():
                raise HTTPException(
                    status_code=400, 
                    detail=f"The file '{file_path}' does not exist or is not a valid file."
                )

            try:
                converter = DocumentConverter()
                result = converter.convert(str(file_path))

                output_name = f"{file_path.stem}.md"
                output_path = path / output_name
                with open(output_path, "w", encoding="utf-8") as md_file:
                    md_file.write(result.document.export_to_markdown())

                results[name] = str(output_path)
                print(f"File converted and saved: {output_path}")

            except Exception as e:
                print(f"Error converting file {name}: {e}")
                raise HTTPException(
                    status_code=500,
                    detail=f"Error converting file '{name}': {str(e)}"
                )

        return {"status": "success", "converted_files": results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
