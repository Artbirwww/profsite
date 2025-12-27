import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './MainLayout.css';

const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { 
      to: '/dashboard',
      icon: '🧪', 
      text: 'Тесты',
      className: 'tests'
    },
    { 
      to: '/my-results', 
      icon: '📈', 
      text: 'Результаты',
      className: 'results'
    },
  ];

  return (
    <div className="main-layout-container">
      {/* Сайдбар с вашим дизайном */}
      <div className="sidebar">
        <ul className="nav-list">
          {menuItems.map((item, index) => (
            <li 
              key={item.to} 
              className={`nav-item ${item.className}`}
              style={{ '--item-index': index } as React.CSSProperties}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.text}</span>
              </NavLink>
            </li>
          ))}

          <div className="nav-separator"></div>

          {/* Профиль пользователя */}
          {user && (
            <li 
              className="nav-item profile"
              style={{ '--item-index': menuItems.length } as React.CSSProperties}
            >
              <div className="nav-link">
                <span className="nav-icon">👤</span>
                <span className="nav-text">{user.email}</span>
              </div>
            </li>
          )}

          {/* Выход */}
          <li 
            className="nav-item logout"
            style={{ '--item-index': menuItems.length + 1 } as React.CSSProperties}
          >
          </li>
        </ul>
      </div>

      {/* Основное содержимое */}
      <div className="main-content">
        <main className="main-content-inner">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;