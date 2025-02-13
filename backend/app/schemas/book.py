from pydantic import BaseModel
from typing import List, Optional

class BookBase(BaseModel):
    title: str
    author: str
    course_code: str
    condition: str
    price: int
    location: str

class BookCreate(BookBase):
    pass

class Book(BookBase):
    id: int
    seller_id: int

    class Config:
        from_attributes = True