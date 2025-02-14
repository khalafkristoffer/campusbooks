from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud.book import *
import app.database as database
from app.schemas.book import *

router = APIRouter()

@router.post("/books/", response_model=BookAPIModel)
async def create_book(book: BookCreate, db: Session = Depends(database.get_db)):
    created_book = CRUDcreate_book(db, book)
    return created_book

@router.get("/books/", response_model=list[BookAPIModel])
async def get_books(db: Session = Depends(database.get_db), skip: int = 0, limit: int = 10):
    return CRUDget_books(db, skip, limit)

@router.get("/books/{course_code}", response_model=list[BookAPIModel])
async def get_books_by_course(course_code: str, db: Session = Depends(database.get_db)):
    books = CRUDget_books_by_course(db, course_code)
    if not books:
        raise HTTPException(status_code=404, detail="No books found")
    return books