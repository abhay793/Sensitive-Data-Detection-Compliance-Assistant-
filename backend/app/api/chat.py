from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.database.storage import analysis_cache
from app.services.qa_engine import answer_question

router = APIRouter()


class ChatRequest(BaseModel):
    analysis_id: str
    question: str


@router.post("/chat")
def chat(request: ChatRequest):

    if request.analysis_id not in analysis_cache:
        raise HTTPException(
            status_code=404,
            detail="Document not found."
        )

    analysis = analysis_cache[request.analysis_id]

    answer = answer_question(
        analysis_id=request.analysis_id,
        question=request.question
    )

    return {

        "success": True,

        "response": answer

    }