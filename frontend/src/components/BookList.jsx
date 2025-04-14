// src/components/BookList.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Make sure Link is imported
import BookCard from './BookCard';
import '../styles/books.css';

const BookList = ({ books }) => {
  if (!books || books.length === 0) {
    return <p>Inga böcker som matchade dina filter hittades</p>;
  }

  return (
    <div className="books-grid">
      {books.map((book) => (
        <Link key={book.id} to={`/books/id/${book.id}`} className="book-link">
          <BookCard book={book} />
        </Link>
      ))}
    </div>
  );
};

export default BookList;
