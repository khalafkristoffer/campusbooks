from sqlalchemy import Column, String
from app.database import Base

class CourseDBModel(Base):
    __tablename__ = "courses"

    code = Column(String, primary_key=True, index=True)
    
    def __repr__(self):
        return f"<Course {self.code}>"


    