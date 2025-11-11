import axiosInstance from './axios.config';
import { API_ENDPOINTS } from '../utils/constants';

export const userAPI = {
  getCurrentUser: () => {
    return axiosInstance.get(API_ENDPOINTS.USER.ME);
  },

  updateProfile: (data) => {
    return axiosInstance.patch(API_ENDPOINTS.USER.PROFILE, {
      full_name: data.fullName,
    });
  },

  getUserStatistics: () => {
    return axiosInstance.get(API_ENDPOINTS.USER.STATISTICS);
  },
};