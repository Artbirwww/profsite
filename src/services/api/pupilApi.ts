import api from './authApi';
import { AccountApiRegisterDTO } from '../../types/pupil/account';
import { PupilDTO } from '../../types/pupil/pupil';

interface PupilResponse extends PupilDTO {
  id: number;
  accountId?: number;
  createdAt?: string;
  updatedAt?: string;
}

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

  getPupil: async (id: number): Promise<PupilResponse> => {
    const response = await api.get<PupilResponse>(`/pupils/${id}`);
    return response.data;
  },

  getCurrentPupil: async (): Promise<PupilResponse> => {
    const response = await api.get<PupilResponse>('/pupils/me');
    return response.data;
  },

  getAllPupils: async (): Promise<PupilResponse[]> => {
    const response = await api.get<PupilResponse[]>('/pupils');
    return response.data;
  },
};

export const autoRegister = pupilService.autoRegister;