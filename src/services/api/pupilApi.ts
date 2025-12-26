import api from './authApi';

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

export interface AutoRegisterRequest {
  accountRegisterRequestDTO: AccountRegisterRequestDTO;
  pupilDTO: PupilDTO;
}

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

// Тип для обновления данных ученика
export interface UpdatePupilDTO {
  name?: string;
  surname?: string;
  patronymic?: string;
  birthday?: string;
  school?: string;
  healthCondition?: string;
  nationality?: string;
  extraActivities?: string;
  gender?: 'MALE' | 'FEMALE';
  className?: string;
}

export const pupilService = {
  /**
   * Автоматическая регистрация ученика с созданием аккаунта
   */
  autoRegister: async (data: AutoRegisterRequest): Promise<PupilResponse> => {
    const response = await api.post<PupilResponse>('/pupils/auto-register', data);
    return response.data;
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
  updatePupil: async (id: number, data: UpdatePupilDTO): Promise<PupilResponse> => {
    const response = await api.put<PupilResponse>(`/pupils/${id}`, data);
    return response.data;
  },

  /**
   * Обновить данные текущего ученика
   */
  updateCurrentPupil: async (data: UpdatePupilDTO): Promise<PupilResponse> => {
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

