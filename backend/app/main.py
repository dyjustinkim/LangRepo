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

app = FastAPI()

Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("app")
app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    logger.info(
        f"[CUSTOM LOG]"
        f"{request.method} {request.url.path} "
        f"status={response.status_code} "
        f"duration={duration:.3f}s"
    )

    return response

app.include_router(user_router)
app.include_router(project_router)
app.include_router(deck_router)
app.include_router(doc_router)
app.include_router(flashcard_router)

health_router = APIRouter()
@health_router.get("/health")
def health_check(db: db_dependency):
    try:
        db.execute(text("SELECT 1"))
        return {"status": "ok"}
    except Exception:
        return {"status": "error"}
app.include_router(health_router)









    
