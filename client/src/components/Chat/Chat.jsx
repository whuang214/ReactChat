import { useEffect, useState } from "react";
import { ChatWindow } from "./ChatWindow/ChatWindow";
import { ConversationList } from "./ConversationList";
import { GroupList } from "./GroupList";
import { useAuth } from "../../context/AuthContext";

import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const Chat = () => {
  const { user } = useAuth();
  const [currentConversation, setCurrentConversation] = useState(null); // current conversation
  const [privateConversations, setPrivateConversations] = useState([]); // private conversations state
  const [groupConversations, setGroupConversations] = useState([]); // group conversations state

  // useeffect to set current conversation most recent (make a call to the server to get the most recent conversation)
  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = () => {
    axios
      .get(`${API_URL}/chat/conversations`, {
        withCredentials: true,
      })
      .then((res) => {
        // loop through the conversations and if the conversation is a group conversation, add it to the groupConversations state
        // if the conversation is a private conversation, add it to the privateConversations state
        // clear the groupConversations and privateConversations state before adding the conversations
        setGroupConversations([]);
        setPrivateConversations([]);
        res.data.forEach((conversation) => {
          if (conversation.type === "group") {
            setGroupConversations((prev) => [...prev, conversation]);
          } else {
            setPrivateConversations((prev) => [...prev, conversation]);
          }
        });
        // if first time loading the page, set the current conversation to the most recent conversation
        if (!currentConversation) {
          console.log("currnet convo is null");
          setCurrentConversation(res.data[0]);
        }
      });
  };

  return (
    <div className="flex flex-grow m-7 ml-0">
      <div className="flex-grow mr-7">
        <GroupList
          currentConversation={currentConversation}
          groupConversations={groupConversations}
          setGroupConversations={setGroupConversations}
          setCurrentConversation={setCurrentConversation}
        />
        <ConversationList
          user={user}
          privateConversations={privateConversations}
          setPrivateConversations={setPrivateConversations}
          currentConversation={currentConversation}
          setCurrentConversation={setCurrentConversation}
          fetchConversations={fetchConversations}
        />
      </div>
      <ChatWindow user={user} currentConversation={currentConversation} />
    </div>
  );
};
