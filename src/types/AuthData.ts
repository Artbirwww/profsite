export interface LoginData {
  email: string;
  password: string;
}

export interface RegistrationData {
  email: string;
  password: string;
}

export interface AccountRegisterRequestDTO {
  email: string;
  password: string;
}

export interface AutoRegisterRequest {
  accountRegisterRequestDTO: AccountRegisterRequestDTO;
  pupilDTO: {
    name: string;
    surname: string;
    patronymic: string;
    birthday: string;
    school: string;
    healthCondition: string;
    nationality: string;
    extraActivities: string;
    classNumber: number;
    classLabel: string;
    gender: string;
  };
}