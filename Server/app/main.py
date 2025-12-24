from fastapi import FastAPI
from app.routes import complaints, admin

app = FastAPI(title="AI Campus Issue Reporter")

app.include_router(complaints.router, prefix="/api/complaints")
app.include_router(admin.router, prefix="/api/admin")

@app.get("/")
def root():
    return {"status": "Backend running 🚀"}
