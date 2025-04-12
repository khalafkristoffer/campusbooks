// src/components/BookCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/books.css";
import placeholder from "../assets/grudat.jpg";

const BookCard = ({ book }) => {
  return (
    <Link to={`/books/id/${book.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="book-card-horizontal">
        <div className="book-card-image">
          <img src={book.image_url || placeholder} alt={`${book.title} cover`} />
        </div>
        <div className="book-card-details">
          <div className="details-top">
            <h2 className="book-title">{book.title}</h2>
          </div>
          <div className="details-bottom">
            <div className="price-group">
              <p className="book-price">💰 Pris: {book.price} kr</p>
            </div>
            <div className="other-group">
              <p className="book-kurskod">📖 Kurskod: {book.course_code}</p>
              <p className="book-condition">👍 Skick: {book.condition}</p>
              <p className="book-location">📍 Plats: {book.location}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
