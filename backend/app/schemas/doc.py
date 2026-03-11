from pydantic import BaseModel

class DocCreate(BaseModel):
    name: str
    project_id: int
    filename: str

class DocResponse(BaseModel):
    id: int
    name: str
    project_id: int
    filename: str

    class Config:
        from_attributes = True