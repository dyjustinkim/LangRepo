from sqlalchemy.orm import Session
from app.models.flashcard import Flashcard
from app.schemas.flashcard import FlashcardCreate

def map_flashcard(db: Session, flashcard_name: str, auth0_id:str):
    flashcard = db.query(Flashcard).filter(Flashcard.user_id == auth0_id["sub"], Flashcard.name == flashcard_name).first()
    return {"flashcard_id": flashcard.id}

def get_flashcards(db: Session, deck_id: int, auth0_id:str):
    flashcards = db.query(Flashcard).filter(Flashcard.deck_id == deck_id).all()
    return flashcards

def add_flashcard(flashcard: FlashcardCreate, db: Session, auth0_id:str):    
    db_flashcard = Flashcard(front=flashcard.front, back=flashcard.back, deck_id=flashcard.deck_id)    
    db.add(db_flashcard)
    db.commit()
    db.refresh(db_flashcard)

def delete_flashcard(db: Session, flashcard_id: int, auth0_id:str):
    flashcard = db.query(Flashcard).filter(Flashcard.id == flashcard_id).first()
    db.delete(flashcard)
    db.commit()

def edit_flashcard(db: Session, new_flashcard: FlashcardCreate, old_flashcard: int, auth0_id:str):
    flashcard = db.query(Flashcard).filter(Flashcard.id == old_flashcard).first()
    flashcard.front = new_flashcard.front
    flashcard.back = new_flashcard.back
    db.commit()