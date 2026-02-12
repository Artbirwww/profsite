import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute: React.FC = () => {
  const { token, getToken, isLoading } = useAuth();
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

  if (!getToken()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet/>

};