import { useState, useEffect, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { WS_BASE_URL } from '../utils/constants';
import tokenService from '../services/token.service';

const STREAMING_ID = 'ai-streaming-message';

export const useChatSocket = (sessionId) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const streamingMessageRef = useRef(null);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    sessionId ? WS_BASE_URL : null,
    {
      onOpen: () => {
        console.log('WebSocket connected');
        setError(null);
      },
      onClose: () => {
        console.log('WebSocket disconnected');
      },
      onError: (err) => {
        console.error('WebSocket error:', err);
        setError('Connection failed. Please check if the server is running.');
      },
      shouldReconnect: () => true,
      reconnectAttempts: 10,
      reconnectInterval: 3000,
      retryOnError: true,
    }
  );

  useEffect(() => {
    if (lastJsonMessage !== null) {
      const data = lastJsonMessage;

      if (data.type === 'chunk') {
        setIsStreaming(true);
        if (!streamingMessageRef.current) {
          streamingMessageRef.current = {
            id: STREAMING_ID,
            role: 'ASSISTANT',
            content: data.content,
            createdAt: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, streamingMessageRef.current]);
        } else {
          streamingMessageRef.current.content += data.content;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === STREAMING_ID
                ? { ...streamingMessageRef.current }
                : msg
            )
          );
        }
      } else if (data.type === 'complete') {
        setIsStreaming(false);
        streamingMessageRef.current = null;
      } else if (data.type === 'error') {
        setIsStreaming(false);
        setError(data.message || 'An unknown WebSocket error occurred');
        streamingMessageRef.current = null;
      }
    }
  }, [lastJsonMessage]);

  const sendMessage = (message) => {
    if (readyState === ReadyState.OPEN) {
      const token = tokenService.getAccessToken();
      const payload = {
        token,
        sessionId,
        message,
      };

      const userMessage = {
        id: `user-${Date.now()}`,
        role: 'USER',
        content: message,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      sendJsonMessage(payload);
    } else {
      setError('WebSocket is not connected. Please wait...');
    }
  };

  const isConnected = readyState === ReadyState.OPEN;
  const isConnecting = readyState === ReadyState.CONNECTING;

  return {
    messages,
    setMessages,
    isConnected,
    isConnecting,
    isStreaming,
    error,
    sendMessage,
  };
};