import { useEffect, useState } from "react";
import { ChatWindow } from "./ChatWindow/ChatWindow";
import { ConversationList } from "./ConversationList";
import { GroupList } from "./GroupList";
import { useAuth } from "../../context/AuthContext";

import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const Chat = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);

  // useeffect to set current conversation most recent (make a call to the server to get the most recent conversation)
  useEffect(() => {
    axios
      .get(`${API_URL}/chat/conversations`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data);
        setCurrentConversation(res.data[0]);
      });
  }, []);

  return (
    <div className="flex flex-grow m-7 ml-0">
      <div className="flex-grow mr-7">
        <GroupList
          currentConversation={currentConversation}
          setCurrentConversation={setCurrentConversation}
        />
        <ConversationList
          conversations={conversations}
          currentConversation={currentConversation}
          setCurrentConversation={setCurrentConversation}
        />
      </div>
      <ChatWindow user={user} currentConversation={currentConversation} />
    </div>
  );
};
