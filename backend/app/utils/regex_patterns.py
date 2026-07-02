import re

PATTERNS = {
    "emails": re.compile(
        r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"
    ),

    "phones": re.compile(
        r"(?:\+91[-\s]?)?[6-9]\d{9}\b"
    ),

    "aadhaar": re.compile(
        r"\b\d{4}\s?\d{4}\s?\d{4}\b"
    ),

    "pan": re.compile(
        r"\b[A-Z]{5}[0-9]{4}[A-Z]\b"
    ),

    "credit_cards": re.compile(
        r"\b(?:\d[ -]*?){13,16}\b"
    ),

    "employee_ids": re.compile(
        r"\b(?:EMP[-_]?\d+|EMPLOYEE[-_]?\d+|ID[-_]?\d+)\b",
        re.IGNORECASE
    ),

    "passwords": re.compile(
        r"(?i)(password|passwd|pwd)\s*[:=]\s*\S+"
    ),

    "api_keys": re.compile(
        r"(?i)(api[_-]?key|secret[_-]?key|access[_-]?token)\s*[:=]\s*\S+"
    ),

    "bank_accounts": re.compile(
        r"\b\d{9,18}\b"
    ),

    "ifsc": re.compile(
        r"\b[A-Z]{4}0[A-Z0-9]{6}\b"
    )
}