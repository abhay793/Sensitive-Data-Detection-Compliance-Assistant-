import os
import faiss
import pickle
import numpy as np

from sentence_transformers import SentenceTransformer
from app.config import VECTOR_DB_FOLDER

model = SentenceTransformer("all-MiniLM-L6-v2")


class VectorStore:

    def __init__(self):
        self.dimension = 384

    def create(self, analysis_id, chunks):

        if not chunks:
            return

        # =====================================
        # Generate embeddings
        # =====================================
        embeddings = model.encode(chunks)

        embeddings = np.array(embeddings).astype("float32")

        # Normalize for cosine similarity (IMPORTANT FIX)
        faiss.normalize_L2(embeddings)

        # =====================================
        # Create FAISS index
        # =====================================
        index = faiss.IndexFlatIP(self.dimension)
        index.add(embeddings)

        index_path = os.path.join(
            VECTOR_DB_FOLDER,
            f"{analysis_id}.index"
        )

        meta_path = os.path.join(
            VECTOR_DB_FOLDER,
            f"{analysis_id}.pkl"
        )

        # =====================================
        # Save index + chunks
        # =====================================
        faiss.write_index(index, index_path)

        with open(meta_path, "wb") as f:
            pickle.dump(chunks, f)

    def search(self, analysis_id, question, k=3):

        index_path = os.path.join(
            VECTOR_DB_FOLDER,
            f"{analysis_id}.index"
        )

        meta_path = os.path.join(
            VECTOR_DB_FOLDER,
            f"{analysis_id}.pkl"
        )

        # =====================================
        # Safety check (IMPORTANT FIX)
        # =====================================
        if not os.path.exists(index_path) or not os.path.exists(meta_path):
            return ["No document context found. Please upload and analyze a document first."]

        index = faiss.read_index(index_path)

        with open(meta_path, "rb") as f:
            chunks = pickle.load(f)

        if not chunks:
            return ["Empty document context."]

        # =====================================
        # Query embedding
        # =====================================
        query_embedding = model.encode([question])
        query_embedding = np.array(query_embedding).astype("float32")

        faiss.normalize_L2(query_embedding)

        _, indices = index.search(query_embedding, k)

        results = []

        for idx in indices[0]:
            if 0 <= idx < len(chunks):
                results.append(chunks[idx])

        return results