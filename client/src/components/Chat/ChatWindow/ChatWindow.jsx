import { useEffect } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatBody } from "./ChatBody";
import { ChatFooter } from "./ChatFooter";

import socketIOClient from "socket.io-client";
const API_URL = import.meta.env.VITE_API_URL;
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
import axios from "axios";

export const ChatWindow = ({
  user,
  currentConversation,
  updateConversationById,
}) => {
  const socket = socketIOClient(SOCKET_URL);

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

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("joinConversation", currentConversation._id);
    });

    socket.on("fetchCurrentConversation", (data) => {
      updateConversationById(currentConversation._id);
    });

    return () => {
      console.log("Disconnecting");
      socket.disconnect();
    };
  }, [currentConversation]);

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
