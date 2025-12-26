export interface LoginData {
  email: string;
  password: string;
}

export interface RegistrationData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}