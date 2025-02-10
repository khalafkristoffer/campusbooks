// src/components/Header.jsx
import React from "react";
import "../styles/styles.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          {/* INSERT NEW SVG LOGO HERE:
               <img src="path-to-logo.svg" alt="Chalmershelf Logo" className="logo" /> */}
          Chalmershelf
        </div>
        <p className="subtitle">
          Spara pengar, dela kunskap – Chalmers egen bokmarknad
        </p>
      </div>
    </header>
  );
};

export default Header;
