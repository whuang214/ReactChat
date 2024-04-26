import { ChatHeader } from "./ChatHeader";
import { ChatBody } from "./ChatBody";
import { ChatFooter } from "./ChatFooter";

export const ChatWindow = ({ user, currentConversation }) => {
  if (!currentConversation) {
    return (
      <div className="panel">
        <div className="panel-header p-2 pl-4">Chat</div>
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">
            Select a conversation to start chatting
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="panel">
      <ChatHeader user={user} currentConversation={currentConversation} />
      <ChatBody currentConversation={currentConversation} />
      <ChatFooter currentConversation={currentConversation} />
    </div>
  );
};
