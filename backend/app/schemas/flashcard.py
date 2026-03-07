from pydantic import BaseModel

class CardCreate(BaseModel):
    deck_id: int
    front: str
    back: str

class CardResponse(BaseModel):
    id: int
    deck_id: int
    front: str
    back: str

    class Config:
        from_attributes = True