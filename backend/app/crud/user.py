from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate


def map_user(db: Session, user_sub: str, auth0_id:str):
    user = db.query(User).filter(User.user_id == user_sub).first()
    username = user.username if bool(user) else None
    return {"exists": bool(user), "username": username}

def get_user(db: Session, auth0_id:str):
    user = db.query(User).filter(User.user_id == auth0_id["sub"]).first()
    return user.username
    
def add_username(new_user: UserCreate, db: Session, auth0_id:str):   
    db_deck = User(username=new_user.username, user_id=auth0_id["sub"])    
    db.add(db_deck)
    db.commit()
    db.refresh(db_deck)

def edit_username(db: Session, new_name: UserCreate, user_id: int, auth0_id:str):
    user = db.query(User).filter(User.user_id == auth0_id["sub"]).first()
    user.username = new_name.username
    db.commit()