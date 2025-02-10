import React from "react";
import BookCard from "./BookCard";
import "../styles/styles.css";

/**
 * BookList renders a grid of BookCard components.
 */
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
