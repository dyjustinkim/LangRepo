from fastapi import FastAPI, Request, Depends, HTTPException
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Annotated
from pydantic import BaseModel
from app.auth import verifier
from fastapi.security import OAuth2PasswordBearer
from app.db import models
from app.db.database import engine, SessionLocal
from sqlalchemy.orm import Session

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

class Item(BaseModel):
    name: str

class Items(BaseModel):
    items: List[Item]

class ChoiceBase(BaseModel):
    choice_text: str
    is_correct: bool

class QuestionBase(BaseModel):
    question_text: str
    choices: List[ChoiceBase]


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

def get_current_user(token: str = Depends(oauth2_scheme)):
    return verifier.verify(token)

@app.get("/items", response_model=Items)
def get_items(user=Depends(get_current_user)):
    return Items(items= [Item(name="test")])

@app.post("/items", response_model=Item)
async def add_item(item: Item, db: db_dependency, user=Depends(get_current_user)):    
    db_question = models.Questions(question_text=item.name)
    
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    for i in range(3):
        db_choice = models.Choices(choice_text="a", is_correct=True, question_id=i)
        db.add(db_choice)
    db.commit()
    return item