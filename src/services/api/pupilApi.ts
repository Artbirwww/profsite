import api from './authApi';
import { AccountApiRegisterDTO } from '../../types/pupil/account';
// Типы для запроса регистрации ученика
export interface AccountRegisterRequestDTO {
  email: string;
  password: string;
}

export interface PupilDTO {
  name: string;
  surname: string;
  patronymic?: string;
  birthday: string; // формат: YYYY-MM-DD
  school: string;
  healthCondition?: string;
  nationality?: string;
  extraActivities?: string;
  gender: 'MALE' | 'FEMALE';
  className: string;
}

// export interface AutoRegisterRequest {
//   accountRegisterRequestDTO: AccountRegisterRequestDTO;
//   pupilDTO: PupilDTO;
// }

// Тип для ответа после регистрации
export interface PupilResponse {
  id: number;
  name: string;
  surname: string;
  patronymic?: string;
  birthday: string;
  school: string;
  healthCondition?: string;
  nationality?: string;
  extraActivities?: string;
  gender: 'MALE' | 'FEMALE';
  className: string;
  accountId?: number;
  createdAt?: string;
  updatedAt?: string;
}

// // Тип для обновления данных ученика
// export interface UpdatePupilDTO {
//   name?: string;
//   surname?: string;
//   patronymic?: string;
//   birthday?: string;
//   school?: string;
//   healthCondition?: string;
//   nationality?: string;
//   extraActivities?: string;
//   gender?: 'MALE' | 'FEMALE';
//   className?: string;
// }

export const pupilService = {
  /**
   * Автоматическая регистрация ученика с созданием аккаунта
   */
  autoRegister: async (data: AccountApiRegisterDTO): Promise<PupilResponse> => {
    try {
      const response = await api.post<PupilResponse>('/pupils/auto-register', data)
      return response.data
    } catch(err) {
      console.error("Error registering pupils: ", err)
      throw err
    }
    
  },
  autoRegisterAll: async (data: AccountApiRegisterDTO []) : Promise<any> => {
    try {
      const response = await api.post('/pupils/auto-register-all', data)
      return response.data
    } catch(err) {
      throw err
    }
  },

  /**
   * Получить данные ученика по ID
   */
  getPupil: async (id: number): Promise<PupilResponse> => {
    const response = await api.get<PupilResponse>(`/pupils/${id}`);
    return response.data;
  },

  /**
   * Получить данные текущего ученика (по токену)
   */
  getCurrentPupil: async (): Promise<PupilResponse> => {
    const response = await api.get<PupilResponse>('/pupils/me');
    return response.data;
  },

  /**
   * Обновить данные ученика
   */
  updatePupil: async (id: number, data: PupilDTO): Promise<PupilResponse> => {
    const response = await api.put<PupilResponse>(`/pupils/${id}`, data);
    return response.data;
  },

  /**
   * Обновить данные текущего ученика
   */
  updateCurrentPupil: async (data: PupilDTO): Promise<PupilResponse> => {
    const response = await api.put<PupilResponse>('/pupils/me', data);
    return response.data;
  },

  /**
   * Удалить ученика
   */
  deletePupil: async (id: number): Promise<void> => {
    await api.delete(`/pupils/${id}`);
  },

  /**
   * Получить список всех учеников (для админа)
   */
  getAllPupils: async (): Promise<PupilResponse[]> => {
    const response = await api.get<PupilResponse[]>('/pupils');
    return response.data;
  },
};



// Экспорт для обратной совместимости
export const autoRegister = pupilService.autoRegister;

