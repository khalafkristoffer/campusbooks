from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.models.course import CourseDBModel
from app.schemas.course import *

def CRUDcreate_course(db: Session, course: CourseCreate):
    db_course = CourseDBModel(**course.dict())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

def CRUDget_courses(db: Session):
    # Get all course codes
    return db.query(CourseDBModel).all()