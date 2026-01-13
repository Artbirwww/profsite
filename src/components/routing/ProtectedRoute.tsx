import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requireAuth = true 
}) => {
  const { token, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          <div className="absolute inset-0 flex items-center justify-center text-indigo-600 font-medium">
            <span className="text-sm">Загрузка...</span>
          </div>
        </div>
      </div>
    );
  }

  if (requireAuth && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!requireAuth && token) {
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};