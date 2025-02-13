from sqlalchemy import Column, String
from sqlalchemy.orm import Session
from app.database import Base
from app.models.book import BookDBModel
from app.schemas.book import BookCreate

class BookDBModel(Base):
    __tablename__ = "books"
    id = Column(String, primary_key=True)
    # Add other book attributes here

def create_book(db: Session, book: BookCreate, seller_id: int):
    """Create a new book entry in the database"""
    db_book = BookDBModel(
        title=book.title,
        author=book.author,
        description=book.description,
        course_code=book.course_code,
        condition=book.condition,
        price=book.price,
        location=book.location,
        )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def get_book(db: Session, book_id: int):
    """Get a book by its ID"""
    return db.query(BookDBModel).filter(BookDBModel.id == book_id).first()

def get_books(db: Session, skip: int = 0, limit: int = 10):
    """Get a list of books with pagination"""
    return db.query(BookDBModel).offset(skip).limit(limit).all()

def update_book(db: Session, book_id: int, update_data: dict):
    """Update a book's information"""
    book = get_book(db, book_id)
    if book:
        for key, value in update_data.items():
            setattr(book, key, value)
        db.commit()
        db.refresh(book)
    return book

def delete_book(db: Session, book_id: int):
    """Delete a book from the database"""
    book = get_book(db, book_id)
    if book:
        db.delete(book)
        db.commit()
        return True
    return False

def get_books_by_course(db: Session, course_code: str):
    """Get all books for a specific course"""
    return db.query(BookDBModel).filter(BookDBModel.course_code == course_code).all()

def search_books_by_title(db: Session, query: str):
    """Search books by title (case-insensitive)"""
    return db.query(BookDBModel).filter(BookDBModel.title.ilike(f"%{query}%")).all()
