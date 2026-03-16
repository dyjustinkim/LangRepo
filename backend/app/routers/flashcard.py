from fastapi import APIRouter, Depends
from app.db.database import db_dependency
from app.auth.dependencies import verify_user
import app.crud.flashcard as flashcard_crud
from app.schemas.flashcard import FlashcardCreate, FlashcardResponse

router = APIRouter(prefix="/flashcards", tags=["flashcards"])

@router.get("/{deck_id}", response_model=list[FlashcardResponse])
def get_flashcards(db: db_dependency, deck_id: int, user=Depends(verify_user)):
    return flashcard_crud.get_flashcards(db, deck_id, user)

@router.post("")
def add_flashcard(flashcard: FlashcardCreate, db: db_dependency, user=Depends(verify_user)):
    flashcard_crud.add_flashcard(flashcard, db, user)

@router.delete("/{flashcard_id}")
def delete_flashcard(db: db_dependency, flashcard_id: int,  user=Depends(verify_user)):
    flashcard_crud.delete_flashcard(db, flashcard_id, user)

@router.put("/{old_flashcard}")
def edit_flashcard(new_flashcard: FlashcardCreate, db: db_dependency, old_flashcard: int,  user=Depends(verify_user)):
    flashcard_crud.edit_flashcard(db, new_flashcard, old_flashcard, user)