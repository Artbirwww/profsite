import api from './authApi';
import { TestResult, TestType } from '../../types/TestResult';

export const testService = {
  saveResult: async (result: Omit<TestResult, 'id' | 'userId' | 'completedAt'>): Promise<TestResult> => {
    const response = await api.post<TestResult>('/tests/results', result);
    return response.data;
  },

  getUserResults: async (): Promise<TestResult[]> => {
    const response = await api.get<TestResult[]>('/tests/results');
    return response.data;
  },

  getTestResultsByType: async (testType: TestType): Promise<TestResult[]> => {
    const response = await api.get<TestResult[]>(`/tests/results/${testType}`);
    return response.data;
  },
};