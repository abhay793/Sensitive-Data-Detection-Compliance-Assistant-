import json
import re
from app.services.gemini_service import ask_gemini


def extract_json_safe(text: str):
    """
    Robust JSON extractor for LLM responses
    """

    if not text:
        return None

    # Step 1: direct parse
    try:
        return json.loads(text)
    except:
        pass

    # Step 2: remove markdown formatting
    cleaned = text.strip()
    cleaned = cleaned.replace("```json", "").replace("```", "").strip()

    try:
        return json.loads(cleaned)
    except:
        pass

    # Step 3: extract JSON block using regex
    match = re.search(r"\{.*\}", cleaned, re.DOTALL)
    if match:
        try:
            return json.loads(match.group())
        except:
            pass

    return None


def generate_summary(text, detections, risk):

    prompt = f"""
You are a Cybersecurity Compliance Expert.

Return ONLY valid JSON. No markdown. No explanation.

Schema:
{{
  "executive_summary": "",
  "compliance_observations": ["", ""],
  "security_risks": ["", ""],
  "recommendations": ["", ""],
  "overall_assessment": ""
}}

Document:
{text[:12000]}

Detections:
{json.dumps(detections, indent=2)}

Risk:
{risk}
"""

    response = ask_gemini(prompt)

    parsed = extract_json_safe(response)

    # 🔥 HARD FALLBACK (prevents crash)
    if not parsed:
        return {
            "executive_summary": response[:500] if response else "No response",
            "compliance_observations": [],
            "security_risks": [],
            "recommendations": [],
            "overall_assessment": "Failed to parse AI response safely"
        }

    return parsed