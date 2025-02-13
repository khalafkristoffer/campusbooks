from fastapi import FastAPI
from app.routes import books
from app.database import Base, engine

from app.core.config import settings

app = FastAPI(
  title="ChalmerShelf",        # settings.PROJECT_NAME
)

Base.metadata.create_all(bind=engine)

app.include_router(books.router)