from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from app.core.limiter import limiter

# First, import and register all models
from app.models import *  # This will import all models in the correct order

# Then import other modules that depend on the models
from app.routes import books
from app.routes import courses
from app.database import Base, engine, get_db
from app.userDB import create_db_and_tables
from dotenv import load_dotenv
import os 
import cloudinary
from app.core.config import settings
from app.schemas.users import UserCreate, UserRead, UserUpdate
from app.crud.users import auth_backend, current_active_user, fastapi_users
from app.core.loadcourses import load_course_codes

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("dbusername"),
    api_key=os.getenv("apikey"),
    api_secret=os.getenv("apisecret"),
    secure=True
)

app = FastAPI(
  title="ChalmerShelf",        # settings.PROJECT_NAME
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

origins = [
  "localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    #allow all origins for now
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        # Uncomment this line if you want to drop all tables first
        # await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    
    # Fix the foreign key constraint issue

app.include_router(books.router)
app.include_router(courses.router)

#userauth 

app.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"],
    dependencies=[Depends(limiter.limit("5/minute"))]  # Strict limit for login attempts
)
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
    dependencies=[Depends(limiter.limit("3/hour"))]  # Very strict limit for registrations
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


# remove on deployment

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await create_db_and_tables()

@app.on_event("startup")
async def startup_db_client():
    """Run startup tasks"""
    # Get a database session
    db_generator = get_db()
    db = await anext(db_generator)
    try:
        # Load course codes
        await load_course_codes(db)
    finally:
        # Close the session
        await db.close()