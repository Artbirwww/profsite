import { BASE_URL } from './baseUrl';

const AUTH_ENDPOINT = `${BASE_URL}/api/auth`;

export const authApi = {
  register: async (email: string, password: string) => {
    const res = await fetch(`${AUTH_ENDPOINT}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Registration failed');
    return;
  },

  login: async (email: string, password: string) => {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
    const res = await fetch(`${AUTH_ENDPOINT}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
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
};