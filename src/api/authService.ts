import axiosClient from './axiosClient';
import { Auth as AuthResponse } from '../types/ApiResponse/APIResp';
import { Auth as AuthRequest } from '../types/APIRequest';

/**
 * Authentication service that uses backend request types
 */
const authService = {
  login: async (payload: AuthRequest.Login['body']): Promise<AuthResponse.Login> => {
    const response = await axiosClient.post<AuthResponse.Login>('/auth/login', payload);
    return response.data;
  },
  
  register: async (payload: AuthRequest.Register['body']): Promise<AuthResponse.Register> => {
    const response = await axiosClient.post<AuthResponse.Register>('/auth/register', payload);
    return response.data;
  },
  
  logout: async (): Promise<AuthResponse.Logout> => {
    const response = await axiosClient.post<AuthResponse.Logout>('/auth/logout');
    return response.data;
  },
  
  verifyEmail: async (token: string): Promise<AuthResponse.Verification> => {
    const response = await axiosClient.get<AuthResponse.Verification>(`/auth/verify-email/${token}`);
    return response.data;
  },
  
  getCurrentUser: async (): Promise<AuthResponse.User> => {
    const response = await axiosClient.get<AuthResponse.User>('/auth/me');
    return response.data;
  },
  
  // Adding additional methods based on your backend types
  
  requestPasswordReset: async (payload: AuthRequest.PasswordReset['body']): Promise<any> => {
    const response = await axiosClient.post('/auth/password-reset', payload);
    return response.data;
  },
  
  resetPassword: async (
    token: string, 
    payload: AuthRequest.PasswordUpdate['body']
  ): Promise<any> => {
    const response = await axiosClient.post(`/auth/reset-password/${token}`, payload);
    return response.data;
  }
};

export default authService;