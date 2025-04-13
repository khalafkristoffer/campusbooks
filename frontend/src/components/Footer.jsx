// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">Campus Books</h3>
          <p className="footer-description">
            Din plattform för att köpa och sälja kurslitteratur.
          </p>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Länkar</h3>
          <ul className="footer-links">
            <li><Link to="/about">Om oss</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Policies</h3>
          <ul className="footer-links">
            <li><Link to="/privacy-policy">Integritetspolicy</Link></li>
            <li><Link to="/terms">Användarvillkor</Link></li>
            <li><Link to="/cookies">Cookies</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-copy">
          <span className="copyright-symbol">©</span> {new Date().getFullYear()} Campus Books. Ge ett nytt liv till gamla böcker!
        </div>
      </div>
    </footer>
  );
};

export default Footer;