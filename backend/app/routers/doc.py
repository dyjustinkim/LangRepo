from fastapi import APIRouter, Depends
from app.db.database import db_dependency
from app.auth.dependencies import verify_user
import app.crud.doc as doc_crud
from app.schemas.doc import DocCreate, DocResponse
from app.schemas.genflash import GenFlash

router = APIRouter(prefix="/docs", tags=["docs"])

@router.get("/{proj_id}", response_model=list[DocResponse])
def get_docs(proj_id: int, db: db_dependency, user=Depends(verify_user)):
    return doc_crud.get_docs(proj_id, db, user)

@router.get("/{doc_id}/view")
def view_doc(doc_id: int, db: db_dependency, user=Depends(verify_user)):
    return doc_crud.view_doc(doc_id, db, user)

@router.post("")
def add_doc(doc: DocCreate, db: db_dependency, user=Depends(verify_user)):  
    return doc_crud.add_doc(doc, db, user)

@router.delete("/{doc_id}")
def delete_doc(db: db_dependency, doc_id: int, user=Depends(verify_user)):
    doc_crud.delete_doc(db, doc_id, user)

@router.put("/{old_doc}")
def edit_doc(new_doc: DocCreate, db: db_dependency, old_doc: int,  user=Depends(verify_user)):
    doc_crud.edit_doc(db, new_doc, old_doc, user)

@router.post("/{doc_id}/generate")
def generate_flashcards(info: GenFlash, db: db_dependency, doc_id: int,  user=Depends(verify_user)):
    doc_crud.generate_flashcards(info, db, doc_id, user)