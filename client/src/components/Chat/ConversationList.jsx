import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const ConversationList = ({
  conversations,
  currentConversation,
  setCurrentConversation,
}) => {
  const privateConversations = conversations.filter(
    (conversation) => conversation.conversationType === "private"
  );
  const { user } = useAuth();

  return (
    <div className="panel">
      <div className="panel-header p-2 pl-4">Conversations</div>
    </div>
  );
};
