from fastapi import APIRouter, Depends
from datetime import datetime
import uuid

from app.models.complaint import ComplaintCreate
from app.core.firebase import db
from app.core.security import verify_token
from app.services.gemini_service import analyze_complaint

router = APIRouter()

@router.post("/")
def create_complaint(
    data: ComplaintCreate,
    user=Depends(verify_token)
):
    user = {
        "uid": "test_user",
        "email": "test@student.com"
    }
    complaint_id = str(uuid.uuid4())

    # 🔥 STEP 1: Call Gemini
    ai_result = analyze_complaint(
        complaint_text=data.description,
        location=data.location if hasattr(data, "location") else None
    )

    # 🔥 STEP 2: Build complaint object
    complaint = {
        "complaintId": complaint_id,
        "userId": user["uid"],
        "email": user.get("email"),
        "originalDescription": data.description,

        # AI-generated fields
        "category": ai_result["issue_type"],
        "priority": ai_result["urgency"],
        "department": ai_result["department"],
        "summary": ai_result["summary"],

        # Metadata
        "status": "PENDING",
        "createdAt": datetime.utcnow()
    }

    # 🔥 STEP 3: Store in Firestore
    db.collection("complaints").document(complaint_id).set(complaint)

    return complaint


@router.get("/me")
def get_my_complaints(user=Depends(verify_token)):
    docs = (
        db.collection("complaints")
        .where("userId", "==", user["uid"])
        .stream()
    )

    return [doc.to_dict() for doc in docs]
