from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.crud.book import *
import app.database as database
from app.schemas.book import BookCreate, BookAPIModel
from typing import Optional, List

router = APIRouter()

@router.post("/books/", response_model=BookAPIModel)
async def create_book(
    title: str = Form(...),
    author: str = Form(...),
    course_code: str = Form(...),
    description: str = Form(...),
    condition: str = Form(...),
    price: int = Form(...),
    location: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(database.get_db)
):
    book_data = {
        "title": title,
        "author": author,
        "course_code": course_code,
        "description": description,
        "condition": condition,
        "price": int(price),  # Convert price to integer
        "location": location,
    }
    book = BookCreate(**book_data)
    created_book = await CRUDcreate_book(db, book, image)
    return created_book

@router.get("/books/", response_model=List[BookAPIModel])
async def get_books(
    db: Session = Depends(database.get_db),
    skip: int = 0,
    limit: int = 10,
    course_code: Optional[str] = None,
    price_min: Optional[int] = None,
    price_max: Optional[int] = None,
    location: Optional[str] = None,
    condition: Optional[str] = None,
    title: Optional[str] = None,
):
    """
    Retrieve books with optional filtering.
    """
    books = CRUDget_books_with_filters(
        db,
        skip=skip,
        limit=limit,
        course_code=course_code,
        price_min=price_min,
        price_max=price_max,
        location=location,
        condition=condition,
        title=title 
    )
    return books

@router.get("/books/{course_code}", response_model=list[BookAPIModel])
async def get_books_by_course(course_code: str, db: Session = Depends(database.get_db)):
    books = CRUDget_books_by_course(db, course_code)
    if not books:
        raise HTTPException(status_code=404, detail="No books found")
    return books

