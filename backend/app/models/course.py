from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from app.database import Base

class CourseDBModel(Base):
    __tablename__ = "courses"
    code = Column(String, primary_key=True, index=True)
    
    books = relationship("BookDBModel", back_populates="course")
