from typing import AsyncGenerator, List
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from fastapi import Depends
from fastapi_users.db import SQLAlchemyBaseUserTableUUID, SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from sqlalchemy.orm import sessionmaker

# Import the shared Base from database.py instead of creating a new one
from app.database import Base, engine, get_db as get_async_session

# Remove this since we're using the shared Base
# DATABASE_URL = "postgresql+asyncpg://postgres:chalmers@localhost:5432/chalmersshelf"
# Base: DeclarativeMeta = declarative_base()


class User(SQLAlchemyBaseUserTableUUID, Base):
    __tablename__ = "users"
    phone_number = Column(String, unique=True, index=True, nullable=True)
    
    # Use string reference to break circular dependency
    books = relationship("BookDBModel", back_populates="owner", cascade="all, delete-orphan")


# Remove duplicate engine and session maker
# engine = create_async_engine(DATABASE_URL)
async_session_maker = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


# Keep your existing functions
# async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
#    async with async_session_maker() as session:
#        yield session


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)
