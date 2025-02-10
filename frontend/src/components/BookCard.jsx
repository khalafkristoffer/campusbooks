import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

/**
 * BookCard displays summary information for a book.
 * When clicked, it redirects to the detailed book page.
 */
const BookCard = ({ book }) => {
  return (
    <Link to={`/books/${book.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="book-card">
        {/* Book Thumbnail */}
        <img
          className="book-thumbnail"
          src={book.image || "https://via.placeholder.com/350x250"}
          alt={`${book.title} cover`}
        />
        {/* Summary Info (left-aligned) */}
        <div className="book-summary">
          <h2 className="book-title">{book.title}</h2>
          <p className="book-kurskod">📖 Kurskod: {book.kurskod}</p>
          <p className="book-condition">👍 Skick: {book.condition}</p>
          <p className="book-price">
            💰 Pris: {book.price} kr
            <span className="book-original-price"> (🏷️ Nypris: {book.originalPrice} kr)</span>
          </p>
          <p className="book-location">📍 Plats: {book.location}</p>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
