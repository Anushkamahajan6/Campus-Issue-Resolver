from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_admin import auth

security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials  # THIS strips "Bearer"
        decoded = auth.verify_id_token(token)

        email = decoded.get("email", "")
        role = "admin" if "admin" in email else "student"

        print("DEBUG ROLE:", {"email": email, "role": role})

        return {
            "email": email,
            "role": role,
            "uid": decoded["uid"]
        }

    except Exception as e:
        print("TOKEN ERROR:", str(e))
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
