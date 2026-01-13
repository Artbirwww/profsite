import { BASE_URL } from './baseUrl';
import { PsychTestRequest, PsychTestResponse } from '../../types/TestResult';

const TEST_ENDPOINT = `${BASE_URL}/api/psych-tests`;

export const testService = {
  createTest: async (token: string, testData: PsychTestRequest): Promise<PsychTestResponse> => {
    const res = await fetch(`${TEST_ENDPOINT}/create-test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(testData),
    });
    if (!res.ok) throw new Error('Failed to save test result');
    return await res.json();
  },

  getTestsByPupil: async (token: string): Promise<PsychTestResponse[]> => {
    const res = await fetch(`${TEST_ENDPOINT}/by-pupil`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch test results');
    return await res.json();
  },
};