import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ConversationItem } from "../ConversationItem";
import { Modal } from "./Modal";

import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const ConversationList = ({
  conversations,
  setConversations,
  currentConversation,
  setCurrentConversation,
}) => {
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [userContacts, setUserContacts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchUserContacts();
  }, []);

  const privateConversations = conversations.filter(
    (conversation) => conversation.conversationType === "private"
  );

  const handleAddConversationClick = () => {
    setShowModal(true); // Show the modal when the Add button is clicked
  };

  // Function to create a new conversation
  const handleAddConversation = async (selectedContacts) => {
    const participantIds = selectedContacts.map((contact) => contact.value);
    participantIds.push(user._id);

    axios
      .post(
        `${API_URL}/chat/conversations`,
        {
          participants: participantIds,
        },
        {
          withCredentials: true, // If you are handling sessions/cookies, set this as needed
        }
      )
      .then((response) => {
        setCurrentConversation(response.data);
        setConversations((prevConversations) => [
          ...prevConversations,
          response.data,
        ]);
      })
      .catch((error) => {
        console.error(
          "Failed to create conversation:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const fetchUserContacts = async () => {
    // fetch the api/users/contacts endpoint which will return the user's contacts
    axios
      .get(`${API_URL}/user/contacts`, {
        withCredentials: true,
      })
      .then((response) => {
        setUserContacts(response.data.contacts);
      })
      .catch((error) => {
        console.error("Error fetching user contacts:", error.response.data);
      });
  };

  return (
    <div className="panel">
      <div className="flex items-center justify-between p-3 m-4">
        <h1 className="panel-header">Conversations</h1>
        <button
          className="btn-primary ml-2"
          onClick={handleAddConversationClick}
        >
          Add
        </button>
      </div>
      {privateConversations.map((conversation) => (
        <ConversationItem
          key={conversation._id}
          conversation={conversation}
          currentConversation={currentConversation}
          setCurrentConversation={setCurrentConversation}
        />
      ))}

      {showModal && (
        <Modal
          handleAddConversation={handleAddConversation}
          setShowModal={setShowModal}
          fetchUserContacts={fetchUserContacts}
          userContacts={userContacts}
        />
      )}
      {privateConversations.length === 0 && (
        <p className="flex items-center justify-center h-full text-gray-500">
          No conversations found
        </p>
      )}
    </div>
  );
};
