import { ChatSidebar } from './ChatSidebar';
import { ChatWindow } from './ChatWindow';
import { WelcomePlaceholder } from './WelcomePlaceholder';

export const ChatLayout = ({ selectedSessionId }) => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex-1 w-full h-full">
      <div className="flex h-[calc(100vh-10rem)] rounded-2xl glass-effect overflow-hidden">
        <ChatSidebar selectedSessionId={selectedSessionId} />
        <div className="flex-1 flex flex-col h-full">
          {selectedSessionId ? (
            <ChatWindow sessionId={selectedSessionId} />
          ) : (
            <WelcomePlaceholder />
          )}
        </div>
      </div>
    </div>
  );
};