from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from app.routes import books
from app.routes import courses
from app.database import Base, engine
from dotenv import load_dotenv
import os 
import cloudinary
from app.core.config import settings
from fastapi import Depends
from app.userDB import User, create_db_and_tables
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

Base.metadata.create_all(bind=engine)

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


@app.on_event("startup")
async def on_startup():
    # Not needed if you setup a migration system like Alembic
    await create_db_and_tables()
