import json
import os
import logging
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.course import CourseDBModel
from app.schemas.course import CourseCreate
from app.crud.course import CRUDcreate_course

logger = logging.getLogger(__name__)

async def load_course_codes(db_session: AsyncSession):
    """Load course codes from JSON file into database during startup"""
    try:
        # Path to course codes file (relative to this file)
        # relative path... backend\app\coursecodes.json
        file_path =  os.path.join(os.path.dirname(__file__), 'coursecodes.json')
        
        # Read course codes from file
        with open(file_path, 'r') as f:
            course_codes = json.load(f)
            
        logger.info(f"Found {len(course_codes)} course codes to load")
        
        # Check which codes already exist in the database
        existing_courses = await db_session.execute(select(CourseDBModel.code))
        existing_codes = {row[0] for row in existing_courses.all()}
        
        # Add only new codes
        created_count = 0
        for code in course_codes:
            if code not in existing_codes:
                course = CourseCreate(code=code)
                await CRUDcreate_course(db_session, course)
                created_count += 1
        
        if created_count > 0:
            await db_session.commit()
            logger.info(f"Added {created_count} new course codes to the database")
        else:
            logger.info("No new course codes to add")
            
    except Exception as e:
        logger.error(f"Error loading course codes: {e}")
        await db_session.rollback()
        raise