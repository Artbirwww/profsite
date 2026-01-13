// src/contexts/AuthContext.tsx
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
    const initAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
        try {
          const data = await authApi.getPupilData(storedToken);
          const pupil = data.pupilDTO || data;
          const userType: UserType = 'школьник';

          const userData: User = {
            id: String(pupil.id),
            email: data.email || '',
            type: userType,
            firstName: pupil.name || '',
            lastName: pupil.surname || '',
            middleName: pupil.patronymic || '',
            gender: pupil.gender?.toLowerCase() === 'male' ? 'мужской' : 'женский',
            schoolName: pupil.school,
            grade: pupil.classNumber,
            gradeLetter: pupil.classLabel,
          };
          setUser(userData);
        } catch (err) {
          console.warn('No pupil data found, keeping session active');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const token = await authApi.login(email, password);
    localStorage.setItem('authToken', token);
    setToken(token);

    try {
      const data = await authApi.getPupilData(token);
      const pupil = data.pupilDTO || data;
      const userData: User = {
        id: String(pupil.id),
        email: data.email,
        type: 'школьник',
        firstName: pupil.name,
        lastName: pupil.surname,
        middleName: pupil.patronymic,
        gender: pupil.gender?.toLowerCase() === 'male' ? 'мужской' : 'женский',
        schoolName: pupil.school,
        grade: pupil.classNumber,
        gradeLetter: pupil.classLabel,
      };
      setUser(userData);
    } catch (err) {
      if ((err as Error).message === 'NO_PUPIL_DATA') {
        setUser({
          id: 'unknown',
          email,
          type: 'школьник',
          firstName: email.split('@')[0],
        });
      } else {
        throw err;
      }
    }
  };

  const register = async (email: string, password: string) => {
    await authApi.register(email, password);
    await login(email, password);
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