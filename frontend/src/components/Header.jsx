// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/header.css';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="logo">
              Campus Books
            </Link>
          </div>

          {isAuthenticated && (
            <div className="header-center">
              <Link to="/profile" className={`nav-link my-books ${location.pathname === '/profile' ? 'active' : ''}`}>
                My Books
              </Link>
            </div>
          )}

          <div className="header-right">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            ) : (
              <Link to="/login" className={`nav-link login-btn ${location.pathname === '/login' ? 'active' : ''}`}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
