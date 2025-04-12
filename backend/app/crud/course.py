from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.course import CourseDBModel
from app.schemas.course import CourseCreate

async def CRUDcreate_course(db, course: CourseCreate):
    """Create a course if it doesn't already exist"""
    # Check if course already exists
    existing_course = await CRUDget_course(db, course.code)
    if existing_course:
        return existing_course
        
    # Create new course
    db_course = CourseDBModel(code=course.code)
    db.add(db_course)
    await db.commit()
    await db.refresh(db_course)
    return db_course

async def CRUDget_courses(db):
    stmt = select(CourseDBModel).order_by(CourseDBModel.code)
    result = await db.execute(stmt)
    return result.scalars().all()

async def CRUDget_course(db, code: str):
    """Get a course by its code"""
    query = select(CourseDBModel).where(CourseDBModel.code == code)
    result = await db.execute(query)
    return result.scalar_one_or_none()