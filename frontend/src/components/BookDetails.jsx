// src/components/BookDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "./Button";
import "../styles/book-detail.css";
import placeholder from "../assets/grudat.jpg";

const BookDetails = ({ books }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id.toString() === id);

  if (!book) {
    return <div>Book not found.</div>;
  }

  return (
    <div>
      <Button className="button-secondary back-button" onClick={() => navigate(-1)}>
        ← Back
      </Button>
      <div className="book-detail-container">
        <div className="book-detail-left">
          <img src={book.image_url || placeholder} alt={`${book.title} cover`} />
        </div>
        <div className="book-detail-right">
          <h1>{book.title}</h1>
          <ul className="book-info-list">
            <li>📚 Författare: {book.author}</li>
            <li>📖 Kurskod: {book.course_code}</li> {/* make sure to use same names as in json file */}
            <li>👍 Skick: {book.condition}</li>
            <li>💰 Pris: {book.price} kr</li>
            <li>🏷️ Nypris: {book.originalPrice} kr</li> {/* either skip implementation or manually add later? */}
            <li>📍 Plats: {book.location}</li>
          </ul>
          <div className="book-description-box">
            <p>{book.description || "No description available."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
