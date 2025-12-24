from fastapi import APIRouter, Depends, HTTPException, status
from app.core.security import verify_token
from datetime import datetime
from app.core.firebase import db
from app.models.complaint import ComplaintUpdate

router = APIRouter()

@router.get("/complaints")                              # Endpoint to get all complaints (admin access)
def get_all_complaints(user=Depends(verify_token)):     
    if user["role"] != "admin":                         
        raise HTTPException(                            
            status_code=status.HTTP_403_FORBIDDEN,  
            detail="Admin access only"
        )

    results = []
    docs = db.collection("complaints").stream()         # Fetch all complaints

    for doc in docs:
        data = doc.to_dict()
        data["complaintId"] = doc.id
        results.append(data)

    return results

@router.patch("/complaints/{complaint_id}")
def update_complaint(
    complaint_id: str,
    data: ComplaintUpdate,
    user=Depends(verify_token)
):

    if user["role"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access only"
        )

    doc_ref = db.collection("complaints").document(complaint_id)
    doc = doc_ref.get()

    if not doc.exists:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Complaint not found"
        )

    update_data = {
        "status": data.status,
        "updatedAt": datetime.utcnow()
    }

    if data.adminResponse:
        update_data["adminResponse"] = data.adminResponse

    doc_ref.update(update_data)

    return {
        "message": "Complaint updated successfully",
        "updatedFields": update_data
    }