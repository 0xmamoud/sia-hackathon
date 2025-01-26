from fastapi import FastAPI
from pydantic import BaseModel
from chat import ChatProcessor

app = FastAPI()

class QueryRequest(BaseModel):
    user_question: str
    md_folder: str

@app.post("/api/chat")
async def chat_endpoint(request: QueryRequest):
    try:
        processor = ChatProcessor()
        response = processor.query(user_question=request.user_question, md_folder=request.md_folder)
        return { "success": True, "response": response }
    except Exception as e:
        return { "success": False, "detail": f"Erreur dans le traitement de la requête : {str(e)}" }

@app.post("/api/clear-memory")
async def clear_memory_endpoint():
    try:
        processor = ChatProcessor()
        processor.clear_memory()
        return { "success": True, "detail": "Mémoire effacée avec succès" }
    except Exception as e:
        return { "success": False, "detail": f"Erreur lors de l'effacement de la mémoire : {str(e)}" }
