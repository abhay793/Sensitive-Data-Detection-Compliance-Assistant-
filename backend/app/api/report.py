from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from app.database.storage import analysis_cache
from app.services.report_generator import generate_report
from app.config import REPORT_FOLDER

router = APIRouter()


@router.get("/report/{analysis_id}")
def get_report(analysis_id: str):

    # =========================================
    # Validate analysis exists
    # =========================================
    if analysis_id not in analysis_cache:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    analysis = analysis_cache[analysis_id]

    # =========================================
    # Extract required fields
    # =========================================
    document_text = analysis.get("documentInfo", {}).get("filename", "")

    detections = analysis.get("detectedItems", [])
    risk = analysis.get("riskAssessment", {})
    summary = analysis.get("aiSummary", {})

    # =========================================
    # Generate Report
    # =========================================
    report_data = generate_report(
        text=document_text,
        detections=detections,
        risk=risk,
        summary=summary,
        analysis_id=analysis_id,
        folder=REPORT_FOLDER
    )

    file_path = report_data["file_path"]

    # =========================================
    # Return file as download
    # =========================================
    return FileResponse(
        path=file_path,
        filename=f"compliance_report_{analysis_id}.txt",
        media_type="text/plain"
    )