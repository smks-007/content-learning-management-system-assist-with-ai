import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import React from 'react';

export default function RoleRoute({ children, role }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-dark-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
      </div>
    );
  }
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.roles?.includes(role) && user?.role !== role) return <Navigate to="/dashboard" replace />;
  
  return children;
}
