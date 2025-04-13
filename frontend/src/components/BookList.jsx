// src/components/BookList.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Make sure Link is imported
import BookCard from './BookCard';
import '../styles/books.css';

const BookList = ({ books }) => {
  if (!books || books.length === 0) {
    return <p>No books found matching your criteria.</p>;
  }

  return (
    <div className="books-grid">
      {books.map((book) => (
        <Link key={book.id} to={`/book/${book.id}`} className="book-link">
          <BookCard book={book} />
        </Link>
      ))}
    </div>
  );
};

export default BookList;
