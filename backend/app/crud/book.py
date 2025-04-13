from sqlalchemy import Column, String, select, update, delete
from sqlalchemy.orm import Session
from app.database import Base
from app.models.book import BookDBModel
from app.schemas.book import BookBase, BookCreate
from app.crud.uploadImage import upload_to_cloudinary
from typing import List, Optional
from app import models
import uuid

# Update your book CRUD functions to use async SQLAlchemy

async def CRUDcreate_book(db, book: BookCreate, image, user_id):
    """Create a book with the current user as the owner"""
    link = await upload_to_cloudinary(image)
    db_book = BookDBModel(**book.dict(), user_id=user_id)
    db_book.image_url = link
    db.add(db_book)
    await db.commit()
    await db.refresh(db_book)
    return db_book

async def CRUDget_book(db, book_id: int):
    """Get a book by its ID"""
    # Now include created_at field
    stmt = select(
        BookDBModel.id,
        BookDBModel.title,
        BookDBModel.author,
        BookDBModel.price,
        BookDBModel.description,
        BookDBModel.condition,
        BookDBModel.course_code,
        BookDBModel.image_url,
        BookDBModel.user_id,
        BookDBModel.created_at
    ).where(BookDBModel.id == book_id)
    result = await db.execute(stmt)
    return result.mappings().one_or_none()

async def CRUDget_books_with_filters(
    db,
    skip: int = 0,
    limit: int = 100,
    course_code: Optional[str] = None,
    price_min: Optional[int] = None,
    price_max: Optional[int] = None,
    condition: Optional[str] = None,
    title: Optional[str] = None,
):
    """
    Retrieve books with optional filtering.
    """
    # Now include created_at field
    stmt = select(
        BookDBModel.id,
        BookDBModel.title,
        BookDBModel.author,
        BookDBModel.price,
        BookDBModel.description,
        BookDBModel.condition,
        BookDBModel.course_code,
        BookDBModel.image_url,
        BookDBModel.user_id,
        BookDBModel.created_at
    ).offset(skip).limit(limit)
    
    # Add filters
    if course_code:
        stmt = stmt.where(BookDBModel.course_code == course_code)
    if price_min is not None:
        stmt = stmt.where(BookDBModel.price >= price_min)
    if price_max is not None:
        stmt = stmt.where(BookDBModel.price <= price_max)
    if condition:
        stmt = stmt.where(BookDBModel.condition == condition)
    if title:
        stmt = stmt.where(BookDBModel.title.ilike(f"%{title}%"))
        
    result = await db.execute(stmt)
    return result.mappings().all()

async def CRUDget_books_by_course(db, course_code: str):
    """Get all books for a specific course"""
    # Now include created_at field
    stmt = select(
        BookDBModel.id,
        BookDBModel.title,
        BookDBModel.author,
        BookDBModel.price,
        BookDBModel.description,
        BookDBModel.condition,
        BookDBModel.course_code,
        BookDBModel.image_url,
        BookDBModel.user_id,
        BookDBModel.created_at
    ).where(BookDBModel.course_code == course_code)
    result = await db.execute(stmt)
    return result.mappings().all()

async def CRUDget_books_by_user(db, user_id):
    """Get all books owned by a specific user"""
    # Now include created_at field
    stmt = select(
        BookDBModel.id,
        BookDBModel.title,
        BookDBModel.author,
        BookDBModel.price,
        BookDBModel.description,
        BookDBModel.condition,
        BookDBModel.course_code,
        BookDBModel.image_url,
        BookDBModel.user_id,
        BookDBModel.created_at
    ).where(BookDBModel.user_id == user_id)
    result = await db.execute(stmt)
    return result.mappings().all()

async def CRUDdelete_book(db, book_id: int):
    """Delete a book from the database"""
    stmt = delete(BookDBModel).where(BookDBModel.id == book_id)
    await db.execute(stmt)
    await db.commit()
    return True

async def CRUDupdate_book(db, book_id: int, update_data: dict):
    """Update a book's information"""
    stmt = update(BookDBModel).where(BookDBModel.id == book_id).values(**update_data)
    await db.execute(stmt)
    await db.commit()
    
    # Get the updated book
    return await CRUDget_book(db, book_id)

async def CRUDget_books(db: Session, skip: int = 0, limit: int = 10):
    """Get a list of books with pagination"""
    # Now include created_at field
    stmt = select(
        BookDBModel.id,
        BookDBModel.title,
        BookDBModel.author,
        BookDBModel.price,
        BookDBModel.description,
        BookDBModel.condition,
        BookDBModel.course_code,
        BookDBModel.image_url,
        BookDBModel.user_id,
        BookDBModel.created_at
    ).offset(skip).limit(limit)
    result = await db.execute(stmt)
    return result.mappings().all()

async def CRUDsearch_books_by_title(db: Session, query: str):
    """Search books by title (case-insensitive)"""
    # Now include created_at field
    stmt = select(
        BookDBModel.id,
        BookDBModel.title,
        BookDBModel.author,
        BookDBModel.price,
        BookDBModel.description,
        BookDBModel.condition,
        BookDBModel.course_code,
        BookDBModel.image_url,
        BookDBModel.user_id,
        BookDBModel.created_at
    ).where(BookDBModel.title.ilike(f"%{query}%"))
    result = await db.execute(stmt)
    return result.mappings().all()

async def CRUDget_books_by_price_range(db: Session, min_price: int, max_price: int):
    """Get books within a specified price range"""
    # Now include created_at field
    stmt = select(
        BookDBModel.id,
        BookDBModel.title,
        BookDBModel.author,
        BookDBModel.price,
        BookDBModel.description,
        BookDBModel.condition,
        BookDBModel.course_code,
        BookDBModel.image_url,
        BookDBModel.user_id,
        BookDBModel.created_at
    ).where(BookDBModel.price >= min_price, BookDBModel.price <= max_price)
    result = await db.execute(stmt)
    return result.mappings().all()
