import { useState } from 'react';
import { testService } from '../services/api/testApi';
import { PsychTestResponse, PsychTestRequest } from '../types/TestResult';

export const useTestService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tests, setTests] = useState<PsychTestResponse[]>([]);

  /**
   * Save a new test result
   */
  const saveNewTest = async (testData: PsychTestRequest, token: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await testService.createTest(token, testData);
      setTests(prevTests => [...prevTests, result]);

      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while saving the test';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch all tests for the student
   */
  const fetchStudentTests = async (token: string) => {
    setLoading(true);
    setError(null);

    try {
      const fetchedTests = await testService.getTestsByPupil(token);
      setTests(fetchedTests);
      return fetchedTests;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while fetching tests';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear error state
   */
  const clearError = () => {
    setError(null);
  };

  return {
    saveNewTest,
    fetchStudentTests,
    tests,
    loading,
    error,
    clearError,
  };
};