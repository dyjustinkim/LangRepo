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

@app.get("/decks", response_model=list[schemas.DeckResponse])
def get_decks(db: db_dependency, user=Depends(verify_user)):
    decks = db.query(models.Deck).filter(models.Deck.user_id == user["sub"]).all()
    
    return decks

@app.get("/checkuser/{user_sub}")
def map_user(db: db_dependency, user_sub: str, user=Depends(verify_user)):
    user = db.query(models.User).filter(models.User.user_id == user_sub).first()
    return {"exists": bool(user)}

@app.get("/users", response_model=str)
def map_user(db: db_dependency, user=Depends(verify_user)):
    user = db.query(models.User).filter(models.User.user_id == user["sub"]).first()
    return user.nickname
    
@app.post("/decks")
async def add_item(deck: schemas.DeckCreate, db: db_dependency, user=Depends(verify_user)):    
    db_deck = models.Deck(name=deck.name, user_id=user["sub"])    
    db.add(db_deck)
    db.commit()
    # db.refresh(db_deck)
    

@app.post("/users")
async def add_username(new_user: schemas.UserCreate, db: db_dependency, user=Depends(verify_user)):   
    db_deck = models.User(nickname=new_user.nickname, user_id=user["sub"])    
    db.add(db_deck)
    db.commit()
    
