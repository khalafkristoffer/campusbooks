import sqlite3
from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class CourseCode(BaseModel):
    name: str
    code: str

class Book(BaseModel):
    title: str
    code: CourseCode 

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/books")
async def create_book(book: Book):
    return book
