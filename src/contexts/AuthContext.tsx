// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../services/api/authApi';
import Cookies from "js-cookie"
import { Role, ROLES } from '../types/account/role';
interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  getToken: () => string | undefined;
  setRoles: (roles: Role[]) => void;
  getRoles: () => Role[] | undefined;
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
    // Убираем префикс "Bearer " если он есть
    const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token;
    Cookies.set("token", cleanToken, {
      expires: 1,
      secure: false,
      sameSite: "strict"
    })
    setToken(cleanToken)
  }
  const getToken = (): string | undefined => {
    return Cookies.get("token")
  }
  const setRoles = (roles: Role[]) => {
    Cookies.set("roles", JSON.stringify(roles), {
      expires: 12,
      secure: false,
      sameSite: "strict"
    })
  }
  const getRoles = () : Role[] | undefined => {
    const rolesCookie = Cookies.get("roles")
    if (!rolesCookie) return [{name: ROLES.PUPIL}]
    try {
      JSON.parse(rolesCookie)
    } catch (err) {
      console.log(err)
      return [{name: ROLES.PUPIL}]
    }
  }

  return (
    <AuthContext.Provider value={{token, isLoading, login, logout, getToken, getRoles, setRoles}}>
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