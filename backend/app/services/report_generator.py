import os
from datetime import datetime

from app.services.gemini_service import ask_gemini


def build_report_content(text, detections, risk, summary):
    """
    Creates a structured compliance report using AI + structured data
    """

    prompt = f"""
You are a senior compliance auditor.

Create a professional compliance report based on the input.

RULES:
- Be structured and formal
- No hallucinations
- Keep it concise but complete
- Use bullet points where needed

INPUT DATA:

DOCUMENT:
{text}

DETECTIONS:
{detections}

RISK:
{risk}

AI SUMMARY:
{summary}

OUTPUT FORMAT:

# Executive Summary

# Compliance Observations

# Security Risks

# Risk Classification Justification

# Recommended Actions

# Final Assessment
"""

    return ask_gemini(prompt)


def save_report_as_text(report_content: str, analysis_id: str, folder: str):
    """
    Saves report as .txt file (simple + reliable for assignment)
    """

    os.makedirs(folder, exist_ok=True)

    file_path = os.path.join(
        folder,
        f"compliance_report_{analysis_id}.txt"
    )

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(report_content)

    return file_path


def generate_report(text, detections, risk, summary, analysis_id, folder):
    """
    Main entry function used by API
    """

    report_content = build_report_content(
        text=text,
        detections=detections,
        risk=risk,
        summary=summary
    )

    file_path = save_report_as_text(
        report_content,
        analysis_id,
        folder
    )

    return {
        "report": report_content,
        "file_path": file_path,
        "generated_at": datetime.utcnow().isoformat()
    }