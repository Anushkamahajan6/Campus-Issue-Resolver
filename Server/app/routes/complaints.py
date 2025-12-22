from fastapi import APIRouter
from app.models.complaint import ComplaintCreate
from datetime import datetime
from app.core.firebase import db
import uuid

router = APIRouter()

@router.post("/")
def create_complaint(data: ComplaintCreate):
    complaint_id = str(uuid.uuid4())

    complaint = {
        "description": data.description,
        "category": "plumbing",
        "priority": "HIGH",
        "status": "PENDING",
        "createdAt": datetime.utcnow()
    }

    db.collection("complaints").document(complaint_id).set(complaint)

    return {
        "complaintId": complaint_id,
        **complaint
    }

@router.get("/me")
def get_my_complaints():
    return []
