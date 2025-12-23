// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AppContext } from './contexts/AppContext';

// Компоненты
import { Login } from './components/auth/Login/Login';
import { Registration } from './components/auth/Registration/Registration';
import { Dashboard } from './components/tests/testpage/Dashboard';
import { TestPage } from './components/tests/testpage/TestPage';
import { ResultsPage } from './components/tests/resultspage/ResultsPage';

// ——— AppProvider: держит всё состояние ———
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [completedGroups, setCompletedGroups] = useState<TestGroup[]>([]);
  const [currentTestGroup, setCurrentTestGroup] = useState<TestGroup | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUsers(parsed);
      } catch (e) {
        console.warn('⚠️ Некорректные данные в localStorage.users — сброшены');
        localStorage.removeItem('users');
      }
    }
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  const handleLogin = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setCompletedGroups([]);
      return true;
    }
    return false;
  };

  const handleRegister = (user: User) => {
    const newUser = { ...user };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setCompletedGroups([]);
    // ✅ сброс результатов при новой регистрации
    setTestResult(null);
  };

  const handleStartTest = (group: TestGroup) => {
    setCurrentTestGroup(group);
  };

  const handleTestGroupComplete = (groupResult: Partial<TestResult>) => {
    if (!currentTestGroup || !currentUser) return;

    const updatedResult = {
      ...(testResult || { userId: currentUser.email }),
      ...groupResult,
    } as TestResult;

    setTestResult(updatedResult);
    const newCompleted = [...completedGroups, currentTestGroup];
    setCompletedGroups(newCompleted);
    setCurrentTestGroup(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setTestResult(null);
    setCompletedGroups([]);
    setCurrentTestGroup(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        testResult,
        completedGroups,
        currentTestGroup,
        handleLogin,
        handleRegister,
        handleStartTest,
        handleTestGroupComplete,
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// ——— Хук для страниц с защитой ———
import { useApp } from './contexts/AppContext';

const ProtectedRoute = ({ children, requireResult = false }: { children: React.ReactNode; requireResult?: boolean }) => {
  const { currentUser, testResult } = useApp();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (requireResult && !testResult) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

// ——— Страницы ———
function DashboardPage() {
  const { currentUser, completedGroups, handleStartTest, handleLogout } = useApp();
  return (
    <Dashboard
      user={currentUser!}
      completedGroups={completedGroups}
      onStartTest={handleStartTest}
      onLogout={handleLogout}
      onViewResults={() => { /* не используем window.location — роутинг через контекст */ }}
    />
  );
}

function TestPageWrapper() {
  const { currentUser, handleTestGroupComplete } = useApp();
  const { group } = useParams<{ group: TestGroup }>();

  if (!currentUser || !group) return <Navigate to="/dashboard" replace />;

  return (
    <TestPage
      user={currentUser}
      testGroup={group}
      onComplete={handleTestGroupComplete}
      onBack={() => window.history.back()}
    />
  );
}

function ResultsPageWrapper() {
  const { currentUser, testResult } = useApp();
  if (!currentUser || !testResult) return <Navigate to="/dashboard" replace />;
  return <ResultsPage result={testResult} user={currentUser} />;
}

// ——— Корневой App ———
export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/test/:group"
              element={
                <ProtectedRoute>
                  <TestPageWrapper />
                </ProtectedRoute>
              }
            />
            <Route
              path="/results"
              element={
                <ProtectedRoute requireResult>
                  <ResultsPageWrapper />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}