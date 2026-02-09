// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authApi } from '../services/api/authApi'
import Cookies from "js-cookie"
import { Role, ROLES } from '../types/account/role';
interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  getToken: () => string | undefined;
  setRoles: (roles: Role[]) => void;
  getRoles: () => Role[] | undefined;
  checkRole: (role: Role) => boolean | undefined
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setUser(null);
    setToken(null);
  };

  const login = (userData: User, token: string) => {
    // Убираем префикс "Bearer " если он есть
    const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token;
    Cookies.set("token", cleanToken, {
      expires: 1,
      secure: false,
      sameSite: "strict"
    });
    
    // Сохраняем информацию о пользователе
    Cookies.set("user", JSON.stringify(userData), {
      expires: 1,
      secure: false,
      sameSite: "strict"
    });
    
    setUser(userData);
    setToken(cleanToken);
  };

  const getToken = (): string | undefined => {
    return Cookies.get("token");
  };

  const getUser = (): User | undefined => {
    const userCookie = Cookies.get("user");
    if (!userCookie) return undefined;
    try {
      return JSON.parse(userCookie);
    } catch (err) {
      console.error("Error parsing user cookie:", err);
      return undefined;
    }
  };

  const setRoles = (roles: Role[]) => {
    Cookies.set("roles", JSON.stringify(roles), {
      expires: 12,
      secure: false,
      sameSite: "strict"
    });
  };

  const getRoles = (): Role[] | undefined => {
    const rolesCookie = Cookies.get("roles");
    if (!rolesCookie) return [{name: ROLES.PUPIL}];
    try {
      return JSON.parse(rolesCookie)
    } catch (err) {
      console.log(err);
      return [{name: ROLES.PUPIL}];
    }
  }
  const checkRole = (role:Role) : boolean => {
    const roles = getRoles()
    return !!roles?.some(r => r.name === role.name)
  }

  return (
    <AuthContext.Provider value={{token, isLoading, login, logout, getToken, getRoles, setRoles, checkRole}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
	const context = useContext(AuthContext)

	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	
	return context
}