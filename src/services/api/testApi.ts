import axios, { AxiosError } from 'axios';
import api from './api';
import { TestResultRequest, TestResultResponse } from '../../types/testTypes';
import { AccountsTests } from '../../types/account/account';

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
  getTestsByType: async (token: string, testType: string) => {
    try {
      const response = await api.get<TestResultResponse[]>(`api/psych-tests/my-tests/type/${testType}`, {
        headers: {Authorization: token}
      })
      return response.data
    } catch(err) {
      console.error(err)
      throw err
    }
  },
  getRecentTests: async (token: string) => {
    try {
      const response = await api.get<Record<string, TestResultResponse>>(`api/psych-tests/my-recent-tests`, {
        headers: {Authorization: token}
      })
      return response.data
    } catch(err) {
      throw err
    }
  },
  getCompletedTestsByDates: async (token: string, type: string, startDate:string, endDate:string) =>  {
    
    if (!token) throw new Error("Authentication token is required")
    if (!type) throw new Error("Test type is required")
    if (!startDate) throw new Error("Start date is required")
    if (!endDate) throw new Error("End date is required")
    try {
      const query = `type=${type}&startDate=${startDate}&endDate=${endDate}`
      const params = new URLSearchParams({
        type: type,
        startDate: startDate,
        endDate: endDate
      })
      const response = await api.get<AccountsTests[]>(`api/psych-tests/completed-tests?${params.toString()}`, {
        headers: {Authorization: token}
      })
      return response.data
    } catch(err) {
      console.error('API call failed:', {
        endpoint: 'getCompletedTestsByDates',
        params: { type, startDate, endDate },
        error: err
    })
      throw err
    }
  }
};