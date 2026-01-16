import api from './api';
import { AccountApiRegisterDTO } from '../../types/pupil/account';
import { PupilDTO, PupilListResponse, PupilResponse } from '../../types/pupil/pupil';

export const pupilService = {
  
  getAllPupils: async (page: number, size: number, signal?: AbortSignal): Promise<PupilListResponse> => {
    const response = await api.get<PupilListResponse>(
      `/api/pupils?page=${page}&size=${size}`,
      {signal});
    return response.data;
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
  },
  getPupilData: async (token: string) => {
    try {
      const response = await api.get('api/pupils/pupil-data', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch(err) {
      console.error(err)
      throw err
    }
  }
}
