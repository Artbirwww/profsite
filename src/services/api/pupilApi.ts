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
  //роут другой
  getPupil: async (id: number): Promise<PupilResponse> => {
    const response = await api.get<PupilResponse>(`/pupils/${id}`);
    return response.data;
  },
  //Такого нет
  getCurrentPupil: async (): Promise<PupilResponse> => {
    const response = await api.get<PupilResponse>('/pupils/me');
    return response.data;
  },

  getAllPupils: async (page: number, size: number, signal?: AbortSignal): Promise<PupilListResponse> => {
    const response = await api.get<PupilListResponse>(
      `/api/pupils?page=${page}&size=${size}`,
      {signal});
    return response.data;
  },
};

export const autoRegister = pupilService.autoRegister;