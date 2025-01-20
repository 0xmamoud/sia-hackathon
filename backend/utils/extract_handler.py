from pydantic import BaseModel
from typing import List
import json

class ExtractHandler:
    
    def __init__(self, config: dict, system_prompt: str, step: str):
        """
        model: The model to be used (e.g., "gpt-4").
        """
        self.config = config
        self.system_prompt = system_prompt
        self.step = step
        
    
    def process_document(self, doc_path, client_openai):
        """
        Processes a single document.
        """
        
        try:
            with open(doc_path, "r", encoding="utf-8", errors="replace") as file:
                raw_content = file.read()  # Read content as a string
                clean_content = raw_content.replace("�", " ")  # Replace invalid characters with blanks
            
            # Check if the content is empty
            if not clean_content.strip():
                raise RuntimeError(f"Le fichier '{doc_path}' est vide ou contient uniquement des espaces.")
            
            # Prepare the content for the API
            doc_text = clean_content  # Use the clean Markdown content directly

            completion = client_openai.beta.chat.completions.parse(
                model=self.config["model"],
                messages=[
                    {"role": "system", "content": self.system_prompt},
                    {"role": "user", "content": doc_text},
                ],
                response_format=self.config["struct_output"][self.step],
            )
           
        except Exception as e:
            raise RuntimeError(f"Erreur lors du call API: {e}")
        return completion.choices[0].message.parsed
