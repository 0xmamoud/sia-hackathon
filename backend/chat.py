import json
from typing import Dict, Any
from pathlib import Path
from llama_index.llms.huggingface_api import HuggingFaceInferenceAPI
import os
from dotenv import load_dotenv

load_dotenv()

class MemoryManager:
    def __init__(self, memory_file: str = "memory.json"):
        self.memory_file = memory_file
        self.memory = self.load_memory()

    def load_memory(self) -> Dict[str, Any]:
        try:
            with open(self.memory_file, "r") as file:
                return json.load(file)
        except (FileNotFoundError, json.JSONDecodeError):
            return {}

    def clear_memory(self) -> None:
        with open(self.memory_file, "w") as file:
            pass

    def append_to_memory(self, interaction: Dict[str, str]) -> None:
        # print(f"Appending to memory : {interaction}")
        with open(self.memory_file, "a") as file:
            file.write(json.dumps(interaction) + "\n")

    def get_memory(self) -> str:
        try:
            with open(self.memory_file, "r") as file:
                return file.read()
        except FileNotFoundError:
            return ""

class LLMResponse:
    def __init__(self, text):
        self.text = text

class ChatProcessor:
    def __init__(self):
        self.memory = MemoryManager()
        self.llm_model = HuggingFaceInferenceAPI(
            token=os.getenv("HF_TOKEN"),
            model_name="mistralai/Mixtral-8x7B-Instruct-v0.1",
        )
                            
    
    @staticmethod
    def markdown_to_text(file_path: Path) -> str:
        with open(file_path, "r") as file:
            return file.read()

    def clear_memory(self) -> None:
        self.memory.clear_memory()

    def get_document_md(self, pdf_folder: str) -> str:
        pdf_path = Path(pdf_folder)

        if not pdf_path.exists() or not pdf_path.is_dir():
            raise FileNotFoundError(f"Le dossier '{pdf_folder}' n'existe pas ou n'est pas un répertoire valide.")

        documents = ""
        for pdf_file in pdf_path.glob("*.md"):
            markdown_text = self.markdown_to_text(pdf_file)
            documents += f"\n\n--- Document: {pdf_file.stem} ---\n\n{markdown_text}"
        return documents

    def get_history(self):
        return self.memory.get_memory()

    def save_memory(self, user_question: str, assistant_response: Any) -> None:
        self.memory.append_to_memory({
            "Query": user_question, 
            "Response": assistant_response
        })


    def clean_text(self, text: str, ignore_lines: list = None, remove_prefixes: list = None) -> str:
        if ignore_lines is None:
            ignore_lines = ["---"]
        if remove_prefixes is None:
            remove_prefixes = ["Réponse : ", "Question reformulée : ", "Answer: ", "Reformulated Question: "]

        lines = text.splitlines()
        cleaned_lines = []
        for line in lines:
            stripped_line = line.strip()
            if not stripped_line or stripped_line in ignore_lines:
                continue
            for prefix in remove_prefixes:
                if stripped_line.startswith(prefix):
                    stripped_line = stripped_line[len(prefix):].strip()
            if stripped_line:
                cleaned_lines.append(stripped_line)

        return " ".join(cleaned_lines)


    def query(self, user_question: str, md_folder: str) -> Any:
        try: 
            print(f"USER QUESTION: {user_question}")

            prompt1 = prompt_reformulate(self.get_history(), user_question)
            if self.get_history() != "":
                llm_question = self.llm_model.complete(prompt=prompt1)
            else:
                llm_question = LLMResponse(f"""Reformulated Question:\n{user_question}""")
            llm_question_cleaned = self.clean_text(llm_question.text)
            print(f"REFORMULATED QUESTION: {llm_question_cleaned}")

            prompt2 = prompt_answer(self.get_document_md(md_folder), llm_question_cleaned)

            response = self.llm_model.complete(prompt=prompt2)
            response_cleaned = self.clean_text(response.text)
            print(f"RESPONSE: {response_cleaned}")

            self.save_memory(user_question=llm_question_cleaned, assistant_response=response_cleaned)
            return response_cleaned
        
        except Exception as e:
            print(f"Erreur dans la méthode query : {str(e)}")
            raise

def prompt_reformulate(history, user_question):
    return f"""
        Vous êtes un assistant utile. Interactions précédentes : {history}. Question de l'utilisateur : {user_question}. Reformule uniquement la question de l'utilisateur en une autre question.
    """

def prompt_answer(documents, llm_question):
    return f"""
        Vous êtes un assistant utile. Votre tâche est de répondre uniquement à la question de l'utilisateur en vous basant sur le contexte actuel. Si vous ne trouvez pas la réponse dans le contexte actuel, dites simplement "Je ne sais pas.". Contexte actuel : {documents}. Question de l'utilisateur : {llm_question}.
    """



