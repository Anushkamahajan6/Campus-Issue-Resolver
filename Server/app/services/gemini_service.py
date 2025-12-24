from google import genai
from google.genai import types
import json, re, os
from dotenv import load_dotenv

load_dotenv()


def get_gemini_client():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY missing")
    return genai.Client(api_key=api_key)


def extract_json(text: str):
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        raise ValueError(f"No JSON found in Gemini response: {text}")
    return json.loads(match.group())


def analyze_complaint(
    complaint_text: str,
    location: str | None = None,
    image_bytes: bytes | None = None,
    image_mime: str = "image/jpeg"
):
    client = get_gemini_client()

    prompt = f"""
You are an AI Campus Issue Resolver Assistant.

Analyze the student complaint below and respond ONLY with valid JSON.

Student Complaint:
"{complaint_text}"

Additional Context:
- Location: {location or "Not specified"}

Return JSON with EXACT keys:
- issue_type
- urgency
- department
- summary

If an image is provided:
- Identify visible issues from the image
- Use image + text together to decide urgency and department
"""

    parts = [
        types.Part.from_text(text=prompt)

    ]

    if image_bytes:
        parts.append(
            types.Part.from_bytes(
                data=image_bytes,
                mime_type=image_mime
            )
        )

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=parts
    )

    return extract_json(response.text)
