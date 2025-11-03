# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .db import get_client
from .routes import notebooks as notebooks_router
from .routes import notes as notes_router


app = FastAPI(title="Notebook API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(notebooks_router.router)
app.include_router(notes_router.router)

@app.get("/")
async def root():
    return {
        "message": "Welcome to Notebook API Backend!",
        "docs": "Visit /docs for API documentation",
        "endpoints": {
            "notebooks": "/api/notebooks",
            "notes": "/api/notebooks/{id}/notes"
        }
    }

print("\nhome: http://127.0.0.1:8000/")
print("\nswager: http://127.0.0.1:8000/docs \n")

@app.on_event("startup")
async def startup_event():
    # initialize client (lazy)
    get_client()
    print("MongoDB client initialized")

@app.on_event("shutdown")
async def shutdown_event():
    client = get_client()
    client.close()
    print("MongoDB client closed")
