// src/components/Footer.jsx
import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">ChalmerShelf</h3>
          <p className="footer-description">
            Din plattform för att köpa och sälja kurslitteratur på Chalmers.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Länkar</h3>
          <ul className="footer-links">
            <li><a href="/about">Om oss</a></li>
            <li><a href="/contact">Kontakt</a></li>
            <li><a href="/howto">Hur det fungerar</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Policies</h3>
          <ul className="footer-links">
            <li><a href="/privacy">Integritetspolicy</a></li>
            <li><a href="/terms">Användarvillkor</a></li>
            <li><a href="/cookies">Cookies</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-copy">
          <span className="copyright-symbol">©</span> {new Date().getFullYear()} ChalmerShelf. Ge ett nytt liv till gamla böcker!
        </div>
      </div>
    </footer>
  );
};

export default Footer;