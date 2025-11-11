export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
export const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || '/ws';

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    VERIFY_EMAIL: '/auth/verify-email',
    REQUEST_PASSWORD_RESET: '/auth/request-password-reset',
    VERIFY_PASSWORD_RESET_OTP: '/auth/verify-password-reset-otp',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
    VERIFY_PASSWORD_CHANGE: '/auth/verify-password-change',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
    DELETE_ACCOUNT: '/auth/delete-account',
  },
  USER: {
    ME: '/users/me',
    PROFILE: '/users/profile',
    STATISTICS: '/users/statistics',
    AVATAR: '/users/avatar',
  },
};

export const TOKEN_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_EMAIL: '/verify-email',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
};