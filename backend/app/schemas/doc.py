from pydantic import BaseModel, ConfigDict

class DocCreate(BaseModel):
    name: str
    project_id: int
    filename: str

class DocResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    project_id: int
    filename: str
