from fastapi import APIRouter
from app.models.complaint import ComplaintCreate
from datetime import datetime
import uuid

router = APIRouter()

@router.post("/")
def create_complaint(data: ComplaintCreate):
    return {
        "complaintId": str(uuid.uuid4()),
        "description": data.description,
        "category": "plumbing",
        "priority": "HIGH",
        "status": "PENDING",
        "createdAt": datetime.utcnow()
    }

@router.get("/me")
def get_my_complaints():
    return []
