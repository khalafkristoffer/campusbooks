from fastapi import FastAPI
from app.core.config import settings

app = FastAPI(
  title="ChalmerShelf",        # settings.PROJECT_NAME
)