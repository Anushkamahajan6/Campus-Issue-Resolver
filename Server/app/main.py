from fastapi import FastAPI
from app.routes import complaints, admin
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
load_dotenv()

app = FastAPI(title="AI Campus Issue Reporter")


# CORS Configuration - VERY IMPORTANT!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:8000" ,
        "http://127.0.0.1:5173",
        "http://localhost:5174",        
        "http://127.0.0.1:5174",],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(complaints.router, prefix="/api", tags=["Complaints"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])

@app.get("/")
def root():
    return {"status": "Backend running 🚀"}
