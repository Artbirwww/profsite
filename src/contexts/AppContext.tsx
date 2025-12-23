// src/contexts/AppContext.tsx
import { createContext, useContext } from 'react';

// Типы — копируем из App.tsx
export type UserType = 'школьник' | 'студент' | 'специалист';

export interface User {
  email: string;
  password: string;
  type: UserType;
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
  belbin?: { [key: string]: number };
  klimov?: { [key: string]: number };
  psychoticism?: number;
  neuroticism?: number;
  recommendedProfession?: string;
}

export type TestGroup = 'temperament' | 'groupRoles' | 'professionalOrientation' | 'engineeringThinking' | 'intellectualPotential';

// Интерфейс контекста
export interface AppContextType {
  currentUser: User | null;
  testResult: TestResult | null;
  completedGroups: TestGroup[];
  currentTestGroup: TestGroup | null;
  handleLogin: (email: string, password: string) => boolean;
  handleRegister: (user: User) => void;
  handleStartTest: (group: TestGroup) => void;
  handleTestGroupComplete: (groupResult: Partial<TestResult>) => void;
  handleLogout: () => void;
}

// Создаём контекст с заглушкой (настоящий — в AppProvider)
export const AppContext = createContext<AppContextType>({
  currentUser: null,
  testResult: null,
  completedGroups: [],
  currentTestGroup: null,
  handleLogin: () => false,
  handleRegister: () => {},
  handleStartTest: () => {},
  handleTestGroupComplete: () => {},
  handleLogout: () => {},
});

// Хук для использования
export const useApp = () => useContext(AppContext);