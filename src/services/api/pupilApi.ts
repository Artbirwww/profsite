import api from './api';
import { AccountApiRegisterDTO } from '../../types/pupil/account';
import { PupilDTO, PupilListResponse, PupilResponse } from '../../types/pupil/pupil';
import axios from 'axios';

export const pupilApi = {
  
  getAllPupils: async (page: number, size: number, signal?: AbortSignal): Promise<PupilListResponse> => {
    const response = await api.get<PupilListResponse>(
      `/api/pupils?page=${page}&size=${size}`,
      {signal});
    return response.data;
  },
  updatePupilData: async (pupilDTO: Partial<PupilDTO>, token: string): Promise<PupilDTO> => {
    // Убираем префикс "Bearer " если он уже есть в токене
    const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token;
    const res = await api.post("/api/pupils/update-pupil-data", pupilDTO, {
      headers: {Authorization: `Bearer ${cleanToken}`}
    })

    return res.data
  },
  getPupilData: async (token: string) => {
    try {
      // Убираем префикс "Bearer " если он уже есть в токене
      const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token;
      const response = await api.get<PupilResponse>('api/pupils/pupil-data', {
        headers: {
          Authorization: `Bearer ${cleanToken}`
        }
      })
      return response.data
    } catch(err) {
      console.error(err)
      throw err
    }
  }
}
