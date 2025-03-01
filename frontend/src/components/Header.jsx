// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import "../styles/header.css";

const Header = ({ setIsAuthenticated }) => {
  const [isAuthenticated, setIsAuth] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check for token in cookies on component mount
    const token = Cookies.get('access_token');
    if (token) {
      setIsAuth(true);
      setIsAuthenticated(true); // Update App's state
    } else {
      setIsAuth(false);
      setIsAuthenticated(false); // Update App's state
    }
    
    // Add scroll listener for dynamic header
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsAuthenticated]);

  const handleLogout = () => {
    Cookies.remove('access_token');
    setIsAuth(false);
    setIsAuthenticated(false); // Update App's state
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <Link to="/" className="logo-link">
          <h1>ChalmerShelf</h1>
        </Link>
      </div>
      <div className="subtitle">
        Spara pengar, dela kunskap – Chalmers marknad för begagnad kurslitteratur!
      </div>
      <div className="header-button">
        {isAuthenticated ? (
          <button className="login-button logout" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="login-button">
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
