from pydantic import BaseModel
from pathlib import Path
from typing import List, Dict, Any
from docling.document_converter import DocumentConverter
from runner import Step
from docling.document_converter import DocumentConverter


class ReadAndConvert(Step):
    
    def __init__(self, **kwargs):
        super().__init__(input_keys=["path", "name"], **kwargs)

    def run(self, input_data: Dict[str, Any], **runtime_args) -> Dict[str, Any]:
        self.validate_input(input_data)
        
        path = Path(input_data["path"])
        names = input_data["name"]
        if isinstance(names, str):
            names = [names] 
        if not path.exists() or not path.is_dir():
            raise FileNotFoundError(f"Le path fourni '{input_data['path']}' ne semble pas exister.")
    
        results = {}
        for name in names:
            file_path = path / name
            if not file_path.exists() or not file_path.is_file():
                raise FileNotFoundError(f"Le fichier '{file_path}' n'existe pas ou n'est pas un fichier valide.")
            try :
                converter = DocumentConverter()
                result = converter.convert(str(file_path))

                output_name = f"{file_path.stem}.json"
                output_path = path / output_name
                with open(output_path, "w", encoding="utf-8") as json_file:
                    json_file.write(result.document.export_to_markdown())
                
                results[name] = str(output_path)
                print(f"Fichier converti et sauvegardé : {output_path}")

            except Exception as e:
                print(f"Erreur lors de la conversion du fichier {name} : {e}")
        
        return {"converted_files": results}