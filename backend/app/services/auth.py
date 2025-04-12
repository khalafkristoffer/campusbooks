from fastapi import Depends, HTTPException, status
from fastapi_users import FastAPIUsers
from app.userDB import User
from app.services.auth_backend import auth_backend

# Initialize FastAPIUsers
fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)

# Current user dependency
current_active_user = fastapi_users.current_user(active=True)