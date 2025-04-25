import { IAdmin } from "@/services/auth-api/auth-api.types";

export interface AuthState {
  token: string | null;
  user: IAdmin | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
