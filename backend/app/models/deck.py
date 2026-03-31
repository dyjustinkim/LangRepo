from sqlalchemy import Text, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app.db.database import Base

class Deck(Base):
    __tablename__ = "decks"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"))
    project = relationship("Project", back_populates="decks")

    flashcards = relationship(
        "Flashcard",
        back_populates="deck",
        cascade="all, delete"
    )

   