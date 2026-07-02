RISK_WEIGHTS = {
    "emails": 1,
    "phones": 1,
    "employee_ids": 1,

    "pan": 3,
    "aadhaar": 4,

    "bank_accounts": 4,
    "ifsc": 2,

    "credit_cards": 5,

    "passwords": 5,
    "api_keys": 5
}

RISK_LEVELS = {
    "LOW": (0, 5),
    "MEDIUM": (6, 15),
    "HIGH": (16, 1000)
}