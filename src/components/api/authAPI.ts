import instance from "./instanceAPI.ts";

export interface AuthData {
  email: string;
  password: string;
  rememberMe: boolean;
  resultCode: number;
  data: {
    id: number;
    login: string;
    email: string;
  };
}

export interface AuthResponse {
  resultCode: number;
  messages: string[];
  data: {
    userId: number;
  }
}

export const authAPI = {
  async authMe(): Promise<AuthData> {
    try {
      const response = await instance.get<AuthData>(`auth/me`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to authenticate');
    }
  },
  async authLogin(email: string, password: string, rememberMe: boolean): Promise<AuthResponse> {
    try {
      const response = await instance.post<AuthResponse>(`auth/login`, { email, password, rememberMe });
      return response.data;
    } catch (error) {
      throw new Error('Failed to Log In User');
    }
  },
  async authLogout(): Promise<AuthResponse> {
    try {
      const response = await instance.delete<AuthResponse>(`auth/login`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to Log Out User');
    }
  }
}