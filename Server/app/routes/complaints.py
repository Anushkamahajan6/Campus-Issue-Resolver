from fastapi import APIRouter, Depends
from datetime import datetime
import uuid

from app.models.complaint import ComplaintCreate
from app.core.firebase import db
from app.core.security import verify_token
from app.services.gemini_service import analyze_complaint
from fastapi import UploadFile, File
from app.services.image_service import upload_image

router = APIRouter(
    prefix="/api/complaints",
    tags=["complaints"]
    )


@router.post("/")
def create_complaint(
    data: ComplaintCreate,
    user=Depends(verify_token)
):
    complaint_id = str(uuid.uuid4())

    # 🔥 STEP 1: Call Gemini
    ai_result = analyze_complaint(
        description=data.description,
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


@router.post("/{complaint_id}/image")
async def upload_complaint_image(
    complaint_id: str,
    image: UploadFile = File(...),
    user=Depends(verify_token)
):
    
    doc = db.collection("complaints").document(complaint_id).get()

    if not doc.exists:
        return {"error": "Complaint not found"}

    complaint = doc.to_dict()
    image_bytes = await image.read()

    # 🔥 Send image directly to Gemini
    ai_result = analyze_complaint(
    complaint_text=complaint["originalDescription"],
    location=complaint.get("location"),
    image_bytes=image_bytes,
    image_mime=image.content_type  # 👈 VERY IMPORTANT
)

    db.collection("complaints").document(complaint_id).update({
        "imageAnalysis": ai_result,
        "hasImage": True
    })
   
    return {
    "message": "Image analyzed successfully",
    "analysis": ai_result
}

    

@router.get("/me")
def get_my_complaints(user=Depends(verify_token)):
    docs = (
        db.collection("complaints")
        .where("userId", "==", user["uid"])
        .stream()
    )

    return [doc.to_dict() for doc in docs]
