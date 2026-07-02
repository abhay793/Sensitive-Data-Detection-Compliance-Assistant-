from pydantic import BaseModel


class ChatRequest(BaseModel):
    analysis_id: str
    question: str


class ChatResponse(BaseModel):
    answer: str