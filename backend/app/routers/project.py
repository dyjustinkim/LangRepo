from fastapi import APIRouter, Depends
from app.db.database import db_dependency
from app.auth.dependencies import verify_user
import app.crud.project as project_crud
from app.schemas.project import ProjectCreate, ProjectResponse

router = APIRouter(prefix="/projects", tags=["projects"])

@router.get("/{project_name}")
def map_project(db: db_dependency, project_name: str,  user=Depends(verify_user)):
    return project_crud.map_project(db, project_name, user)

@router.get("", response_model=list[ProjectResponse])
def get_projects(db: db_dependency, user=Depends(verify_user)):
    return project_crud.get_projects(db, user)

@router.post("")
def add_project(project: ProjectCreate, db: db_dependency, user=Depends(verify_user)):
    project_crud.add_project(project, db, user)

@router.delete("/{project_id}")
def delete_project(db: db_dependency, project_id: int,  user=Depends(verify_user)):
    project_crud.delete_project(db, project_id, user)

@router.put("/{old_project}")
def edit_project(new_project: ProjectCreate, db: db_dependency, old_project: int,  user=Depends(verify_user)):
    project_crud.edit_project(db, new_project, old_project, user)