// src/components/BookCard.jsx
import React from "react";
import "../styles/books.css";
import placeholder from "../assets/grudat.jpg";

const BookCard = ({ book }) => {
  // Basic error handling
  if (!book) {
    return <div className="book-card-horizontal error">Book data missing</div>;
  }

  return (
    <div className="book-card-horizontal">
      <div className="book-card-image">
        <img src={book.image_url || placeholder} alt={`${book.title || 'Book'} cover`} />
      </div>
      <div className="book-card-details">
        <div className="details-top">
          <h2 className="book-title">{book.title || 'No Title'}</h2>
        </div>
        <div className="details-bottom">
          <div className="price-group">
            <p className="book-price">💰 Pris: {book.price ? `${book.price} kr` : 'N/A'}</p>
          </div>
          <div className="other-group">
            <p className="book-kurskod">📖 Kurskod: {book.course_code || 'N/A'}</p>
            <p className="book-condition">👍 Skick: {book.condition || 'N/A'}</p>
            <p className="book-location">📍 Plats: {book.location || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
