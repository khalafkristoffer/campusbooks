import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import apiClient from '../api/client'; // Assuming apiClient handles token injection

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('access_token'));
  const [isSeller, setIsSeller] = useState(false); // Add isSeller state

  // Function to handle login
  const login = (token) => {
    Cookies.set('access_token', token, { expires: 7, secure: true, sameSite: 'Lax' }); // Example cookie settings
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
      // You might want to add a check here to verify the token with the backend
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
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
