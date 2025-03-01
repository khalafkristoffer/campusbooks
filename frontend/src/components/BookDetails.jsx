// src/components/BookDetails.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "./Button";
import "../styles/book-detail.css";
import placeholder from "../assets/grudat.jpg";

const BookDetails = ({ books }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id.toString() === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!book) {
    return <div className="not-found-container">Book not found.</div>;
  }

  return (
    <div className="book-details-page">
      <Button className="button-secondary back-button" onClick={() => navigate(-1)}>
        <span className="back-icon">←</span> Back
      </Button>
      
      <div className="book-detail-container">
        <div className="book-detail-left">
          <div className="image-container">
            <img src={book.image_url || placeholder} alt={`${book.title} cover`} />
          </div>
          <div className="price-tag">
            <span className="current-price">{book.price} kr</span>
            {book.originalPrice && (
              <span className="original-price">{book.originalPrice} kr</span>
            )}
          </div>
        </div>
        
        <div className="book-detail-right">
          <h1>{book.title}</h1>
          <div className="author-line">
            <span>By {book.author}</span>
          </div>
          
          <div className="info-section">
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">📖</div>
                <div className="info-content">
                  <div className="info-label">Course Code</div>
                  <div className="info-value">{book.course_code}</div>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">👍</div>
                <div className="info-content">
                  <div className="info-label">Condition</div>
                  <div className="info-value">{book.condition}</div>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div className="info-content">
                  <div className="info-label">Location</div>
                  <div className="info-value">{book.location}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="description-section">
            <h2>Description</h2>
            <div className="book-description-box">
              <p>{book.description || "No description available."}</p>
            </div>
          </div>
          
          <div className="contact-section">
            <Button className="contact-button">
              Contact Seller
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
