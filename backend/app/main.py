from fastapi import FastAPI, Request, Depends, HTTPException
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer
from app.db.database import engine, SessionLocal
from sqlalchemy.orm import Session
from app.db.database import Base
from app.routers.user import router as user_router
from app.routers.project import router as project_router
from app.routers.deck import router as deck_router
from app.routers.doc import router as doc_router
from app.routers.flashcard import router as flashcard_router


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

app.include_router(user_router)
app.include_router(project_router)
app.include_router(deck_router)
app.include_router(doc_router)
app.include_router(flashcard_router)






    
