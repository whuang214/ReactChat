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

  // function to update the current conversation by id
  const updateConversationById = (id) => {
    // if id is null then set the current conversation to the most recent conversation
    if (!id) {
      setCurrentConversation(null);
      fetchConversations();
      return;
    }
    axios
      .get(`${API_URL}/chat/conversations/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCurrentConversation(res.data);
      });
  };

  // function to fetch the conversations
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
          updateConversationById(res.data[0]._id);
        }
      });
  };

  return (
    <div className="flex flex-grow m-7 ml-0">
      <div className="flex-grow mr-7 w-1/2">
        <GroupList
          currentConversation={currentConversation}
          updateConversationById={updateConversationById}
          groupConversations={groupConversations}
          setGroupConversations={setGroupConversations}
          fetchConversations={fetchConversations}
        />
        <ConversationList
          user={user}
          privateConversations={privateConversations}
          updateConversationById={updateConversationById}
          setPrivateConversations={setPrivateConversations}
          currentConversation={currentConversation}
          fetchConversations={fetchConversations}
        />
      </div>
      <ChatWindow
        user={user}
        currentConversation={currentConversation}
        updateConversationById={updateConversationById}
      />
    </div>
  );
};
