from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import app.database as database
from app.schemas.course import CourseCreate, CourseAPIModel
from app.crud.course import CRUDcreate_course

router = APIRouter()

@router.post("/course_codes/", response_model=CourseAPIModel)
async def create_course_code(course: CourseCreate, db: Session = Depends(database.get_db)):
    created_course = CRUDcreate_course(db, course)
    return created_course