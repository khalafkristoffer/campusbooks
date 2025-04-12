// src/components/BookList.jsx
import React from "react";
import BookCard from "./BookCard";
import "../styles/books.css";
import { Link } from "react-router-dom";

const BookList = ({ books }) => {
  return (
    <div className="books-grid">
      {books.map((book) => (
        <Link to={`/books/id/${book.id}`} key={book.id}>
          <BookCard book={book} />
        </Link>
      ))}
    </div>
  );
};

export default BookList;
