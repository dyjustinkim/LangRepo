from fastapi import FastAPI, Request, Depends, HTTPException, APIRouter
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer
from app.db.database import engine, SessionLocal
from sqlalchemy.orm import Session
from app.db.database import Base, db_dependency
from app.routers.user import router as user_router
from app.routers.project import router as project_router
from app.routers.deck import router as deck_router
from app.routers.doc import router as doc_router
from app.routers.flashcard import router as flashcard_router
from sqlalchemy import text
import time
import logging
import app.models
import json
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield  

app = FastAPI(lifespan=lifespan)

origins = [
    "https://langrepo.cloud",
    "https://www.langrepo.cloud"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

metrics = {
    "request_count": 0,
    "error_count": 0
}

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("app")
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    metrics["request_count"] += 1
    if response.status_code >= 400:
        metrics["error_count"] += 1
    duration = time.time() - start_time
    logger.info(json.dumps({
        "method": request.method,
        "path": request.url.path,
        "status": response.status_code,
        "duration": duration
    }))
    return response

@app.get("/metrics")
def get_metrics():
    return metrics

@app.get("/health")
def health_check(db: db_dependency):
    try:
        db.execute(text("SELECT 1"))
        return {"status": "ok"}
    except Exception:
        raise HTTPException(status_code=503, detail="DB unavailable")
    
app.include_router(user_router)
app.include_router(project_router)
app.include_router(deck_router)
app.include_router(doc_router)
app.include_router(flashcard_router)











    
