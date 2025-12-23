from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_admin import auth
from app.core import firebase
from app.services.user_service import get_or_create_user

security = HTTPBearer()  

def verify_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    try:
        decoded = auth.verify_id_token(credentials.credentials)
        user_data = get_or_create_user(decoded)
        
        print("DEBUG ROLE:", user_data)
        
        decoded["role"] = user_data["role"]
        return decoded
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )