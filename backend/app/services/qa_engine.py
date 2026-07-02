from app.database.vector_store import VectorStore
from app.services.gemini_service import ask_gemini

vector_store = VectorStore()


def answer_question(
    analysis_id: str,
    question: str
):

    context = vector_store.search(
        analysis_id,
        question
    )

    prompt = f"""
You are a cybersecurity compliance assistant.

Use ONLY the document context below.

Document Context:
{context}

Question:
{question}

Answer professionally.
"""

    return ask_gemini(prompt)