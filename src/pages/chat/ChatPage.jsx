import { ChatLayout } from "../../components/chat/ChatLayout";
import { useParams } from "react-router-dom";

export const ChatPage = () => {
  const { sessionId } = useParams();

  return (
    <div className="flex overflow-hidden">
      <div className={`flex-1 transition-all duration-300 ease-in-out`}>
        <ChatLayout key={sessionId} selectedSessionId={sessionId} />
      </div>
    </div>
  );
};
