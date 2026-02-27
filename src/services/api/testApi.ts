import axios, { AxiosError } from 'axios';
import api from './api';
import { TestResultRequest, TestResultResponse } from '../../types/testTypes';

export const testApi = {
  createTest: async (token: string, testData: TestResultRequest): Promise<TestResultResponse> => {
    try {
      const response = await api.post<TestResultResponse>(`api/psych-tests/create-test`, testData, {
        headers: {
          Authorization: token,
        },
      });
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to save test result');
      } else {
        throw new Error('An unexpected error occurred while saving test result');
      }
    }
  },

  getTestsByPupil: async (token: string): Promise<TestResultRequest[]> => {
    try {
      const response = await api.get<TestResultResponse[]>(`api/psych-tests/my-tests`, {
        headers: {
          Authorization: token,
        },
      });
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch test results');
      } else {
        throw new Error('An unexpected error occurred while fetching test results');
      }
    }
  },
  getTestByType: async (token: string, testType: string) => {
    try {
      const response = await api.get<TestResultResponse[]>(`api/psych-tests/my-tests/type/${testType}`, {
        headers: {Authorization: token}
      })
      return response.data
    } catch(err) {
      console.error(err)
      throw err
    }
  } 
};