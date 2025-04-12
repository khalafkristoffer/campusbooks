from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
import app.database as database
from app.schemas.course import CourseAPIModel
from app.crud.course import CRUDget_courses, CRUDget_course
from typing import List
from app.core.limiter import limiter

router = APIRouter()

@router.get("/course_codes/", response_model=List[CourseAPIModel])
@limiter.limit("20/minute")
async def get_course_codes(
    db: AsyncSession = Depends(database.get_db)
):
    return await CRUDget_courses(db)

@router.get("/course_codes/{course_code}", response_model=CourseAPIModel)
@limiter.limit("30/minute")
async def get_course(
    course_code: str, 
    db: AsyncSession = Depends(database.get_db)
):
    course = await CRUDget_course(db, course_code)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course