from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import complaints, admin
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Campus Issue Reporter")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(complaints.router)
app.include_router(admin.router)

@app.get("/")
def root():
    return {"status": "Backend running 🚀"}
