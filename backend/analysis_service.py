import os
import json
import uuid

from app.config import (
    UPLOAD_FOLDER
)

from app.services.document_loader import extract_document
from app.services.sensitive_detector import detect_sensitive_data
from app.services.risk_classifier import classify_risk
from app.services.summary_generator import generate_summary
from app.services.rag_engine import create_vector_database


def analyze_document(file_name, file_bytes):

    # ------------------------------------
    # Create Unique Analysis ID
    # ------------------------------------

    analysis_id = str(uuid.uuid4())

    analysis_folder = os.path.join(
        UPLOAD_FOLDER,
        analysis_id
    )

    os.makedirs(analysis_folder, exist_ok=True)

    # ------------------------------------
    # Save uploaded file
    # ------------------------------------

    file_path = os.path.join(
        analysis_folder,
        file_name
    )

    with open(file_path, "wb") as f:
        f.write(file_bytes)

    # ------------------------------------
    # Extract text
    # ------------------------------------

    text, pages = extract_document(file_path)

    # ------------------------------------
    # Detect sensitive information
    # ------------------------------------

    detections = detect_sensitive_data(text)

    # ------------------------------------
    # Risk Classification
    # ------------------------------------

    risk = classify_risk(detections)

    # ------------------------------------
    # AI Summary
    # ------------------------------------

    summary = generate_summary(
        text=text,
        detections=detections,
        risk=risk
    )

    # ------------------------------------
    # Create Vector Database
    # ------------------------------------

    vector_store = create_vector_database(text)

    vector_folder = os.path.join(
        analysis_folder,
        "faiss"
    )

    os.makedirs(vector_folder, exist_ok=True)

    vector_store.save(vector_folder)

    # ------------------------------------
    # Save Extracted Text
    # ------------------------------------

    with open(
        os.path.join(
            analysis_folder,
            "extracted_text.txt"
        ),
        "w",
        encoding="utf-8"
    ) as f:

        f.write(text)

    # ------------------------------------
    # Save Detection JSON
    # ------------------------------------

    with open(
        os.path.join(
            analysis_folder,
            "detections.json"
        ),
        "w"
    ) as f:

        json.dump(
            detections,
            f,
            indent=4
        )

    # ------------------------------------
    # Save Summary
    # ------------------------------------

    with open(
        os.path.join(
            analysis_folder,
            "summary.md"
        ),
        "w",
        encoding="utf-8"
    ) as f:

        f.write(summary)

    # ------------------------------------
    # Metadata
    # ------------------------------------

    metadata = {

        "analysis_id": analysis_id,

        "filename": file_name,

        "pages": pages,

        "risk": risk
    }

    with open(
        os.path.join(
            analysis_folder,
            "metadata.json"
        ),
        "w"
    ) as f:

        json.dump(
            metadata,
            f,
            indent=4
        )

    return {

        "analysis_id": analysis_id,

        "document": {

            "filename": file_name,

            "pages": pages,

            "preview": text[:500],

            "size": len(file_bytes)

        },

        "risk": risk,

        "detections": detections,

        "summary": summary
    }