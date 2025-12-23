from fastapi import APIRouter
from app.models.complaint import ComplaintCreate
from datetime import datetime
from app.core.firebase import db
import uuid
from app.core.security import verify_token
from fastapi import Depends

app = APIRouter()

@app.post("/")                          # Endpoint to create a new complaint
def create_complaint(
    data: ComplaintCreate,
    user=Depends(verify_token)
):
    complaint_id = str(uuid.uuid4())

    complaint = {
        "userId": user["uid"],
        "email": user.get("email"),
        "description": data.description,
        "category": "plumbing",
        "priority": "HIGH",
        "status": "PENDING",
        "createdAt": datetime.utcnow()
    }

    db.collection("complaints").document(complaint_id).set(complaint) # Store in Firestore

    return {
        "complaintId": complaint_id, 
        **complaint                     
    }
    

@app.get("/me")            # Endpoint to get complaints of the authenticated user     
def get_my_complaints():   
    return []
