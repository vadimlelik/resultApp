import React from 'react';
import { useAuth } from '../Provider/AuthProvider';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to='/auth' />;
  }
  return <>{children}</>;
};
