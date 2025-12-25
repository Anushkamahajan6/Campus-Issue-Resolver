from google import genai
from google.genai import types
import json, re, os
from dotenv import load_dotenv

load_dotenv()


def extract_json(text: str):
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        raise ValueError(f"No JSON found in Gemini response: {text}")
    return json.loads(match.group())


def analyze_complaint(
    description: str,
    location: str | None = None,
    image_bytes: bytes | None = None,
    image_mime: str = "image/jpeg"
):
    """
    AI-powered complaint analysis.
    Falls back safely if Gemini is unavailable.
    """

    api_key = os.getenv("GEMINI_API_KEY")

    # 🔥 FALLBACK MODE (NO CRASH)
    if not api_key:
        print("⚠️ GEMINI_API_KEY missing — using fallback AI response")

        return {
            "issue_type": "General",
            "urgency": "MEDIUM",
            "department": "Administration",
            "summary": description[:120]
        }

    try:
        client = genai.Client(api_key=api_key)

        prompt = f"""
You are an AI Campus Issue Resolver Assistant.

Analyze the student complaint below and respond ONLY with valid JSON.

Student Complaint:
"{description}"

Additional Context:
- Location: {location or "Not specified"}

Return JSON with EXACT keys:
- issue_type
- urgency
- department
- summary
"""

        parts = [types.Part.from_text(text=prompt)]

        if image_bytes:
            parts.append(
                types.Part.from_bytes(
                    data=image_bytes,
                    mime_type=image_mime
                )
            )

        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=parts
        )

        return extract_json(response.text)

    except Exception as e:
        print("⚠️ Gemini failed, fallback used:", e)

        return {
            "issue_type": "General",
            "urgency": "MEDIUM",
            "department": "Administration",
            "summary": description[:120]
        }
