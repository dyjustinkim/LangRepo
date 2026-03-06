from pydantic import BaseModel

class UserCreate(BaseModel):
    user_id: str
    nickname: str

class UserResponse(BaseModel):
    id: str
    user_id: str
    nickname: str

    class Config:
        from_attributes = True

class ProjectCreate(BaseModel):
    name: str

class ProjectResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

class DeckCreate(BaseModel):
    name: str
    project_id: int

class DeckResponse(BaseModel):
    id: int
    name: str
    project_id: int

    class Config:
        from_attributes = True

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


