from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ComplaintCreate(BaseModel):
    description: str
  
class ComplaintResponse(BaseModel):
    complaintId: str
    description: str
    category: str
    priority: str
    status: str
    createdAt: datetime

class ComplaintUpdate(BaseModel):
    status: str
    adminResponse: Optional[str] = None

# from fastapi import APIRouter
# from pydantic import BaseModel
# from app.services.gemini_service import analyze_complaint

# router = APIRouter()

# class ComplaintRequest(BaseModel):
#     complaint_text: str
#     location: str | None = None

# @router.post("/analyze")
# def analyze_issue(data: ComplaintRequest):
#     result = analyze_complaint(
#         complaint_text=data.complaint_text,
#         location=data.location
#     )
#     return result
