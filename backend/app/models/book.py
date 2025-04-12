from sqlalchemy import Column, Integer, String, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.types import UUID
from app.database import Base
import uuid

class BookDBModel(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    author = Column(String)
    course_code = Column(String)
    description = Column(Text)
    condition = Column(String)
    price = Column(Integer)
    location = Column(String)
    image_url = Column(String)
    
    # Update the foreign key reference to point to the users table
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    # Use string reference for relationship
    owner = relationship("User", back_populates="books")
    
    # Add a relationship to course (optional)
    course = relationship(
        "CourseDBModel",
        primaryjoin="BookDBModel.course_code == foreign(CourseDBModel.code)",
        viewonly=True  # This makes it a read-only relationship
    )
    
    def __repr__(self):
        return f"<Book {self.title}>"
