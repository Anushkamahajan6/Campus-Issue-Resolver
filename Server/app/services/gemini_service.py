import os
import json
import re
from google import genai

# Initialize Gemini client
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

MODEL = "gemini-1.5-flash"

def extract_json(text: str):
    """
    Extract JSON object from Gemini response text.
    """
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        raise ValueError("No JSON found in Gemini response")
    return json.loads(match.group())


def analyze_complaint(complaint_text: str, location: str | None = None):
    prompt = f"""
You are an AI assistant helping a university administration system.

Analyze the following campus complaint and return ONLY valid JSON.

Complaint:
"{complaint_text}"

Location:
"{location}"

Return JSON with exactly these keys:
- issue_type
- urgency (LOW | MEDIUM | HIGH)
- department
- summary
"""

    response = client.models.generate_content(
        model=MODEL,
        contents=prompt
    )

    return extract_json(response.text)
