import { useEffect, useRef } from 'react';
import { MarkdownRenderer } from '../common/MarkdownRenderer';
import { useAuth } from '../../hooks/useAuth';
import { format } from 'date-fns';

export const MessageList = ({ messages }) => {
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const userInitial = user?.full_name?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {messages.map((msg, index) => (
        <MessageItem
          key={msg.id || index}
          message={msg}
          isUser={msg.role === 'USER'}
          userInitial={userInitial}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

const MessageItem = ({ message, isUser, userInitial }) => {
  const isStreaming = message.id === 'ai-streaming-message';

  const Avatar = () => (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${
      isUser ? 'bg-accent-500' : 'bg-primary-500'
    }`}>
      {isUser ? userInitial : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )}
    </div>
  );

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && <Avatar />}
      <div
        className={`w-auto max-w-xs md:max-w-md lg:max-w-2xl rounded-2xl p-4 ${
          isUser
            ? 'bg-accent-100/80 rounded-br-none'
            : 'bg-white/80 rounded-bl-none'
        }`}
      >
        <div className="text-gray-800">
          <MarkdownRenderer>{message.content}</MarkdownRenderer>
          {isStreaming && (
             <span className="inline-block w-2 h-2 ml-1 bg-gray-700 rounded-full animate-pulse" />
          )}
        </div>
        <p className="text-xs text-gray-400 mt-2 text-right">
          {format(new Date(message.createdAt), 'p')}
        </p>
      </div>
      {isUser && <Avatar />}
    </div>
  );
};