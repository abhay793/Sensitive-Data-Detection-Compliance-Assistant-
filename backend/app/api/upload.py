from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import HTTPException

from app.config import (
    ALLOWED_EXTENSIONS,
    MAX_FILE_SIZE
)

from app.utils.file_utils import is_allowed_file

from app.services.analysis_service import analyze_document

router = APIRouter()


@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...)
):

    if not is_allowed_file(
        file.filename,
        ALLOWED_EXTENSIONS
    ):
        raise HTTPException(
            status_code=400,
            detail="Unsupported file."
        )

    contents = await file.read()

    if len(contents) > MAX_FILE_SIZE:

        raise HTTPException(
            status_code=400,
            detail="File too large."
        )

    return analyze_document(
        file.filename,
        contents
    )