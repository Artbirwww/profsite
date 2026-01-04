// src/App.tsx
import { Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// ✅ УДАЛЕНО: BrowserRouter (теперь только в main.tsx)

// Провайдеры — остаются, но ВНЕ роутера (в main.tsx)
// ✅ AuthProvider, TestProvider, AppProvider — теперь в main.tsx

// Auth components
import { Login } from './components/auth/Login/Login';
import { Registration } from './components/auth/Registration/Registration';

// Test components
import { Dashboard } from './components/tests/dashboard/Dashboard';
import { TestPage } from './components/tests/dashboard/TestPage';
import { TestPageNew } from './components/tests/dashboard/TestPageNew';
import { ResultsPage } from './components/tests/resultspage/ResultsPage';

// Individual test components
import EngineeringThinkingTest from './components/tests/engineer/EngineeringThinkingTest';
import GroupRolesTest from './components/tests/grouproles/GroupRolesTest';
import IqPotentialTest from './components/tests/iqpotencial/iqpotencial';
import ProfessionalOrientationTest from './components/tests/profsphere/ProfessionalOrientationTest';
import TemperamentTest from './components/tests/temperament/TemperamentTest';

// Layout & routing
import MainLayout from './components/layout/MainLayout';
import { ProtectedRoute } from './components/routing/ProtectedRoute';

// Хуки — обновлены: используем useAuth вместо useApp для пользователя
import { useAuth } from './contexts/AuthContext';
import { useApp } from './contexts/AppContext';
import { PupilDataLoading } from './components/admin/data-loading/PupilDataLoading';

// Типы
type TestGroup = 'temperament' | 'groupRoles' | 'professionalOrientation' | 'engineeringThinking' | 'intellectualPotential';

// ——— Хук для страниц с защитой (ОБНОВЛЁН: убран currentUser из useApp) ———
const LegacyProtectedRoute = ({ 
  children, 
  requireResult = false 
}: { 
  children: React.ReactNode; 
  requireResult?: boolean 
}) => {
  const { user } = useAuth(); // ✅ из AuthContext
  const { testResult } = useApp(); // ✅ из AppContext

  if (!user) return <Navigate to="/login" replace />;
  if (requireResult && !testResult) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

// ——— Страницы ———
function DashboardPage() {
  const { user, logout } = useAuth();
  const { completedGroups, handleStartTest } = useApp();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleViewResults = () => {
    navigate('/my-results');
  };

  return (
    <Dashboard
      user={user}
      completedGroups={completedGroups}
      onStartTest={handleStartTest}
      onLogout={handleLogout}
      onViewResults={handleViewResults}
    />
  );
}

function TestPageWrapper() {
  const { user } = useAuth();
  const { handleTestGroupComplete } = useApp();
  const { group } = useParams<{ group: TestGroup }>();

  if (!user || !group) return <Navigate to="/dashboard" replace />;

  return (
    <TestPage
      user={user}
      testGroup={group}
      onComplete={handleTestGroupComplete}
      onBack={() => window.history.back()}
    />
  );
}

function ResultsPageWrapper() {
  const { user } = useAuth();
  const { testResult } = useApp();

  if (!user || !testResult) return <Navigate to="/dashboard" replace />;
  return <ResultsPage result={testResult} user={user} />;
}

// ——— Корневой App (БЕЗ Router!) ———
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            {/*В будущем добавить защищенные роуты + доступ по ролям, к примеру для админа, роли будут доступны при входе в систему от сервака */}
            {/*Роуты по ролям временно просто в protected*/}
            <Route path='admin/pupil-loading' element={<PupilDataLoading />} />
            {/* Legacy routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/test/:group" element={<TestPageWrapper />} />
            <Route path="/results" element={<ResultsPageWrapper />} />
            
            {/* New test routes */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/tests">
              <Route path="engineering-thinking" element={<EngineeringThinkingTest />} />
              <Route path="group-roles" element={<GroupRolesTest />} />
              <Route path="iq-potential" element={<IqPotentialTest />} />
              <Route path="professional-orientation" element={<ProfessionalOrientationTest />} />
              <Route path="temperament" element={<TemperamentTest />} />
              <Route path=":testType" element={<TestPageNew />} />
            </Route>
            
            {/* Results */}
            <Route path="/my-results" element={<ResultsPage />} />
            <Route path="/my-results/:testType" element={<ResultsPage />} />
          </Route>
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}