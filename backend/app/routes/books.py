from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.crud.book import *
import app.database as database
from app.schemas.book import BookCreate, BookAPIModel
from typing import Optional, List
from app.userDB import User
from app.crud.users import current_active_user
import uuid
from fastapi_users import schemas
from pydantic import BaseModel
from app.models.book import BookDBModel

router = APIRouter()

@router.post("/books/", response_model=BookAPIModel)
async def create_book(
    title: str = Form(...),
    author: str = Form(...),
    course_code: str = Form(...),
    description: str = Form(...),
    condition: str = Form(...),
    price: int = Form(...),
    # location field removed
    image: UploadFile = File(...),
    db: AsyncSession = Depends(database.get_db),
    current_user: User = Depends(current_active_user)
):
    book_data = {
        "title": title,
        "author": author,
        "course_code": course_code,
        "description": description,
        "condition": condition,
        "price": int(price),
        # location field removed
    }
    book = BookCreate(**book_data)
    created_book = await CRUDcreate_book(db, book, image, current_user.id)
    return created_book

@router.get("/books/", response_model=List[BookAPIModel])
async def get_books(
    db: AsyncSession = Depends(database.get_db),
    skip: int = 0,
    limit: int = 10,
    course_code: Optional[str] = None,
    price_min: Optional[int] = None,
    price_max: Optional[int] = None,
    # location parameter removed
    condition: Optional[str] = None,
    title: Optional[str] = None,
):
    """
    Retrieve books with optional filtering.
    """
    books = await CRUDget_books_with_filters(
        db,
        skip=skip,
        limit=limit,
        course_code=course_code,
        price_min=price_min,
        price_max=price_max,
        # location parameter removed
        condition=condition,
        title=title 
    )
    return books

@router.get("/books/course/{course_code}", response_model=List[BookAPIModel])
async def get_books_by_course(course_code: str, db: AsyncSession = Depends(database.get_db)):
    """Get books by course code"""
    books = await CRUDget_books_by_course(db, course_code)
    if not books:
        raise HTTPException(status_code=404, detail="No books found")
    return books

@router.get("/books/id/{book_id}", response_model=BookAPIModel)
async def get_book_details(book_id: int, db: AsyncSession = Depends(database.get_db)):
    """Get book details by ID"""
    book = await CRUDget_book(db, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@router.get("/my-books/", response_model=List[BookAPIModel])
async def get_my_books(
    db: AsyncSession = Depends(database.get_db),
    current_user: User = Depends(current_active_user)
):
    """Get books owned by the current user"""
    books = await CRUDget_books_by_user(db, current_user.id)
    return books

@router.delete("/books/{book_id}")
async def delete_book(
    book_id: int,
    db: AsyncSession = Depends(database.get_db),
    current_user: User = Depends(current_active_user)
):
    """Delete a book if the current user is the owner"""
    book = await CRUDget_book(db, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    # Check if the current user is the owner
    if book.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this book")
    
    success = await CRUDdelete_book(db, book_id)
    if success:
        return {"message": "Book successfully deleted"}
    raise HTTPException(status_code=500, detail="Failed to delete book")

@router.put("/books/{book_id}", response_model=BookAPIModel)
async def update_book(
    book_id: int,
    update_data: dict,
    db: AsyncSession = Depends(database.get_db),
    current_user: User = Depends(current_active_user)
):
    """Update a book if the current user is the owner"""
    book = await CRUDget_book(db, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    # Check if the current user is the owner
    if book.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this book")
    
    updated_book = await CRUDupdate_book(db, book_id, update_data)
    return updated_book

# Define a proper response model for seller info that includes phone_number
class SellerInfo(BaseModel):
    email: str
    phone_number: Optional[str] = None

@router.get("/books/id/{book_id}/seller-info", response_model=SellerInfo)
async def get_seller_info(
    book_id: int,
    db: AsyncSession = Depends(database.get_db),
    current_user: User = Depends(current_active_user)
):
    """Get contact information for the seller of a specific book"""
    # First get the book
    book = await CRUDget_book(db, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    stmt = select(User).where(User.id == book.user_id)
    result = await db.execute(stmt)
    owner = result.scalar_one_or_none()
    
    if not owner:
        raise HTTPException(status_code=404, detail="Book owner not found")
    
    # Return email and phone_number (if available)
    return {
        "email": owner.email,
        "phone_number": owner.phone_number
    }

