from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from app.database import Base

class Book(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), index=True)
    author = Column(String(100))
    description = Column(Text)
    price = Column(int)
    condition = Column(String(50))
    location = Column(String(100))
    status = Column(String(50), default="Available")
    course_code = Column(String, ForeignKey("courses.code"))
    seller_id = Column(Integer, ForeignKey("users.id"))

    course = relationship("Course", back_populates="books")
