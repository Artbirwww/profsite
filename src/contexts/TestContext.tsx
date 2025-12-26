import React, { createContext, useState, useContext, ReactNode } from 'react';
import { TestResult, TestType } from '../types/TestResult';
import { testService } from '../services/api/testApi';

interface TestContextType {
  currentTest: TestType | null;
  testResults: TestResult[];
  isLoading: boolean;
  error: string | null;
  startTest: (testType: TestType) => void;
  saveTestResult: (result: Omit<TestResult, 'id' | 'userId' | 'completedAt'>) => Promise<TestResult>;
  getUserResults: () => Promise<TestResult[]>;
  clearCurrentTest: () => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTest, setCurrentTest] = useState<TestType | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startTest = (testType: TestType) => {
    setCurrentTest(testType);
    setError(null);
  };

  const saveTestResult = async (result: Omit<TestResult, 'id' | 'userId' | 'completedAt'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const savedResult = await testService.saveResult(result);
      setTestResults(prev => [...prev, savedResult]);
      return savedResult;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save test result');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getUserResults = async () => {
    setIsLoading(true);
    try {
      const results = await testService.getUserResults();
      setTestResults(results);
      return results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch results');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCurrentTest = () => {
    setCurrentTest(null);
  };

  return (
    <TestContext.Provider value={{
      currentTest,
      testResults,
      isLoading,
      error,
      startTest,
      saveTestResult,
      getUserResults,
      clearCurrentTest,
    }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTest = () => {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
};