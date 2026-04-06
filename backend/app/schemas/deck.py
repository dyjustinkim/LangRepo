from pydantic import BaseModel, ConfigDict

class DeckCreate(BaseModel):
    name: str
    project_id: int

class DeckResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    project_id: int
