from pydantic import BaseModel

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
    # seller_id: int      FOR LATER

    class Config:
        from_attributes = True