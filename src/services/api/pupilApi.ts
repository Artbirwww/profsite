import api from './authApi';
import { AccountApiRegisterDTO } from '../../types/pupil/account';
import { PupilDTO, PupilListResponse, PupilResponse } from '../../types/pupil/pupil';

export const pupilService = {
  autoRegister: async (data: AccountApiRegisterDTO): Promise<PupilResponse> => {
    try {
      const response = await api.post<PupilResponse>('/api/auth/auto-register', data);
      return response.data;
    } catch (err) {
      console.error('Error registering pupil:', err);
      throw err;
    }
  },

  autoRegisterAll: async (data: AccountApiRegisterDTO[]): Promise<any> => {
    try {
      const response = await api.post('/api/auth/auto-register-all', data);
      return response.data;
    } catch (err) {
      console.error('Error registering pupils batch:', err);
      throw err;
    }
  },

  getAllPupils: async (page: number, size: number, signal?: AbortSignal): Promise<PupilListResponse> => {
    const response = await api.get<PupilListResponse>(
      `/api/pupils?page=${page}&size=${size}`,
      {signal});
    return response.data;
  },
  getPupilData: async (): Promise<PupilResponse> => {
    const res = await fetch(`/api/pupils/pupil-data`, {
      headers: {
      },
    });
    if (!res.ok) throw new Error('Failed to fetch pupil data');
    return await res.json();
  },
  updatePupilData: async (pupilDTO: Partial<PupilDTO>): Promise<PupilDTO> => {
    const res = await fetch(`/api/pupils/update-pupil-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pupilDTO),
    });
    if (!res.ok) throw new Error('Failed to update pupil data');
    return await res.json();
  }
};
