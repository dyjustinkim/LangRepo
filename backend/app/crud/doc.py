from sqlalchemy.orm import Session
from app.models.doc import Doc
from app.schemas.doc import DocCreate
from app.schemas.genflash import GenFlash


from app.services.s3_service import generate_presigned_url, delete_file, read_doc
from app.services.ai_service import call_bedrock
from app.services.flashcard_service import bulk_save_objects

def get_docs(proj_id: int, db: Session, auth0_id:str):
    docs = db.query(Doc).filter(Doc.project_id == proj_id).order_by(Doc.id).all()
    return docs

def view_doc(doc_id: int, db: Session, auth0_id:str):
    doc = db.query(Doc).filter(Doc.id == doc_id).first()
    key = f"{auth0_id['sub']}/{doc.project_id}/{doc.filename}"
    url = generate_presigned_url(
        "get_object", key, 3600
    )
    return {"url": url, "name": doc.name, "project_id": doc.project_id} 

def add_doc(doc: DocCreate, db: Session, auth0_id:str):
    key = f"{auth0_id['sub']}/{doc.project_id}/{doc.filename}"
    url = generate_presigned_url(
        "put_object", key, 300, "application/pdf"
    )
    db_doc = Doc(name=doc.name, project_id = doc.project_id, filename=doc.filename)  
    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)
    return url

def delete_doc(db: Session, doc_id: int, auth0_id:str):
    db_doc = db.query(Doc).filter(Doc.id == doc_id).first()
    key = f"{auth0_id['sub']}/{db_doc.project_id}/{db_doc.filename}"
    try:
        delete_file(key)
    except Exception as e:
        raise Exception("Failed to delete file from S3") from e
    db.delete(db_doc)
    db.commit()

def edit_doc(db: Session, new_doc: DocCreate, old_doc: int, auth0_id:str):
    db_doc = db.query(Doc).filter(Doc.id == old_doc).first()
    db_doc.name = new_doc.name
    db.commit()

def generate_flashcards(info: GenFlash, db: Session, doc_id: int, auth0_id:str):
    doc = db.query(Doc).filter(Doc.id == doc_id).first()
    key = f"{auth0_id['sub']}/{doc.project_id}/{doc.filename}"
    pdf = read_doc(key)
    flashcards = call_bedrock(pdf)
    return bulk_save_objects(flashcards, info.deck_id, db)
    