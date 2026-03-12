from pydantic import BaseModel

class GenFlash(BaseModel):
    deck_id: int
    project_id: int

