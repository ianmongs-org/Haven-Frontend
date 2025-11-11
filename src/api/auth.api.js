import axiosInstance from './axios.config';
import { API_ENDPOINTS } from '../utils/constants';

export const authAPI = {
  register: (data) => {
    return axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, {
      email: data.email,
      password: data.password,
      full_name: data.fullName,
    });
  },

  verifyEmail: (data) => {
    return axiosInstance.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
      email: data.email,
      otp_code: data.otpCode,
    });
  },

  login: (data) => {
    return axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, {
      email: data.email,
      password: data.password,
    });
  },

  requestPasswordReset: (data) => {
    return axiosInstance.post(API_ENDPOINTS.AUTH.REQUEST_PASSWORD_RESET, {
      email: data.email,
    });
  },

  verifyPasswordResetOTP: (data) => {
    return axiosInstance.post(API_ENDPOINTS.AUTH.VERIFY_PASSWORD_RESET_OTP, {
      email: data.email,
      otp_code: data.otpCode,
    });
  },

  resetPassword: (data) => {
    return axiosInstance.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      email: data.email,
      new_password: data.newPassword,
    });
  },

  changePassword: (data) => {
    return axiosInstance.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
      old_password: data.oldPassword,
      new_password: data.newPassword,
      confirm_password: data.confirmPassword,
    });
  },

  verifyPasswordChange: (data) => {
    return axiosInstance.post(
      `${API_ENDPOINTS.AUTH.VERIFY_PASSWORD_CHANGE}?newPassword=${encodeURIComponent(data.newPassword)}`,
      {
        email: data.email,
        otp_code: data.otpCode,
      }
    );
  },

  logout: () => {
    return axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  deleteAccount: () => {
    return axiosInstance.delete(API_ENDPOINTS.AUTH.DELETE_ACCOUNT);
  },

  refreshToken: (refreshToken) => {
    return axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
      refresh_token: refreshToken,
    });
  },
};