from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class BookDBModel(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), index=True)
    author = Column(String(100))
    course_code = Column(String, ForeignKey("courses.code"))
    description = Column(String(500)) #temp delete if issues
    condition = Column(String(50))
    price = Column(Integer)
    location = Column(String(100))

    course = relationship("CourseDBModel", back_populates="books")
