import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import apiClient from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('access_token');
      if (token) {
        try {
          // Get user info if we have a token
          const response = await apiClient.get('/users/me');
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to get user info:", error);
          Cookies.remove('access_token');
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (token, userData) => {
    Cookies.set('access_token', token, { secure: true, sameSite: 'strict' });
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove('access_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
