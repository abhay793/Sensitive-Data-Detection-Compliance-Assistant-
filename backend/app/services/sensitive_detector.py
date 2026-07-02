import re

PATTERNS = {

    "Aadhaar": r"\b\d{4}\s?\d{4}\s?\d{4}\b",

    "PAN": r"\b[A-Z]{5}[0-9]{4}[A-Z]\b",

    "Email": r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b",

    "Phone": r"\b(?:\+91[- ]?)?[6-9]\d{9}\b",

    "Credit Card": r"\b(?:\d{4}[- ]?){3}\d{4}\b",

    "Bank Account": r"\b\d{9,18}\b",

    "IFSC": r"\b[A-Z]{4}0[A-Z0-9]{6}\b",

    "Password": r"(?i)(password|passwd|pwd)\s*[:=]\s*\S+",

    "API Key": r"(?i)(api[_-]?key|secret[_-]?key|token)\s*[:=]\s*\S+",

    "Employee ID": r"\bEMP[0-9]{3,10}\b"

}

def detect_sensitive_data(text):

    detections = {}

    total = 0

    for category, pattern in PATTERNS.items():

        matches = re.findall(pattern, text)

        if matches:

            detections[category] = matches

            total += len(matches)

    return {

        "categories": detections,

        "total_findings": total

    }