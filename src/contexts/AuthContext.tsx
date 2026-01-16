// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../services/api/authApi';
import Cookies from "js-cookie"
interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  getToken: () => string | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    Cookies.remove("token")
    setToken(null);
  };
  const login = (token: string) => {
    Cookies.set("token", token, {
      expires: 1,
      secure: false,
      sameSite: "strict"
    })
    setToken(token)
  }
  const getToken = (): string | undefined => {
    return Cookies.get("token")
  }

  return (
    <AuthContext.Provider value={{token, isLoading, login, logout, getToken}}>
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