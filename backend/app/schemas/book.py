from pydantic import BaseModel, HttpUrl, Field
import uuid
from typing import Optional
from datetime import datetime

class BookBase(BaseModel):
    title: str
    author: str
    price: int
    description: str
    course_code: str
    condition: str

class BookCreate(BookBase):
    pass

class BookAPIModel(BookBase):
    id: int
    user_id: uuid.UUID  # Changed from str to uuid.UUID
    image_url: Optional[str] = None
    created_at: datetime
    
    class Config:
        orm_mode = True