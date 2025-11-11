import { chatAPI } from '../api/chat.api';

class ChatService {
  async startChatSession(initialMessage) {
    const response = await chatAPI.startChatSession(initialMessage);
    return response.data;
  }

  async getChatSessions(page, size) {
    const response = await chatAPI.getChatSessions(page, size);
    return response.data;
  }

  async getSessionDetails(sessionId, page, size) {
    const response = await chatAPI.getSessionDetails(sessionId, page, size);
    return response.data;
  }

  async rateChatSession(sessionId, rating, feedback) {
    const response = await chatAPI.rateChatSession(sessionId, rating, feedback);
    return response.data;
  }

  async endChatSession(sessionId) {
    const response = await chatAPI.endChatSession(sessionId);
    return response.data;
  }
}

export default new ChatService();