import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const ConversationList = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (!user) return; // Exit if there is no user logged in
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/contacts`, {
          withCredentials: true,
        });
        setContacts(response.data.contacts); // Assuming contacts are in response.data.contacts
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, [user]); // Re-fetch contacts when user changes

  return (
    <div className="bg-white p-4 mt-4 rounded-lg shadow-lg flex flex-col">
      <h1 className="text-lg font-bold mb-4">Conversations</h1>
      {contacts.length > 0 ? (
        <ul className="flex flex-col divide-y divide-gray-300 overflow-y-auto">
          {contacts.map((contact) => (
            <li key={contact._id} className="p-3 hover:bg-gray-100">
              <div className="flex items-center space-x-3">
                <img
                  src={contact.avatarUrl || "default-avatar.png"} // Fallback to a default image if no avatar
                  alt={`Avatar of ${contact.displayName}`}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">
                    {contact.displayName}
                  </span>
                  <span className="text-sm text-gray-500">
                    @{contact.username}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No contacts found.</p>
      )}
    </div>
  );
};
