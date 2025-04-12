import uuid
from typing import List, Optional
from fastapi_users import schemas
from pydantic import BaseModel, ConfigDict

class BookInUserResponse(BaseModel):
    id: int
    title: str
    
    model_config = ConfigDict(from_attributes=True)

# Fix for the registration error - creating a custom UserRead model
class UserRead(schemas.BaseUser[uuid.UUID]):
    # Add phone_number field
    phone_number: Optional[str] = None
    
    # Use model_config for Pydantic v2
    model_config = ConfigDict(
        from_attributes=True,
        # Explicitly tell Pydantic to ignore any unknown fields
        extra="ignore"
    )
    
    # This ensures 'books' is never accessed during serialization
    @classmethod
    def model_validate(cls, obj, *args, **kwargs):
        if hasattr(obj, '__dict__'):
            # Create a safe copy of the object without accessing 'books'
            obj_dict = {k: v for k, v in obj.__dict__.items() if k != 'books'}
        else:
            obj_dict = obj
        return super().model_validate(obj_dict, *args, **kwargs)

# For specialized endpoints that need books data
class UserReadWithBooks(schemas.BaseUser[uuid.UUID]):
    phone_number: Optional[str] = None
    books: List[BookInUserResponse] = []
    
    model_config = ConfigDict(from_attributes=True)

class UserCreate(schemas.BaseUserCreate):
    phone_number: Optional[str] = None

class UserUpdate(schemas.BaseUserUpdate):
    phone_number: Optional[str] = None
