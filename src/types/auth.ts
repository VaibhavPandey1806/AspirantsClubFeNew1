export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
}

export interface RegisterData {
  name: string;
  username: string;
  password: string;
  mobile: string;
  emailId: string;
}