from google import genai
import os
import json
import re
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def extract_json(text: str):
    """
    Safely extract JSON object from Gemini response.
    """
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        raise ValueError(f"No JSON found in Gemini response: {text}")
    return json.loads(match.group())


def analyze_complaint(complaint_text, location=None, has_image=False):
    prompt = f"""
You are an AI Campus Issue Resolver Assistant.

Analyze the student complaint below and respond ONLY with valid JSON.

Student Complaint:
"{complaint_text}"

Additional Context:
- Location: {location or "Not specified"}
- Uploaded Image: {"Yes" if has_image else "No"}

Return JSON with EXACT keys:
- issue_type
- urgency
- department
- summary
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    # 🔍 DEBUG (keep for now)
    print("🔵 RAW GEMINI RESPONSE:")
    print(response.text)

    try:
        return extract_json(response.text)
    except Exception as e:
        print("🔴 GEMINI PARSING ERROR")
        raise RuntimeError(str(e))
