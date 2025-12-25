from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ComplaintCreate(BaseModel):
    description: str
    location: Optional[str] = None
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

