from pydantic import BaseModel

class UserCreate(BaseModel):
    user_id: str
    username: str

class UserResponse(BaseModel):
    user_id: str
    username: str

    class Config:
        from_attributes = True