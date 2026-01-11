// src/components/routing/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  /**
   * true — доступ только авторизованным (по умолчанию)
   * false — доступ только НЕавторизованным (для /login, /register)
   */
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requireAuth = true 
}) => {
  const { user, token, isLoading } = useAuth();
  const location = useLocation();

  // Показываем лоадер при инициализации
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

  // ✅ Случай 1: требуется авторизация, но пользователя или токена нет → на /login
  if (requireAuth && (!user || !token)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ Случай 2: НЕ требуется авторизация (например, /login), но пользователь залогинен → на /dashboard
  if (!requireAuth && user && token) {
    // Сохраняем, куда пользователь пытался попасть (например, /register после логина)
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  // ✅ Всё ок — рендерим дочерние роуты
  return <Outlet />;
};