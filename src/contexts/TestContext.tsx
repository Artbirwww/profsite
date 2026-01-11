import React, { createContext, useState, useContext, ReactNode } from 'react';
import { TestResult, PsychTestRequest, PsychTestResponse, TestType } from '../types/TestResult';
import { testService } from '../services/api/testApi';

interface TestContextType {
  currentTest: TestType | null;
  testResults: PsychTestResponse[];
  isLoading: boolean;
  error: string | null;
  startTest: (testType: TestType) => void;
  createTest: (testData: PsychTestRequest) => Promise<PsychTestResponse>;
  getTestsByPupil: () => Promise<PsychTestResponse[]>;
  clearCurrentTest: () => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTest, setCurrentTest] = useState<TestType | null>(null);
  const [testResults, setTestResults] = useState<PsychTestResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startTest = (testType: TestType) => {
    setCurrentTest(testType);
    setError(null);
  };

  const createTest = async (testData: PsychTestRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const savedTest = await testService.createTest(testData);
      setTestResults(prev => [...prev, savedTest]);
      return savedTest;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save test result';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getTestsByPupil = async () => {
    setIsLoading(true);
    try {
      const results = await testService.getTestsByPupil();
      setTestResults(results);
      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch test results';
      setError(errorMessage);
      throw new Error(errorMessage);
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
      createTest,
      getTestsByPupil,
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