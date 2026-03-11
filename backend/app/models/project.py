from sqlalchemy import Text, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app.db.database import Base

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    user_id = Column(String, ForeignKey("users.user_id"))

    decks = relationship(
        "Deck",
        back_populates="project",
        cascade="all, delete"
    )

    docs = relationship(
        "Doc",
        back_populates="project",
        cascade="all, delete"
    )