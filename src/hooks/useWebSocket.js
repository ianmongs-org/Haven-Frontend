import { useState, useEffect, useRef } from 'react';
import { WS_BASE_URL } from '../utils/constants';
import tokenService from '../services/token.service';

export const useWebSocket = (sessionId) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const ws = useRef(null);
  const streamingMessageRef = useRef(null);

  useEffect(() => {
    if (!sessionId) return;

    ws.current = new WebSocket(WS_BASE_URL);
    ws.current.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      setError(null);
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'chunk') {
        setIsStreaming(true);
        if (streamingMessageRef.current) {
          streamingMessageRef.current = {
            ...streamingMessageRef.current,
            content: streamingMessageRef.current.content + data.content,
          };
        } else {
          streamingMessageRef.current = {
            id: `ai-streaming-${Date.now()}`,
            role: 'ASSISTANT',
            content: data.content,
            createdAt: new Date().toISOString(),
          };
        }
        
        setMessages((prev) => {
          const existingMsgIndex = prev.findIndex(
            (msg) => msg.id === streamingMessageRef.current.id
          );
          if (existingMsgIndex !== -1) {
            const updatedMessages = [...prev];
            updatedMessages[existingMsgIndex] = streamingMessageRef.current;
            return updatedMessages;
          } else {
            return [...prev, streamingMessageRef.current];
          }
        });

      } else if (data.type === 'complete') {
        setIsStreaming(false);
        if (streamingMessageRef.current) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === streamingMessageRef.current.id
                ? { ...streamingMessageRef.current, isStreaming: false }
                : msg
            )
          );
          streamingMessageRef.current = null;
        }
      } else if (data.type === 'error') {
        setIsStreaming(false);
        setError(data.message || 'An unknown WebSocket error occurred');
        streamingMessageRef.current = null;
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      setIsStreaming(false);
    };

    ws.current.onerror = (err) => {
      console.error('WebSocket error:', err);
      setError('WebSocket connection failed');
      setIsStreaming(false);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [sessionId]);

  const sendMessage = (message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
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
      ws.current.send(JSON.stringify(payload));
    } else {
      setError('WebSocket is not connected');
    }
  };

  return { messages, setMessages, isConnected, isStreaming, error, sendMessage };
};