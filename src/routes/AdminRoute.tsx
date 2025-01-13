import React from 'react';
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  children: React.ReactNode;
}

export default function AdminRoute({ isLoggedIn, isAdmin, children }: AdminRouteProps) {
  if (!isLoggedIn) {
    return <Navigate to="/register" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}