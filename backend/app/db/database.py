from sqlalchemy import create_engine
from app.core.settings import settings
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

connection_str = settings.DATABASE_URL
engine = create_engine(connection_str)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()