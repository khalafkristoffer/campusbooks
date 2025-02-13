// src/components/Footer.jsx
import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="/about">About Us</a> |{" "}
        <a href="/contact">Contact</a> |{" "}
        <a href="/privacy">Privacy Policy</a> |{" "}
        <a href="/terms">Terms &amp; Conditions</a>
      </div>
      <div className="footer-copy">
        Ge ett nytt liv till gamla böcker!
      </div>
    </footer>
  );
};

export default Footer;

/* © {new Date().getFullYear()} i "footer-copy" för trademark + år.*/