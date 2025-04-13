from sqlalchemy import Column, Integer, String, ForeignKey, Text, Enum, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.types import UUID
from app.database import Base
from datetime import datetime
import uuid

class BookDBModel(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    description = Column(String, nullable=False)
    condition = Column(String, nullable=False)
    course_code = Column(String, ForeignKey("courses.code"))
    image_url = Column(String, nullable=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    owner = relationship("User", back_populates="books")
    
    course = relationship(
        "CourseDBModel",
        primaryjoin="BookDBModel.course_code == foreign(CourseDBModel.code)",
        viewonly=True
    )
    
    def __repr__(self):
        return f"<Book {self.title}>"
