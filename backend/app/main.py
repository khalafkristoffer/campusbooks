from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# First, import and register all models
from app.models import *  # This will import all models in the correct order

# Then import other modules that depend on the models
from app.routes import books
from app.routes import courses
from app.database import Base, engine
from app.userDB import create_db_and_tables
from dotenv import load_dotenv
import os 
import cloudinary
from app.core.config import settings
from fastapi import Depends
from app.schemas.users import UserCreate, UserRead, UserUpdate
from app.crud.users import auth_backend, current_active_user, fastapi_users
from app.middleware.rate_limiter import RateLimitMiddleware

load_dotenv()

# Configure cloudinary using settings from config
cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True
)

app = FastAPI(
  title="campusbooks",        # Use project name from settings
)

origins = [
  "http://localhost:5173",  # Frontend development URL
  "http://localhost:8000",  # Backend URL
  "https://chalmersshelf-api.onrender.com",
  "https://campusbooks.se",  # Production URL
  "https://www.campusbooks.se",  # Production URL
  "https://campusbooks.vercel.app" # Frontend production URL
]

# Add CORS middleware first
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add the Rate Limit middleware AFTER CORS but BEFORE routers
# Limit critical paths like auth and resource creation
app.add_middleware(
    RateLimitMiddleware,
    limit=60,  # Requests per window per IP
    window=60, # Window in seconds (1 minute)
    # List of paths to target for rate limiting:
    target_paths=[
        # Authentication endpoints
        "/auth/register",
        "/auth/jwt/login",
        "/auth/forgot-password",
        "/auth/request-verify-token",
        "/books/", # POST request to create a book
        
    ]
)

# startup events
from app.data.coursedata import seed_data

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        await create_db_and_tables()
    await seed_data()
    
    
app.include_router(books.router)
app.include_router(courses.router)

#userauth 

app.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)

@app.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}


