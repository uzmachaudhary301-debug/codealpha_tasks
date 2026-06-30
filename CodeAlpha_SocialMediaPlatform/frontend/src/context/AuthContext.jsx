import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Check if user is already logged in from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('social_app_auth');
    return savedAuth === 'true' ? true : false;
  });

  // Login Handler
  const login = () => {
    localStorage.setItem('social_app_auth', 'true');
    setIsAuthenticated(true);
  };

  // Logout Handler
  const logout = () => {
    localStorage.removeItem('social_app_auth');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);