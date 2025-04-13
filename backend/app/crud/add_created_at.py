from sqlalchemy import text
from app.database import engine

async def add_created_at_column():
    """Add created_at column to books table if it doesn't exist"""
    async with engine.begin() as conn:
        # Check if column exists
        result = await conn.execute(
            text("SELECT column_name FROM information_schema.columns WHERE table_name='books' AND column_name='created_at'")
        )
        column_exists = result.fetchone() is not None
        
        if not column_exists:
            print("Adding created_at column to books table...")
            await conn.execute(
                text("ALTER TABLE books ADD COLUMN created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()")
            )
            print("Column added successfully.")
        else:
            print("created_at column already exists.")