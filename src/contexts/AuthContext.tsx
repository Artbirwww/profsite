import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../services/api/authApi';

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
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const token = await authApi.login(email, password);
      localStorage.setItem('authToken', token);
      setToken(token);
      
      const userData: User = {
        id: 'temp-id',
        email,
        type: 'школьник',
        firstName: email.split('@')[0],
      };
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const token = await authApi.register(email, password);
      localStorage.setItem('authToken', token);
      setToken(token);
      
      const userData: User = {
        id: 'temp-id',
        email,
        type: 'школьник',
        firstName: email.split('@')[0],
      };
      setUser(userData);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
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