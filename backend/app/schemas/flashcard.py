from pydantic import BaseModel, ConfigDict

class FlashcardCreate(BaseModel):
    deck_id: int
    front: str
    back: str

class FlashcardResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    deck_id: int
    front: str
    back: str