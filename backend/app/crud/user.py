from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate

def get_user(db: Session, auth0_id:str):
    user = db.query(User).filter(User.user_id == auth0_id["sub"]).first()
    return user
    
def add_username(new_user: UserCreate, db: Session, auth0_id:str):   
    user = db.query(User).filter_by(username=new_user.username).first()
    if user:
        return {"exists": True}
    else:
        db_user = User(username=new_user.username, user_id=auth0_id["sub"])    
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return {"exists": False}

def edit_username(db: Session, new_name: UserCreate, user_id: int, auth0_id:str):
    search_user = db.query(User).filter_by(username=new_name.username).first()
    if search_user:
        return {"exists": True}
    else:
        user = db.query(User).filter(User.user_id == auth0_id["sub"]).first()
        user.username = new_name.username
        db.commit()
        return {"exists": False}