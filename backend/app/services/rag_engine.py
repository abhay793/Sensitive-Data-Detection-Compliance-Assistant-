from app.database.vector_store import VectorStore
from app.utils.text_chunker import chunk_text


def create_vector_database(text):

    chunks = chunk_text(text)

    store = VectorStore()

    store.add_documents(chunks)

    return store