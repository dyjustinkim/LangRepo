from sqlalchemy import Text, Column, ForeignKey, Integer, String
from app.db.database import Base

class Deck(Base):
    __tablename__ = "decks"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    user_id = Column(String, nullable=False)

class Flashcard(Base):
    __tablename__ = "flashcards"
    id = Column(Integer, primary_key=True)
    deck_id = Column(Integer, ForeignKey("decks.id"))
    front = Column(Text)
    back = Column(Text)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    user_id = Column(String)
    nickname = Column(String)