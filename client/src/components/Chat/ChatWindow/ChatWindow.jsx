import { ChatHeader } from "./ChatHeader";
import { ChatBody } from "./ChatBody";
import { ChatFooter } from "./ChatFooter";

export const ChatWindow = ({
  user,
  currentConversation,
  setCurrentConversation,
}) => {
  return (
    <div className="flex flex-col flex-grow bg-white rounded-3xl shadow-lg">
      <ChatHeader user={user} currentConversation={currentConversation} />
      <ChatBody currentConversation={currentConversation} />
      <ChatFooter currentConversation={currentConversation} />
    </div>
  );
};
