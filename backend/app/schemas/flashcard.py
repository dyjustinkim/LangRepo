from pydantic import BaseModel

class FlashcardCreate(BaseModel):
    deck_id: int
    front: str
    back: str

class FlashcardResponse(BaseModel):
    id: int
    deck_id: int
    front: str
    back: str

    class Config:
        from_attributes = True