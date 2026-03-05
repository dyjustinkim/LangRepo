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

class DeckCreate(BaseModel):
    name: str

class DeckResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True
    
class UserCreate(BaseModel):
    user_id: str
    nickname: str

class UserResponse(BaseModel):
    id: str
    user_id: str
    nickname: str

    class Config:
        from_attributes = True


