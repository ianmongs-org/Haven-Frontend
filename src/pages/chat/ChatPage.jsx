import { ChatLayout } from '../../components/chat/ChatLayout';
import { useParams } from 'react-router-dom';

export const ChatPage = () => {
  const { sessionId } = useParams();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex overflow-hidden">
        <ChatLayout key={sessionId} selectedSessionId={sessionId} />
      </main>
    </div>
  );
};