from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import schemas, crud, database

router = APIRouter()

@router.post("/books/", response_model=schemas.Book)
async def create_book(book: schemas.BookCreate, db: Session = Depends(database.get_db), seller_id: int = 1):
    return crud.create_book(db, book, seller_id)

@router.get("/books/", response_model=list[schemas.Book])
async def get_books(db: Session = Depends(database.get_db), skip: int = 0, limit: int = 10):
    return crud.get_books(db, skip, limit)

@router.get("/books/{course_code}", response_model=list[schemas.Book])
async def get_books_by_course(course_code: str, db: Session = Depends(database.get_db)):
    books = crud.get_books_by_course(db, course_code)
    if not books:
        raise HTTPException(status_code=404, detail="No books found")
    return books