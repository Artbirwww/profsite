// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserType = 'школьник' | 'студент' | 'специалист';

export interface User {
  id: string;
  email: string;
  type: UserType;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  gender?: string;
  region?: string;
  city?: string;
  schoolName?: string;
  address?: string;
  age?: number;
  grade?: number;
  gradeLetter?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🎛️ РЕЖИМ РАЗРАБОТКИ: true = моки, false = API
const USE_MOCK_AUTH = true;

// ===== МОК-РЕАЛИЗАЦИЯ =====
const mockLogin = async (email: string, password: string): Promise<User> => {
  if (!email || password.length < 6) {
    throw new Error('Неверный email или пароль');
  }

  // Пример: создаём пользователя, если его нет
  const mockUser: User = {
    id: `mock-${Date.now()}`,
    email,
    type: 'студент',
    firstName: email.split('@')[0],
    lastName: 'Тестовый',
  };

  localStorage.setItem('mock-user', JSON.stringify(mockUser));
  return mockUser;
};

const mockRegister = async (
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
): Promise<User> => {
  if (!email || password.length < 6) {
    throw new Error('Email и пароль (минимум 6 символов) обязательны');
  }

  const mockUser: User = {
    id: `mock-${Date.now()}`,
    email,
    type: 'студент',
    firstName: firstName || email.split('@')[0],
    lastName: lastName || 'Зарегистрированный',
  };

  localStorage.setItem('mock-user', JSON.stringify(mockUser));
  return mockUser;
};

const mockGetCurrentUser = async (): Promise<User | null> => {
  const saved = localStorage.getItem('mock-user');
  return saved ? JSON.parse(saved) : null;
};

// =========================

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const userData = USE_MOCK_AUTH
          ? await mockGetCurrentUser()
          : null; // ← в будущем: await authService.getCurrentUser()
        setUser(userData);
      } catch (error) {
        console.warn('Failed to restore session (mock mode)', error);
        localStorage.removeItem('mock-user');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const userData = USE_MOCK_AUTH
      ? await mockLogin(email, password)
      : null; // ← в будущем: await authService.login(...)
    setUser(userData);
  };

  const register = async (email: string, password: string, firstName?: string, lastName?: string) => {
    const userData = USE_MOCK_AUTH
      ? await mockRegister(email, password, firstName, lastName)
      : null; // ← в будущем: await authService.register(...)
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    if (USE_MOCK_AUTH) {
      localStorage.removeItem('mock-user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};