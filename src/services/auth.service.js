import { authAPI } from '../api/auth.api';
import tokenService from './token.service';

class AuthService {
  async register(data) {
    const response = await authAPI.register(data);
    return response.data;
  }

  async verifyEmail(data) {
    const response = await authAPI.verifyEmail(data);
    return response.data;
  }

  async login(data) {
    const response = await authAPI.login(data);
    const { access, refresh } = response.data.data;
    tokenService.setTokens(access, refresh);
    return response.data;
  }

  async requestPasswordReset(data) {
    const response = await authAPI.requestPasswordReset(data);
    return response.data;
  }

  async verifyPasswordResetOTP(data) {
    const response = await authAPI.verifyPasswordResetOTP(data);
    return response.data;
  }

  async resetPassword(data) {
    const response = await authAPI.resetPassword(data);
    return response.data;
  }

  async changePassword(data) {
    const response = await authAPI.changePassword(data);
    return response.data;
  }

  async verifyPasswordChange(data) {
    const response = await authAPI.verifyPasswordChange(data);
    return response.data;
  }

  async logout() {
    try {
      await authAPI.logout();
    } finally {
      tokenService.clearTokens();
    }
  }

  async deleteAccount() {
    try {
      await authAPI.deleteAccount();
    } finally {
      tokenService.clearTokens();
    }
  }

  isAuthenticated() {
    const token = tokenService.getAccessToken();
    return token && !tokenService.isTokenExpired(token);
  }
}

export default new AuthService();