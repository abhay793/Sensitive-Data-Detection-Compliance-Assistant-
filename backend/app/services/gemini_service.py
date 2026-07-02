import os
import google.generativeai as genai

from app.config import GEMINI_API_KEY

# ==========================================
# Configure Gemini
# ==========================================

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")

# ==========================================
# Core Gemini Call
# ==========================================

def ask_gemini(prompt: str) -> str:
    """
    Simple safe wrapper around Gemini API
    """

    try:
        response = model.generate_content(prompt)

        if response and response.text:
            return response.text.strip()

        return "No response generated."

    except Exception as e:
        raise RuntimeError(f"Gemini API error: {e}")


# ==========================================
# Compliance Summary Generator
# ==========================================

def generate_compliance_summary(text, detections, risk):

    prompt = f"""
You are a senior cybersecurity compliance expert.

Analyze the document strictly for compliance and security risks.

RULES:
- Do NOT hallucinate.
- Use only provided information.
- Be precise and structured.
- Keep output professional.

DOCUMENT:
{text}

DETECTED SENSITIVE DATA:
{detections}

RISK LEVEL:
{risk}

OUTPUT FORMAT:

1. Executive Summary
2. Compliance Observations
3. Security Risks
4. Recommended Remediation Steps
5. Overall Assessment
"""

    return ask_gemini(prompt)


# ==========================================
# Chat / QA Assistant
# ==========================================

def generate_answer(context_chunks, question):

    context = "\n\n".join(context_chunks)

    prompt = f"""
You are a compliance Q&A assistant.

You MUST answer ONLY using the context below.

If answer is not in context, say:
"Not enough information in the document."

------------------------
DOCUMENT CONTEXT:
{context}
------------------------

QUESTION:
{question}

Give a clear, short, professional answer.
"""

    return ask_gemini(prompt)


# ==========================================
# Risk Explanation Generator
# ==========================================

def explain_risk(detections, risk_level):

    prompt = f"""
You are a cybersecurity risk analyst.

Explain why this document has this risk level.

DETECTIONS:
{detections}

RISK LEVEL:
{risk_level}

Give:
- Why this risk level was assigned
- Key threats
- Business impact
- Simple explanation
"""

    return ask_gemini(prompt)