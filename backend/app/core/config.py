from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    # Database settings
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:postgres@localhost/chalmersshelf")
    
    # JWT settings
    SECRET_KEY: str = os.getenv("SECRET", "default-secret-key-for-jwt")
    
    # Cloudinary settings
    CLOUDINARY_CLOUD_NAME: str = os.getenv("dbusername", "")
    CLOUDINARY_API_KEY: str = os.getenv("apikey", "")
    CLOUDINARY_API_SECRET: str = os.getenv("apisecret", "")
    
    # API settings
    PROJECT_NAME: str = "ChalmerShelf"
    API_V1_STR: str = "/api/v1"

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()