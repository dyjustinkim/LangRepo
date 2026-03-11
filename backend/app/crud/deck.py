from sqlalchemy.orm import Session
from app.models.deck import Deck
from app.schemas.deck import DeckCreate

def get_decks(proj_id: int, db: Session, auth0_id:str):
    decks = db.query(Deck).filter(Deck.project_id == proj_id).all()
    return decks

def add_deck(deck: DeckCreate, db: Session, auth0_id:str):
    db_deck = Deck(name=deck.name, project_id = deck.project_id)  
    db.add(db_deck)
    db.commit()
    db.refresh(db_deck)

def delete_deck(db: Session, deck_id: int, auth0_id:str):
    db_deck = db.query(Deck).filter(Deck.id == deck_id).first()
    db.delete(db_deck)
    db.commit()

def edit_deck(db: Session, new_deck: DeckCreate, old_deck: int, auth0_id:str):
    db_deck = db.query(Deck).filter(Deck.id == old_deck).first()
    db_deck.name = new_deck.name
    db.commit()