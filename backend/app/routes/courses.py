from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
import app.database as database
from app.schemas.course import CourseCreate, CourseAPIModel
from app.crud.course import CRUDcreate_course, CRUDget_courses, CRUDget_course
from typing import List

router = APIRouter()

@router.post("/course_codes/", response_model=CourseAPIModel)
async def create_course(
    course: CourseCreate, 
    db: AsyncSession = Depends(database.get_db)
):
    return await CRUDcreate_course(db, course)

@router.post("/course_codes/bulk/", response_model=List[CourseAPIModel])
async def create_courses_bulk(
    courses: List[str], 
    db: AsyncSession = Depends(database.get_db)
):
    """Create multiple course codes at once from an array of strings"""
    created_courses = []
    
    for code in courses:
        # Check if course already exists to avoid duplicates
        existing = await CRUDget_course(db, code)
        if not existing:
            course = CourseCreate(code=code)
            created_course = await CRUDcreate_course(db, course)
            created_courses.append(created_course)
    
    return created_courses

@router.get("/course_codes/", response_model=List[CourseAPIModel])
async def get_course_codes(
    db: AsyncSession = Depends(database.get_db)
):
    # Fix: Use await with the async function
    return await CRUDget_courses(db)

@router.get("/course_codes/{course_code}", response_model=CourseAPIModel)
async def get_course(
    course_code: str, 
    db: AsyncSession = Depends(database.get_db)
):
    course = await CRUDget_course(db, course_code)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course