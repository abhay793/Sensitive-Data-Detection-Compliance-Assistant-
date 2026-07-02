from app.database.vector_store import VectorStore

from app.services.gemini_service import ask_gemini

store = VectorStore()


def answer_question(
    analysis_id,
    question
):

    context = store.search(
        analysis_id,
        question
    )

    prompt = f"""
You are a cybersecurity compliance assistant.

Answer ONLY from the provided document.

DOCUMENT

{" ".join(context)}

QUESTION

{question}

Give a professional answer.
"""

    return ask_gemini(prompt)