from fastapi import FastAPI, Request, Depends, HTTPException
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from pydantic import BaseModel
from app.auth import verifier
from fastapi.security import OAuth2PasswordBearer
from app.db import models
from app.db.database import engine, SessionLocal
from sqlalchemy.orm import Session
import app.schemas as schemas
import app.crud as crud

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:3000"
]

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

def verify_user(token: str = Depends(oauth2_scheme)):
    return verifier.verify(token)

@app.get("/checkuser/{user_sub}")
def map_user(db: db_dependency, user_sub: str, user=Depends(verify_user)):
    return crud.map_user(db, user_sub, user)

@app.get("/users", response_model=str)
def get_user(db: db_dependency, user=Depends(verify_user)):
    return crud.get_user(db, user)
    
@app.post("/users")
def add_username(new_user: schemas.UserCreate, db: db_dependency, user=Depends(verify_user)):   
    crud.add_username(new_user, db, user)

@app.get("/mapproject/{project_name}")
def map_project(db: db_dependency, project_name: str,  user=Depends(verify_user)):
    return crud.map_project(db, project_name, user)

@app.get("/projects", response_model=list[schemas.ProjectResponse])
def get_projects(db: db_dependency, user=Depends(verify_user)):
    projects = crud.get_projects(db, user)
    return projects

@app.post("/projects")
def add_project(deck: schemas.ProjectCreate, db: db_dependency, user=Depends(verify_user)):
    crud.add_project(deck, db, user)

@app.get("/decks/{proj_id}", response_model=list[schemas.DeckResponse])
def get_decks(proj_id: int, db: db_dependency, user=Depends(verify_user)):
    decks = crud.get_decks(proj_id, db, user)
    return decks

@app.post("/decks")
def add_deck(deck: schemas.DeckCreate, db: db_dependency, user=Depends(verify_user)):  
    crud.add_deck(deck, db, user)

    
