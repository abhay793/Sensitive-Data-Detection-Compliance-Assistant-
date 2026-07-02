RISK_WEIGHTS = {

    "Aadhaar":10,

    "PAN":10,

    "Credit Card":10,

    "Bank Account":8,

    "IFSC":5,

    "Password":10,

    "API Key":10,

    "Email":3,

    "Phone":3,

    "Employee ID":2

}

def classify_risk(detections):

    score = 0

    categories = detections["categories"]

    for category, values in categories.items():

        score += len(values) * RISK_WEIGHTS.get(category,1)

    if score >= 25:

        level = "High"

    elif score >= 10:

        level = "Medium"

    else:

        level = "Low"

    return {

        "level":level,

        "score":score

    }