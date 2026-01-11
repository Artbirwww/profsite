import { BASE_URL } from './baseUrl';
import { PupilDTO, PupilResponse, PaginatedPupilResponse } from '../../types/pupil/pupil';

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

  getPupilData: async (token: string): Promise<PupilResponse> => {
    const res = await fetch(`${PUPIL_ENDPOINT}/pupil-data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch pupil data');
    return await res.json();
  },

  updatePupilData: async (token: string, pupilDTO: Partial<PupilDTO>): Promise<PupilDTO> => {
    const res = await fetch(`${PUPIL_ENDPOINT}/update-pupil-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(pupilDTO),
    });
    if (!res.ok) throw new Error('Failed to update pupil data');
    return await res.json();
  },
};