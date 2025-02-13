from fastapi import FastAPI
from routes import books

from app.core.config import settings

app = FastAPI(
  title="ChalmerShelf",        # settings.PROJECT_NAME
)

app.include_router(books.router)