import asyncio
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select
import os
from dotenv import load_dotenv
import json

# Adjust the import path based on your project structure
from app.models.course import CourseDBModel

#import database url from .env
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
#import from coursecodes.json in same folder

FIXED_COURSE_CODES_FILE = os.path.join(os.path.dirname(__file__), "coursecodes.json")

# Load course codes from the JSON file
with open(FIXED_COURSE_CODES_FILE, 'r') as f:
    FIXED_COURSE_CODES = json.load(f)
# -----------------------------------------

async def seed_data():
    print(f"Connecting to database: {DATABASE_URL}")
    engine = create_async_engine(DATABASE_URL, echo=False) # Set echo=True for debugging SQL
    AsyncSessionFactory = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

    async with AsyncSessionFactory() as session:
        async with session.begin(): # Use begin() for transaction management
            print(f"Seeding {len(FIXED_COURSE_CODES)} course codes...")
            added_count = 0
            skipped_count = 0

            for code in FIXED_COURSE_CODES:
                # Check if the course code already exists - use 'code' column name instead of 'course_code'
                result = await session.execute(
                    select(CourseDBModel).filter_by(code=code)
                )
                existing_course = result.scalars().first()

                if existing_course:
                    skipped_count += 1
                else:
                    # Create and add the new course code - use 'code' instead of 'course_code'
                    new_course = CourseDBModel(code=code)
                    session.add(new_course)
                    added_count += 1

            print(f"Finished seeding. Added: {added_count}, Skipped (already exist): {skipped_count}")
        # Session is automatically committed here if no exceptions occurred
        # Or rolled back if an exception happened within the 'async with session.begin():' block

    await engine.dispose() # Clean up the engine connection pool
    print("Database connection closed.")

if __name__ == "__main__":
    # Load environment variables (like DATABASE_URL) if needed
    # Adjust the path to your .env file if it's not in the backend root
    load_dotenv(dotenv_path="../.env")
    print("Running course seeding script...")
    asyncio.run(seed_data())
    print("Script finished.")
