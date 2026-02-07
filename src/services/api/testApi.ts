import axios, { AxiosError } from 'axios';
import { BASE_URL } from './baseUrl';
import { PsychTestRequest, PsychTestResponse } from '../../types/TestResult';

const TEST_ENDPOINT = `${BASE_URL}/api/psych-tests`;

export const testService = {
  createTest: async (token: string, testData: PsychTestRequest): Promise<PsychTestResponse> => {
    try {
      const response = await axios.post<PsychTestResponse>(`${TEST_ENDPOINT}/create-test`, testData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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

  getTestsByPupil: async (token: string): Promise<PsychTestResponse[]> => {
    try {
      const response = await axios.get<PsychTestResponse[]>(`${TEST_ENDPOINT}/by-pupil`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
};