import { useEffect, useState } from "react";
import { ChatWindow } from "./ChatWindow/ChatWindow";
import { ConversationList } from "./ConversationList";
import { GroupList } from "./GroupList";
import { useAuth } from "../../context/AuthContext";

import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const Chat = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]); // conversations state
  const [currentConversation, setCurrentConversation] = useState(null); // current conversation

  // useeffect to set current conversation most recent (make a call to the server to get the most recent conversation)
  useEffect(() => {
    axios
      .get(`${API_URL}/chat/conversations`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data);
        // if the first time, set the current conversation to the most recent conversation
        if (!currentConversation) {
          setCurrentConversation(res.data[0]);
        }
        console.log(currentConversation);
      });
  }, [currentConversation]);

  return (
    <div className="flex flex-grow m-7 ml-0">
      <div className="flex-grow mr-7">
        <GroupList
          currentConversation={currentConversation}
          setConversations={setConversations}
          setCurrentConversation={setCurrentConversation}
        />
        <ConversationList
          user={user}
          conversations={conversations}
          setConversations={setConversations}
          currentConversation={currentConversation}
          setCurrentConversation={setCurrentConversation}
        />
      </div>
      <ChatWindow user={user} currentConversation={currentConversation} />
    </div>
  );
};
