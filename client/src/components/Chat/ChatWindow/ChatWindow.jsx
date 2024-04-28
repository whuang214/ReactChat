import { ChatHeader } from "./ChatHeader";
import { ChatBody } from "./ChatBody";
import { ChatFooter } from "./ChatFooter";

const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

export const ChatWindow = ({
  user,
  currentConversation,
  updateConversationById,
}) => {
  // handleMessageSubmit function to send a message
  const handleMessageSubmit = (message) => {
    axios
      .post(
        `${API_URL}/chat/conversations/${currentConversation._id}/message`,
        {
          content: message,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // update the current conversation with the new message
        updateConversationById(currentConversation._id);
      });
  };

  if (!currentConversation) {
    return (
      <div className="panel w-2/3">
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
    <div className="panel w-2/3">
      <ChatHeader user={user} currentConversation={currentConversation} />
      <ChatBody user={user} currentConversation={currentConversation} />
      <ChatFooter
        currentConversation={currentConversation}
        handleMessageSubmit={handleMessageSubmit}
      />
    </div>
  );
};
