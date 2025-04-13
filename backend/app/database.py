from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker



#import url from .env
from dotenv import load_dotenv
import os
load_dotenv()
SQLALCHEMY_DATABASE_URL = os.environ.get("DATABASE_URL")

# Create async SQLAlchemy engine
engine = create_async_engine(SQLALCHEMY_DATABASE_URL)

# Create async session class
SessionLocal = sessionmaker(
    engine, 
    class_=AsyncSession, 
    expire_on_commit=False
)

Base = declarative_base()

# Async db dependency
async def get_db():
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

