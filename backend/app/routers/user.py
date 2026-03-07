from fastapi import APIRouter, Depends
from app.db.database import db_dependency
from app.auth.dependencies import verify_user
import app.crud.user as user_crud
from app.schemas.user import UserCreate

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/{user_sub}")
def map_user(db: db_dependency, user_sub: str, user=Depends(verify_user)):
    return user_crud.map_user(db, user_sub, user)

@router.get("", response_model=str)
def get_user(db: db_dependency, user=Depends(verify_user)):
    return user_crud.get_user(db, user)
    
@router.post("")
def add_username(new_user: UserCreate, db: db_dependency, user=Depends(verify_user)):   
    user_crud.add_username(new_user, db, user)

@router.put("/{user_id}")
def edit_username(new_name: UserCreate, db: db_dependency, user_id: str,  user=Depends(verify_user)):
    user_crud.edit_username(db, new_name, user_id, user)