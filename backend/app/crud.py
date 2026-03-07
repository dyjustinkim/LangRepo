from sqlalchemy.orm import Session
import app.db.models as models
import app.schemas as schemas

def map_user(db: Session, user_sub: str, auth0_id:str):
    user = db.query(models.User).filter(models.User.user_id == user_sub).first()
    username = user.username if bool(user) else None
    return {"exists": bool(user), "username": username}

def get_user(db: Session, auth0_id:str):
    user = db.query(models.User).filter(models.User.user_id == auth0_id["sub"]).first()
    return user.username
    
def add_username(new_user: schemas.UserCreate, db: Session, auth0_id:str):   
    db_deck = models.User(username=new_user.username, user_id=auth0_id["sub"])    
    db.add(db_deck)
    db.commit()
    db.refresh(db_deck)

def map_project(db: Session, project_name: str, auth0_id:str):
    project = db.query(models.Project).filter(models.Project.user_id == auth0_id["sub"], models.Project.name == project_name).first()
    return {"project_id": project.id}

def get_projects(db: Session, auth0_id:str):
    projects = db.query(models.Project).filter(models.Project.user_id == auth0_id["sub"]).all()
    return projects

def add_project(project: schemas.ProjectCreate, db: Session, auth0_id:str):    
    db_project = models.Project(name=project.name, user_id=auth0_id["sub"])    
    db.add(db_project)
    db.commit()
    db.refresh(db_project)

def delete_project(db: Session, project_name: str, auth0_id:str):
    project = db.query(models.Project).filter(models.Project.user_id == auth0_id["sub"], models.Project.name == project_name).first()
    db.delete(project)
    db.commit()

def edit_project(db: Session, new_project: schemas.ProjectCreate, old_project: str, auth0_id:str):
    project = db.query(models.Project).filter(models.Project.user_id == auth0_id["sub"], models.Project.name == old_project).first()
    project.name = new_project.name
   
    db.commit()

def get_decks(proj_id: int, db: Session, auth0_id:str):
    decks = db.query(models.Deck).filter(models.Deck.project_id == proj_id).all()
    return decks

def add_deck(deck: schemas.DeckCreate, db: Session, auth0_id:str):
    db_deck = models.Deck(name=deck.name, project_id = deck.project_id)  
    db.add(db_deck)
    db.commit()
    db.refresh(db_deck)

