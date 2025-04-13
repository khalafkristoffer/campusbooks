from pydantic_settings import BaseSettings
from pydantic import Field, ConfigDict
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    # Database settings
    DATABASE_URL: str = Field(default="postgresql+asyncpg://postgres:postgres@localhost/chalmersshelf")
    
    # JWT settings
    SECRET: str = Field(default="default-secret-key-for-jwt")
    
    # Cloudinary settings - directly use environment variable names
    dbusername: str = Field(default="")
    apikey: str = Field(default="")
    apisecret: str = Field(default="")
    
    # API settings
    PROJECT_NAME: str = "ChalmerShelf"
    API_V1_STR: str = "/api/v1"

    # Use ConfigDict in Pydantic v2 instead of inner Config class
    model_config = ConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="allow"  # Allow extra fields from env vars
    )

    # Properties to maintain backward compatibility
    @property
    def SECRET_KEY(self) -> str:
        return self.SECRET
        
    @property
    def CLOUDINARY_CLOUD_NAME(self) -> str:
        return self.dbusername
        
    @property
    def CLOUDINARY_API_KEY(self) -> str:
        return self.apikey
        
    @property
    def CLOUDINARY_API_SECRET(self) -> str:
        return self.apisecret

settings = Settings()