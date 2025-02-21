from sqlalchemy import Column, String
from sqlalchemy.orm import Session
from app.database import Base
from app.models.book import BookDBModel
from app.schemas.book import BookBase
from app.crud.uploadImage import upload_to_cloudinary
from typing import List, Optional
from app import models

async def CRUDcreate_book(db: Session, book: BookBase, image):
    link = await upload_to_cloudinary(image)
    # we have to wait for the io operation to finish before we can proceed
    db_book = BookDBModel(**book.model_dump())
    db_book.image_url = link
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def CRUDget_book(db: Session, book_id: int):
    """Get a book by its ID"""
    return db.query(BookDBModel).filter(BookDBModel.id == book_id).first()

def CRUDget_books(db: Session, skip: int = 0, limit: int = 10):
    """Get a list of books with pagination"""
    return db.query(BookDBModel).offset(skip).limit(limit).all()

def CRUDupdate_book(db: Session, book_id: int, update_data: dict):
    """Update a book's information"""
    book = CRUDget_book(db, book_id)
    if book:
        for key, value in update_data.items():
            setattr(book, key, value)
        db.commit()
        db.refresh(book)
    return book

def delete_book(db: Session, book_id: int):
    """Delete a book from the database"""
    book = CRUDget_book(db, book_id)
    if book:
        db.delete(book)
        db.commit()
        return True
    return False

def CRUDget_books_by_course(db: Session, course_code: str):
    """Get all books for a specific course"""
    return db.query(BookDBModel).filter(BookDBModel.course_code == course_code).all()

def CRUDsearch_books_by_title(db: Session, query: str):
    """Search books by title (case-insensitive)"""
    return db.query(BookDBModel).filter(BookDBModel.title.ilike(f"%{query}%")).all()

def CRUDget_books_by_price_range(db: Session, min_price: int, max_price: int):
    """Get books within a specified price range"""
    return db.query(BookDBModel).filter(BookDBModel.price >= min_price, BookDBModel.price <= max_price).all()

def CRUDget_books_with_filters(
    db: Session,
    skip: int = 0,
    limit: int = 10,
    course_code: Optional[str] = None,
    price_min: Optional[int] = None,
    price_max: Optional[int] = None,
    location: Optional[str] = None,
    condition: Optional[str] = None,
):
    """
    Retrieve books with optional filtering.
    """
    query = db.query(models.BookDBModel)

    if course_code:
        query = query.filter(models.BookDBModel.course_code == course_code)
    if price_min:
        query = query.filter(models.BookDBModel.price >= price_min)
    if price_max:
        query = query.filter(models.BookDBModel.price <= price_max)
    if location:
        query = query.filter(models.BookDBModel.location == location)
    if condition:
        query = query.filter(models.BookDBModel.condition == condition)

    return query.offset(skip).limit(limit).all()
