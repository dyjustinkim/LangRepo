from sqlalchemy.orm import Session
from app.models.project import Project
from app.schemas.project import ProjectCreate

def map_project(db: Session, project_name: str, auth0_id:str):
    project = db.query(Project).filter(Project.user_id == auth0_id["sub"], Project.name == project_name).first()
    return {"project_id": project.id}

def get_projects(db: Session, auth0_id:str):
    projects = db.query(Project).filter(Project.user_id == auth0_id["sub"]).all()
    return projects

def add_project(project: ProjectCreate, db: Session, auth0_id:str):    
    db_project = Project(name=project.name, user_id=auth0_id["sub"])    
    db.add(db_project)
    db.commit()
    db.refresh(db_project)

def delete_project(db: Session, project_id: int, auth0_id:str):
    project = db.query(Project).filter(Project.id == project_id).first()
    db.delete(project)
    db.commit()

def edit_project(db: Session, new_project: ProjectCreate, old_project: int, auth0_id:str):
    project = db.query(Project).filter(Project.id == old_project).first()
    project.name = new_project.name
    db.commit()