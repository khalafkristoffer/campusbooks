// src/components/Footer.jsx
import React from "react";
import "../styles/styles.css";

/**
 * Footer component displays common links and copyright information.
 */
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
        © {new Date().getFullYear()} Chalmershelf. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
