import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Registration } from './components/Registration';
import { TestPage } from './components/TestPage';
import { ResultsPage } from './components/ResultsPage';

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
  familyType?: string;
  lowIncome?: boolean;
  housingType?: string;
}

export interface TestResult {
  userId: string;
  belbin: { [key: string]: number };
  klimov: { [key: string]: number };
  psychoticism: number;
  neuroticism: number;
  recommendedProfession: string;
}

type Page = 'login' | 'register' | 'test' | 'results';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [users, setUsers] = useState<User[]>([]);

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
      setCurrentPage('test');
      return true;
    }
    return false;
  };

  const handleRegister = (user: User) => {
    setUsers([...users, user]);
    setCurrentUser(user);
    setCurrentPage('test');
  };

  const handleTestComplete = (result: TestResult) => {
    setTestResult(result);
    setCurrentPage('results');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setTestResult(null);
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
      
      {currentPage === 'test' && currentUser && (
        <TestPage
          user={currentUser}
          onComplete={handleTestComplete}
          onLogout={handleLogout}
        />
      )}
      
      {currentPage === 'results' && testResult && currentUser && (
        <ResultsPage
          result={testResult}
          user={currentUser}
          onRetakeTest={() => setCurrentPage('test')}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
