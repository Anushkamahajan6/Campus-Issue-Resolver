from fastapi import FastAPI
from app.routes import complaints, admin
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
load_dotenv()

app = FastAPI(title="AI Campus Issue Reporter")


# CORS Configuration - VERY IMPORTANT!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(complaints.router, prefix="/api", tags=["Complaints"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])

@app.get("/")
def root():
    return {"status": "Backend running 🚀"}
