import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Registration } from './components/Registration';
import { TestPage } from './components/TestPage';
import { ResultsPage } from './components/ResultsPage';
import { Dashboard } from './components/Dashboard';

export type UserType = 'школьник' | 'студент' | 'специалист';

export interface User {
  email: string;
  password: string;
  type: UserType;
  // Школьник
  lastName?: string;
  firstName?: string;
  middleName?: string;
  gender?: string;
  region?: string;
  city?: string;
  schoolName?: string;
  address?: string;
  status?: string;
  age?: number;
  grade?: number;
  gradeLetter?: string;
}

export interface TestResult {
  userId: string;
  temperament?: { [key: string]: number };
  groupRoles?: { [key: string]: number };
  professionalOrientation?: { [key: string]: number };
  engineeringThinking?: { [key: string]: number };
  intellectualPotential?: { [key: string]: number };
  belbin?: { [key: string]: number }; // Оставляем для совместимости
  klimov?: { [key: string]: number }; // Оставляем для совместимости
  psychoticism?: number;
  neuroticism?: number;
  recommendedProfession?: string;
}

export type TestGroup = 'temperament' | 'groupRoles' | 'professionalOrientation' | 'engineeringThinking' | 'intellectualPotential';

type Page = 'login' | 'register' | 'dashboard' | 'test' | 'results';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [completedGroups, setCompletedGroups] = useState<TestGroup[]>([]);
  const [currentTestGroup, setCurrentTestGroup] = useState<TestGroup | null>(null);

  // Загрузка пользователей из localStorage
  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  // Сохранение пользователей в localStorage
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  const handleLogin = (email: string, password: string) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setCurrentPage('dashboard');
      setCompletedGroups([]);
      return true;
    }
    return false;
  };

  const handleRegister = (user: User) => {
    setUsers([...users, user]);
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleStartTest = (group: TestGroup) => {
    setCurrentTestGroup(group);
    setCurrentPage('test');
  };

  const handleTestGroupComplete = (groupResult: Partial<TestResult>) => {
    if (!currentTestGroup) return;
    
    // Обновляем результаты теста
    setTestResult(prev => ({
      ...prev,
      userId: currentUser?.email || '',
      ...groupResult,
    }) as TestResult);

    // Добавляем группу в завершенные
    const newCompletedGroups = [...completedGroups, currentTestGroup];
    setCompletedGroups(newCompletedGroups);
    
    // Если все группы пройдены, переходим к результатам
    if (newCompletedGroups.length === 5) {
      setCurrentPage('results');
    } else {
      setCurrentPage('dashboard');
    }
    
    setCurrentTestGroup(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setTestResult(null);
    setCompletedGroups([]);
    setCurrentTestGroup(null);
    setCurrentPage('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {currentPage === 'login' && (
        <Login
          onLogin={handleLogin}
          onSwitchToRegister={() => setCurrentPage('register')}
        />
      )}
      
      {currentPage === 'register' && (
        <Registration
          onRegister={handleRegister}
          onSwitchToLogin={() => setCurrentPage('login')}
        />
      )}
      
      {currentPage === 'dashboard' && currentUser && (
        <Dashboard
          user={currentUser}
          completedGroups={completedGroups}
          onStartTest={handleStartTest}
          onLogout={handleLogout}
          onViewResults={() => setCurrentPage('results')}
        />
      )}
      
      {currentPage === 'test' && currentUser && currentTestGroup && (
        <TestPage
          user={currentUser}
          testGroup={currentTestGroup}
          onComplete={handleTestGroupComplete}
          onBack={() => setCurrentPage('dashboard')}
        />
      )}
      
      {currentPage === 'results' && testResult && currentUser && (
        <ResultsPage
          result={testResult}
          user={currentUser}
          onRetakeTest={() => {
            setCompletedGroups([]);
            setTestResult(null);
            setCurrentPage('dashboard');
          }}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}