import os
import json
import re
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()


def extract_json(text: str):
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        raise ValueError("No JSON found")
    return json.loads(match.group())


def analyze_complaint(
    description: str,
    location: str | None = None,
    image_bytes: bytes | None = None,
    image_mime: str = "image/jpeg"
):
    api_key = os.getenv("GEMINI_API_KEY")

    # SAFE FALLBACK
    if not api_key:
        return {
            "issue_type": "General",
            "urgency": "MEDIUM",
            "department": "Administration",
            "summary": description[:120]
        }

    try:
        genai.configure(api_key=api_key)

        prompt = f"""
Analyze the complaint and return ONLY JSON.

Complaint:
"{description}"

Location:
{location or "Not specified"}

Keys:
issue_type, urgency, department, summary
"""

        response = genai.GenerativeModel(
            "gemini-1.5-flash"
        ).generate_content(prompt)

        return extract_json(response.text)

    except Exception:
        return {
            "issue_type": "General",
            "urgency": "MEDIUM",
            "department": "Administration",
            "summary": description[:120]
        }
