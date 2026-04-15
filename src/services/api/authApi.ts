// src/services/api/authApi.ts
import { AccountApiRegisterDTO } from '../../types/pupil/account';
import { PupilResponse } from '../../types/pupil/pupil';
import api from './api';
import { Role } from '../../types/account/role';
import { SpecialistRegisterRequest } from '../../types/specialist/specialist';

export const authApi = {
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
  register: async (email: string, password: string) => {
    try {
      const response = await api.post('/api/auth/register', {"email": email, "password": password})
      return response.data
    } catch(err) {
      console.error(err)
      throw err
    }

  },

  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/api/auth/login', {"email": email, "password": password})
      return response.data
    } catch(err) {
      console.error(err)
      throw err
    }
  },
  getRoles: async (token: string) => {
    try {
      const response = await api.get<Role[]>('/api/auth/account-roles', {headers: {Authorization: token}})
      return response.data
    } catch(err) {
      console.log(err)
      throw err
    }
  }
}