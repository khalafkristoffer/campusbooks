from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
import app.database as database
from app.schemas.course import CourseCreate, CourseAPIModel
from app.crud.course import CRUDcreate_course, CRUDget_courses, CRUDget_course
from typing import List

router = APIRouter()


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