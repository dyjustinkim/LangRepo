from sqlalchemy import Text, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app.db.database import Base

class Flashcard(Base):
    __tablename__ = "flashcards"
    id = Column(Integer, primary_key=True)
    deck_id = Column(Integer, ForeignKey("decks.id", ondelete="CASCADE"))
    front = Column(Text)
    back = Column(Text)

    deck = relationship("Deck", back_populates="flashcards")

