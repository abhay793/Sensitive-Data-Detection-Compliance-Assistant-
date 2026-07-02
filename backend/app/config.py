import os

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

UPLOAD_FOLDER = os.getenv(
    "UPLOAD_FOLDER",
    os.path.join(BASE_DIR, "storage", "uploads")
)

REPORT_FOLDER = os.getenv(
    "REPORT_FOLDER",
    os.path.join(BASE_DIR, "storage", "reports")
)

VECTOR_DB_FOLDER = os.getenv(
    "VECTOR_DB_FOLDER",
    os.path.join(BASE_DIR, "storage", "faiss")
)

MAX_FILE_SIZE = int(
    os.getenv("MAX_FILE_SIZE", 10485760)
)

ALLOWED_EXTENSIONS = [
    ".pdf",
    ".txt",
    ".csv"
]

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")