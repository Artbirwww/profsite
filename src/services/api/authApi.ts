// src/services/api/authApi.ts
import { BASE_URL } from './baseUrl';

const AUTH_ENDPOINT = `${BASE_URL}/api/auth`;
const PUPIL_ENDPOINT = `${BASE_URL}/api/pupils`;

export const authApi = {
  register: async (email: string, password: string) => {
    const res = await fetch(`${AUTH_ENDPOINT}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Registration failed');
  },

  login: async (email: string, password: string) => {
    const res = await fetch(`${AUTH_ENDPOINT}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    const token = await res.text();
    return token.trim();
  },

  autoRegister: async (account: { email: string; password: string }, pupil: any) => {
    const res = await fetch(`${AUTH_ENDPOINT}/auto-register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountRegisterRequestDTO: account, pupilDTO: pupil }),
    });
    if (!res.ok) throw new Error('Auto-registration failed');
    return await res.json();
  },

  autoRegisterAll: async (registrations: Array<{ accountRegisterRequestDTO: any; pupilDTO: any }>) => {
    const res = await fetch(`${AUTH_ENDPOINT}/auto-register-all`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrations),
    });
    if (!res.ok) throw new Error('Bulk auto-registration failed');
    return await res.json();
  },

  
  getPupilData: async (token: string) => {
    const res = await fetch(`${PUPIL_ENDPOINT}/pupil-data`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('NO_PUPIL_DATA');
      }
      throw new Error('Failed to fetch pupil data');
    }
    return await res.json();
  },
};