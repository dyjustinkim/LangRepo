from pydantic import BaseModel, ConfigDict

class UserCreate(BaseModel):
    user_id: str
    username: str

class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    user_id: str
    username: str

