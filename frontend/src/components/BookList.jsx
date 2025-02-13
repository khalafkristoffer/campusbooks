// src/components/BookList.jsx
import React from "react";
import BookCard from "./BookCard";
import "../styles/books.css";

const BookList = ({ books }) => {
  return (
    <div className="books-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
