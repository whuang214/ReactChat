import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const ConversationList = ({
  currentConversation,
  setCurrentConversation,
}) => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (!user) return; // Exit if there is no user logged in
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/contacts`, {
          withCredentials: true,
        });
        setContacts(response.data.contacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, [user]);

  return (
    <div className="panel">
      <div className="panel-header p-2 pl-4">Conversations</div>
      <ul className="divide-y divide-gray-200">
        {contacts.map((contact) => (
          <li
            key={contact._id}
            className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
          >
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={contact.avatarUrl || "path/to/default-avatar.png"} // Replace with your default avatar path
              alt={`Avatar of ${contact.displayName}`}
            />
            <div className="ml-4">
              <p className="text-lg font-medium text-gray-900">
                {contact.displayName}
              </p>
              {/* TODO: change this later*/}
              <p className="text-sm text-gray-500">{contact.lastMessage}</p>
            </div>
          </li>
        ))}
      </ul>
      {contacts.length === 0 && (
        <p className="text-gray-500">No contacts found.</p>
      )}
    </div>
  );
};
