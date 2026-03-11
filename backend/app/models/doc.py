from sqlalchemy import Text, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app.db.database import Base

class Doc(Base):
    __tablename__ = "docs"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    filename = Column(String)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"))
    project = relationship("Project", back_populates="docs")