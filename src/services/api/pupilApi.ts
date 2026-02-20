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
    const res = await api.post("/api/pupils/update-pupil-data", pupilDTO, {
      headers: {Authorization: token}
    })

    return res.data
  },
  getPupilData: async (token: string) => {
    try {
      const response = await api.get<PupilResponse>('api/pupils/pupil-data', {
        headers: {
          Authorization: token
        }
      })
      return response.data
    } catch(err) {
      console.error(err)
      throw err
    }
  }
}
