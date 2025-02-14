from pydantic import BaseModel

class CourseBase(BaseModel):
    code: str

class CourseCreate(CourseBase):
    """Schema used for creating a new course."""
    pass

class CourseAPIModel(CourseBase):
    """Schema returned from the API with additional ORM support."""
    class Config:
        from_attributes = True