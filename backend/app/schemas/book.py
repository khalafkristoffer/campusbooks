from pydantic import BaseModel, HttpUrl, Field
import uuid
from typing import Optional

class BookBase(BaseModel):
    title: str
    author: str
    course_code: str
    description: str
    condition: str
    price: int
    location: str

class BookCreate(BookBase):
    pass

class BookAPIModel(BookBase):
    id: int
    image_url: Optional[str] = None
    user_id: uuid.UUID # owner id 

    class Config:
        from_attributes = True