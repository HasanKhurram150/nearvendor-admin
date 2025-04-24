export interface AuthState {
  authToken: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
