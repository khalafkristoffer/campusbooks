import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from app.database import Base, SQLALCHEMY_DATABASE_URL

async def reset_db_async():
    # Create a new async engine instance for this operation
    engine = create_async_engine(SQLALCHEMY_DATABASE_URL)
    
    # Drop all tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    
    # Create all tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    # Close the engine
    await engine.dispose()
    
    print("Database reset successfully!")

def reset_db():
    asyncio.run(reset_db_async())

if __name__ == "__main__":
    reset_db()