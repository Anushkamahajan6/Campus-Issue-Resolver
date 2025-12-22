from fastapi import APIRouter

router = APIRouter()

@router.get("/complaints")
def get_all_complaints():
    return []
