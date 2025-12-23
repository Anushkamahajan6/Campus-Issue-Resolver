from fastapi import APIRouter, Depends, HTTPException, status
from app.core.security import verify_token
from app.core.firebase import db

app = APIRouter()

@app.get("/complaints")                              # Endpoint to get all complaints (admin access)
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
