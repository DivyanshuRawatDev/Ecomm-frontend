// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from './constants';
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!getCookie("uid");

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
