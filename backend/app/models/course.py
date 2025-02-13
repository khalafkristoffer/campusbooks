from sqlalchemy import Column, String, Text
from sqlalchemy.orm import relationship
from app.database import Base

class Course(Base):
    __tablename__ = "courses"
    code = Column(String, primary_key=True, index=True)
    books = relationship("Book", back_populates="course") 