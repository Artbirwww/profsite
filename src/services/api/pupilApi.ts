import api from './authApi';
import { AccountApiRegisterDTO } from '../../types/pupil/account';
import { PupilDTO } from '../../types/pupil/pupil';

// Ответ сервера — ученик + связанный аккаунт (на основе твоей реализации и DTO)
// Так как в pupil.ts нет PupilResponse, а в API-методах он нужен — определяем его локально,
// но **только здесь**, так как используется исключительно в этом файле (пункт 3 из твоих требований)
interface PupilResponse extends PupilDTO {
  id: number;
  accountId?: number;
  createdAt?: string;   // ISO 8601
  updatedAt?: string;   // ISO 8601
}

export const pupilService = {
  /**
   * Автоматическая регистрация ученика с созданием аккаунта
   */
  autoRegister: async (data: AccountApiRegisterDTO): Promise<PupilResponse> => {
    try {
      const response = await api.post<PupilResponse>('/pupils/auto-register', data);
      return response.data;
    } catch (err) {
      console.error('Error registering pupil:', err);
      throw err;
    }
  },

  autoRegisterAll: async (data: AccountApiRegisterDTO[]): Promise<any> => {
    try {
      const response = await api.post('/pupils/auto-register-all', data);
      return response.data;
    } catch (err) {
      console.error('Error registering pupils batch:', err);
      throw err;
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
   * Получить список всех учеников (для админа)
   */
  getAllPupils: async (): Promise<PupilResponse[]> => {
    const response = await api.get<PupilResponse[]>('/pupils');
    return response.data;
  },
};

// Экспорт для обратной совместимости
export const autoRegister = pupilService.autoRegister;