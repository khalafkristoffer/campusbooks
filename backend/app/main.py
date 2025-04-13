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


# remove on deployment

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await create_db_and_tables()