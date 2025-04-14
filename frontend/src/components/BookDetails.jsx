import   { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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

  // --- Scroll to top on component mount or ID change ---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]); // Dependency array ensures this runs when the book ID changes

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true); // Reset loading state when ID changes
        setError(null);   // Reset error state
        setBook(null);    // Reset book data
        setShowContact(false); // Hide contact info when navigating to a new book
        setSellerInfo(null); // Reset seller info

        const response = await apiClient.get(`/books/id/${id}`);
        setBook(response.data);
      } catch (err) {
        setError("Failed to load book details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleContactClick = async () => {
    if (!sellerInfo && !showContact) {
      try {
        const response = await apiClient.get(`/books/id/${id}/seller-info`);
        setSellerInfo(response.data);
      } catch (error) {
        console.error("Error fetching seller info:", error);
      }
    }
    setShowContact(!showContact);
  };

  if (loading) return <div className="loading">Laddar...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!book) return <div className="not-found-container">Book not found</div>;

  return (
    <div className="book-details-page">
      <Link to="/" className="back-button">
        <span className="back-icon">&larr;</span> Returnera
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
          <p className="author-line">Författare: {book.author}</p>
          
          <div className="info-section">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-icon">📚</span>
                <div className="info-content">
                  <span className="info-label">Kurskod</span>
                  <span className="info-value">{book.course_code}</span>
                </div>
              </div>
              
              <div className="info-item">
                <span className="info-icon">✨</span>
                <div className="info-content">
                  <span className="info-label">Skick</span>
                  <span className="info-value">{book.condition}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="description-section">
            <h2>Beskrivning</h2>
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
                  {showContact ? "Göm kontaktinfo" : "Kontakta säljare"}
                </button>
                
                {showContact && (
                  <div className="contact-info-box">
                    <h3>Kontaktinformation</h3>
                    {sellerInfo ? (
                      <div className="info-grid">
                        {sellerInfo.phone_number && (
                          <div className="info-item">
                            <span className="info-icon">📱</span>
                            <div className="info-content">
                              <span className="info-label">Telefonnummer</span>
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
                          <p>Säljaren verkar inte ha någon kontaktinformation</p>
                        )}
                      </div>
                    ) : (
                      <p>Laddar...</p>
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
