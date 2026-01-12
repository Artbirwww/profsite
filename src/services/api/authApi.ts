import axios from 'axios';
import { User, AuthResponse } from '../../types/User';
import { LoginData, RegistrationData } from '../../types/AuthData';

const API_URL = import.meta.env.BASE_URL || 'http://localhost:3000/api';

console.log('API URL:', import.meta.env.BASE_URL);
//console.log('App name:', import.meta.env.VITE_APP_NAME);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен к запросам
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },

  register: async (email: string, password: string, firstName?: string, lastName?: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', {
      email,
      password,
      firstName,
      lastName,
    });
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};

export default api;