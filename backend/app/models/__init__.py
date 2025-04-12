# This file ensures models are loaded in the correct order

# Import and initialize models in the right order
from app.userDB import User  # First, the User model
from app.models.book import BookDBModel  # Then dependent models
from app.models.course import CourseDBModel  # Other models

# to help with circular imports n shit type shit