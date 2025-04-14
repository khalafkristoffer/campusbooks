import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import apiClient from '../api/client'; // Assuming apiClient handles token injection

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('access_token'));
  const [isSeller, setIsSeller] = useState(false); // Add isSeller state

  // Function to handle login
  const login = (token) => {
    // Set cookie to expire in 1 hour to match JWT token expiration
    Cookies.set('access_token', token, { 
      expires: 24, // 1 hour (1/24 of a day)
      secure: true, 
      sameSite: 'Lax' 
    });
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Update apiClient header
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const logout = () => {
    Cookies.remove('access_token');
    delete apiClient.defaults.headers.common['Authorization']; // Remove header
    setIsAuthenticated(false);
    // Optionally reset isSeller on logout
    // setIsSeller(false);
  };

  // Function to set the seller mode
  const setSellerMode = (isSelling) => {
    setIsSeller(isSelling);
  };

  // Optional: Check token validity on load (more robust)
  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      // Add Authorization header
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Verify token validity with a simple API call
      apiClient.get('/authenticated-route')
        .then(() => {
          setIsAuthenticated(true);
        })
        .catch((error) => {
          // If unauthorized or token expired, clear the cookie and log out
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.log("Token expired or invalid, logging out");
            logout();
          }
        });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isSeller, setSellerMode }}> {/* Add isSeller and setSellerMode */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
