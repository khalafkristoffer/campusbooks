// src/components/BookDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "./Button";
import "../styles/book-detail.css";
import apiClient from "../api/client";
import { useAuth } from "../context/AuthContext";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const { isAuthenticated } = useAuth();
  const [sellerInfo, setSellerInfo] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await apiClient.get(`/books/id/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load book details");
        setLoading(false);
        console.error(err);
      }
    };    

    fetchBook();
  }, [id]);

  const handleContactClick = async () => {
    if (!sellerInfo && !showContact) {
      try {
        // Update the endpoint to match the new route format
        const response = await apiClient.get(`/books/id/${id}/seller-info`);
        setSellerInfo(response.data);
      } catch (error) {
        console.error("Error fetching seller info:", error);
      }
    }
    
    setShowContact(!showContact);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!book) return <div className="not-found-container">Book not found</div>;

  return (
    <div className="book-details-page">
      <Link to="/" className="back-button">
        <span className="back-icon">&larr;</span> Back to Books
      </Link>
      
      <div className="book-detail-container">
        <div className="book-detail-left">
          <div className="image-container">
            {book.image_url && <img src={book.image_url} alt={book.title} />}
          </div>
          <div className="price-tag">
            <span className="current-price">{book.price} kr</span>
          </div>
        </div>
        
        <div className="book-detail-right">
          <h1>{book.title}</h1>
          <p className="author-line">By {book.author}</p>
          
          <div className="info-section">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-icon">📚</span>
                <div className="info-content">
                  <span className="info-label">Course Code</span>
                  <span className="info-value">{book.course_code}</span>
                </div>
              </div>
              
              <div className="info-item">
                <span className="info-icon">✨</span>
                <div className="info-content">
                  <span className="info-label">Condition</span>
                  <span className="info-value">{book.condition}</span>
                </div>
              </div>
              
              <div className="info-item">
                <span className="info-icon">📍</span>
                <div className="info-content">
                  <span className="info-label">Location</span>
                  <span className="info-value">{book.location}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="description-section">
            <h2>Description</h2>
            <div className="book-description-box">
              <p>{book.description}</p>
            </div>
          </div>
          
          <div className="contact-section">
            {isAuthenticated ? (
              <>
                <button 
                  className="contact-button" 
                  onClick={handleContactClick}
                >
                  {showContact ? "Hide Contact Info" : "Contact Seller"}
                </button>
                
                {showContact && (
                  <div className="contact-info-box">
                    <h3>Seller Contact Information</h3>
                    {sellerInfo ? (
                      <div className="info-grid">
                        {sellerInfo.phone_number && (
                          <div className="info-item">
                            <span className="info-icon">📱</span>
                            <div className="info-content">
                              <span className="info-label">Phone</span>
                              <span className="info-value">
                                <a href={`tel:${sellerInfo.phone_number}`}>{sellerInfo.phone_number}</a>
                              </span>
                            </div>
                          </div>
                        )}
                        
                        {sellerInfo.email && (
                          <div className="info-item">
                            <span className="info-icon">📧</span>
                            <div className="info-content">
                              <span className="info-label">Email</span>
                              <span className="info-value">
                                <a href={`mailto:${sellerInfo.email}`}>{sellerInfo.email}</a>
                              </span>
                            </div>
                          </div>
                        )}
                        
                        {!sellerInfo.phone_number && !sellerInfo.email && (
                          <p>No contact information available</p>
                        )}
                      </div>
                    ) : (
                      <p>Loading contact information...</p>
                    )}
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <button className="contact-button">
                  Log in to contact seller
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
