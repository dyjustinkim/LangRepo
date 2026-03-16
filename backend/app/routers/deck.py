from fastapi import APIRouter, Depends
from app.db.database import db_dependency
from app.auth.dependencies import verify_user
import app.crud.deck as deck_crud
from app.schemas.deck import DeckCreate, DeckResponse

router = APIRouter(prefix="/decks", tags=["decks"])

@router.get("/{proj_id}", response_model=list[DeckResponse])
def get_decks(proj_id: int, db: db_dependency, user=Depends(verify_user)):
    return deck_crud.get_decks(proj_id, db, user)

@router.get("/map/{deck_name}", response_model=DeckResponse)
def map_deck(deck_name: str, db: db_dependency, user=Depends(verify_user)):
    return deck_crud.map_deck(deck_name, db, user)

@router.post("")
def add_deck(deck: DeckCreate, db: db_dependency, user=Depends(verify_user)):  
    deck_crud.add_deck(deck, db, user)

@router.delete("/{deck_id}")
def delete_deck(db: db_dependency, deck_id: int, user=Depends(verify_user)):
    deck_crud.delete_deck(db, deck_id, user)

@router.put("/{old_deck}")
def edit_deck(new_deck: DeckCreate, db: db_dependency, old_deck: int,  user=Depends(verify_user)):
    deck_crud.edit_deck(db, new_deck, old_deck, user)