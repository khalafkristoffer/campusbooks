import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "./Button";
import "../styles/styles.css";

/**
 * BookDetails displays complete information for a selected book.
 * Features a fixed back button at the top left and a bordered, two‐column layout:
 *  - Left: large book image.
 *  - Right: title and a bulleted list featuring:
 *      📚 Författare, 📖 Kurskod, 👍 Skick, 💰 Pris, 🏷️ Nypris, and 📍 Plats.
 *    A description box follows.
 */
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
          <img
            src={book.image || "https://via.placeholder.com/350x250"}
            alt={`${book.title} cover`}
          />
        </div>
        <div className="book-detail-right">
          <h1>{book.title}</h1>
          <ul className="book-info-list">
            <li>📚 Författare: {book.author}</li>
            <li>📖 Kurskod: {book.kurskod}</li>
            <li>👍 Skick: {book.condition}</li>
            <li>💰 Pris: {book.price} kr</li>
            <li>🏷️ Nypris: {book.originalPrice} kr</li>
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
