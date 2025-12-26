// src/contexts/AppContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext'; // ← подключаем AuthContext для получения user

// Типы — оставляем только то, что касается тестов
export type TestGroup = 
  | 'temperament' 
  | 'groupRoles' 
  | 'professionalOrientation' 
  | 'engineeringThinking' 
  | 'intellectualPotential';

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

// Интерфейс контекста — БЕЗ currentUser и методов авторизации
export interface AppContextType {
  testResult: TestResult | null;
  completedGroups: TestGroup[];
  currentTestGroup: TestGroup | null;
  handleStartTest: (group: TestGroup) => void;
  handleTestGroupComplete: (groupResult: Partial<TestResult>) => void;
}

// Создаём контекст
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Провайдер
export function AppProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth(); // ← получаем user из AuthContext
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [completedGroups, setCompletedGroups] = useState<TestGroup[]>([]);
  const [currentTestGroup, setCurrentTestGroup] = useState<TestGroup | null>(null);

  // Восстановление ТОЛЬКО тестовых данных из localStorage
  useEffect(() => {
    const savedResult = localStorage.getItem('testResult');
    const savedGroups = localStorage.getItem('completedGroups');

    if (savedResult) setTestResult(JSON.parse(savedResult));
    if (savedGroups) setCompletedGroups(JSON.parse(savedGroups));
  }, []);

  // Запуск теста
  const handleStartTest = (group: TestGroup) => {
    setCurrentTestGroup(group);
  };

  // Завершение группы тестов
  const handleTestGroupComplete = (groupResult: Partial<TestResult>) => {
    const newResult = {
      userId: user?.email || 'anonymous',
      ...(testResult || {}),
      ...groupResult,
    };

    setTestResult(newResult);
    localStorage.setItem('testResult', JSON.stringify(newResult));

    if (currentTestGroup && !completedGroups.includes(currentTestGroup)) {
      const newCompleted = [...completedGroups, currentTestGroup];
      setCompletedGroups(newCompleted);
      localStorage.setItem('completedGroups', JSON.stringify(newCompleted));
    }

    setCurrentTestGroup(null);
  };

  const value: AppContextType = {
    testResult,
    completedGroups,
    currentTestGroup,
    handleStartTest,
    handleTestGroupComplete,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Хук
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};