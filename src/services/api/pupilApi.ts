import { BASE_URL } from './baseUrl';
import { PupilDTO, PupilResponse, PaginatedPupilResponse } from '../../types/pupil/pupil';
import { useAuth } from '../../contexts/AuthContext';

const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const PUPIL_ENDPOINT = `${BASE_URL}/api/pupils`;

export const pupilService = {
  getPupils: async (page?: number, size?: number): Promise<PaginatedPupilResponse> => {
    const params = new URLSearchParams();
    if (page !== undefined) params.set('page', page.toString());
    if (size !== undefined) params.set('size', size.toString());

    const url = `${PUPIL_ENDPOINT}${params.size ? `?${params.toString()}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch pupils');
    return await res.json();
  },

  getPupilData: async (): Promise<PupilResponse> => {
    const res = await fetch(`${PUPIL_ENDPOINT}/pupil-data`, {
      headers: {
        ...getAuthHeader(),
      },
    });
    if (!res.ok) throw new Error('Failed to fetch pupil data');
    return await res.json();
  },

  updatePupilData: async (pupilDTO: Partial<PupilDTO>): Promise<PupilDTO> => {
    const res = await fetch(`${PUPIL_ENDPOINT}/update-pupil-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(pupilDTO),
    });
    if (!res.ok) throw new Error('Failed to update pupil data');
    return await res.json();
  },
};