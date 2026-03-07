from pydantic import BaseModel

class DeckCreate(BaseModel):
    name: str
    project_id: int

class DeckResponse(BaseModel):
    id: int
    name: str
    project_id: int

    class Config:
        from_attributes = True