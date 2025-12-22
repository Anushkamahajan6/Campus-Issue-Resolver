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
