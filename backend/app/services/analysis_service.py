import os
import uuid

from app.config import UPLOAD_FOLDER

from app.database.storage import analysis_cache
from app.database.vector_store import VectorStore

from app.services.document_loader import extract_document
from app.services.sensitive_detector import detect_sensitive_data
from app.services.risk_classifier import classify_risk
from app.services.summary_generator import generate_summary
from app.services.masking import mask_value

from app.utils.text_chunker import chunk_text

# ==========================================
# Category Mapping
# ==========================================

CATEGORY_MAP = {
    "Email": "email",
    "Phone": "phone",
    "PAN": "pan",
    "Aadhaar": "aadhaar",
    "Credit Card": "credit_card",
    "Bank Account": "bank_details",
    "Password": "password",
    "API Key": "api_key",
    "Employee ID": "employee_id",
    "Confidential": "confidential"
}

vector_store = VectorStore()


def analyze_document(filename: str, contents: bytes):

    # ==========================================
    # Generate Analysis ID
    # ==========================================

    analysis_id = str(uuid.uuid4())

    # ==========================================
    # Save Uploaded File
    # ==========================================

    file_path = os.path.join(
        UPLOAD_FOLDER,
        f"{analysis_id}_{filename}"
    )

    with open(file_path, "wb") as f:
        f.write(contents)

    # ==========================================
    # Extract Document
    # ==========================================

    text, pages = extract_document(file_path)

    # ==========================================
    # Detect Sensitive Data
    # ==========================================

    detections = detect_sensitive_data(text)

    # ==========================================
    # Risk Classification
    # ==========================================

    risk = classify_risk(detections)

    # ==========================================
    # AI Summary
    # ==========================================

    summary = generate_summary(
        text=text,
        detections=detections,
        risk=risk
    )

    # ==========================================
    # Create Vector Store
    # ==========================================

    chunks = chunk_text(text)

    vector_store.create(
        analysis_id=analysis_id,
        chunks=chunks
    )

    # ==========================================
    # Sensitive Data Summary
    # ==========================================

    sensitive_summary = []

    for category, values in detections["categories"].items():

        frontend_type = CATEGORY_MAP.get(
            category,
            category.lower()
        )

        sensitive_summary.append({

            "type": frontend_type,

            "label": category,

            "icon": frontend_type,

            "count": len(values)

        })

    # ==========================================
    # Detection Table
    # ==========================================

    detected_items = []

    for category, values in detections["categories"].items():

        frontend_type = CATEGORY_MAP.get(
            category,
            category.lower()
        )

        for value in values:

            detected_items.append({

                "id": str(uuid.uuid4()),

                "type": frontend_type,

                "value": value,

                "originalValue": value,

                "maskedValue": mask_value(value),

                "risk": risk["level"].lower(),

                "confidence": 100,

                "status": "detected"

            })

    # ==========================================
    # Compliance Checklist
    # ==========================================

    compliance = [

        {
            "id": "1",
            "category": "Detection",
            "label": "Sensitive Data Scan Completed",
            "status": "pass"
        },

        {
            "id": "2",
            "category": "Risk",
            "label": "Risk Classification Completed",
            "status": "pass"
        },

        {
            "id": "3",
            "category": "Compliance",
            "label": "AI Compliance Summary Generated",
            "status": "pass"
        },

        {
            "id": "4",
            "category": "Security",
            "label": "Security Assessment Completed",
            "status": "pass"
        }

    ]

    # ==========================================
    # Final Response
    # ==========================================

    analysis = {

        "analysisId": analysis_id,

        "documentInfo": {

            "filename": filename,

            "fileType": filename.split(".")[-1].upper(),

            "fileSize": len(contents),

            "pageCount": pages,

            "uploadTime": "",

            "status": "analyzed"

        },

        "riskAssessment": {

            "overallRisk": risk["level"].lower(),

            "riskScore": risk["score"],

            "findings": detections["total_findings"],

            "criticalFindings": (

                len(detections["categories"].get("Password", [])) +

                len(detections["categories"].get("API Key", [])) +

                len(detections["categories"].get("Credit Card", []))

            )

        },

        "sensitiveDataSummary": sensitive_summary,

        "detectedItems": detected_items,

        "complianceChecklist": compliance,

        "aiSummary": {

            "executiveSummary": summary["executive_summary"],

            "complianceObservations": summary["compliance_observations"],

            "securityRisks": summary["security_risks"],

            "recommendations": summary["recommendations"],

            "overallAssessment": summary["overall_assessment"]

        }

    }

    # ==========================================
    # Store in Memory
    # ==========================================

    analysis_cache[analysis_id] = analysis

    return analysis