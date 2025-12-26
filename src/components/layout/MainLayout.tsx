import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../ui/buttons/button';
import { Sidebar } from '../ui/navigation/sidebar';

const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { handleLogout } = useApp();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    handleLogout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800">Профориентация</h2>
        </div>
        <nav className="mt-4">
          <Link to="/dashboard" className="block px-6 py-3 hover:bg-gray-100">
            📊 Главная
          </Link>
          <Link to="/tests" className="block px-6 py-3 hover:bg-gray-100">
            🧪 Тесты
          </Link>
          <Link to="/my-results" className="block px-6 py-3 hover:bg-gray-100">
            📈 Результаты
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Профориентационная платформа</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{user?.email || 'Гость'}</span>
            <Button 
              onClick={handleLogoutClick} 
              variant="outline"
              size="sm"
            >
              Выйти
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;