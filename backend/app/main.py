from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from app.routes import books
from app.routes import courses
from app.database import Base, engine
from dotenv import load_dotenv
import os 
import cloudinary
from app.core.config import settings




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
