from fastapi import FastAPI, Request, Depends
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
from app.auth import verifier
from fastapi.security import OAuth2PasswordBearer



app = FastAPI()

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

class Item(BaseModel):
    name: str

class Items(BaseModel):
    items: List[Item]

memory_db = {"items": []}
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme)):
    return verifier.verify(token)

@app.get("/items", response_model=Items)
def get_items(user=Depends(get_current_user)):
    return Items(items=memory_db["items"])

@app.post("/items", response_model=Item)
def add_item(item: Item, user=Depends(get_current_user)):
    memory_db["items"].append(item)
    return item

