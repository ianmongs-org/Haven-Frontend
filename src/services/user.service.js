import { userAPI } from '../api/user.api';

class UserService {
  async getCurrentUser() {
    const response = await userAPI.getCurrentUser();
    return response.data;
  }

  async updateProfile(data) {
    const response = await userAPI.updateProfile(data);
    return response.data;
  }

  async getUserStatistics() {
    const response = await userAPI.getUserStatistics();
    return response.data;
  }
}

export default new UserService();