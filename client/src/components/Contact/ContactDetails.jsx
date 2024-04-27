import "./ContactDetails.css";

import { toast } from "react-toastify";

import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const ContactDetails = ({ user }) => {
  const onAddContact = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/user/add/${user._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      // send a alert to the frontend that the contact was added
      toast.success("Contact added successfully!");
      console.log("Contact added:", response.data);
    } catch (error) {
      console.error("Error adding contact:", error.response.data);
      toast.error("Error adding contact: " + error.response.data.error);
    }
  };

  return (
    <div className="panel p-10 w-1/2">
      <h1 className="panel-header">Contact Details</h1>
      {user && (
        <>
          <div className="profile-header mb-6">
            <img
              className="w-32 h-32 rounded-full border-4 border-purple-300 mb-4"
              src={user.avatarUrl}
              alt={user.displayName}
            />
            <h2 className="text-2xl font-semibold">{user.displayName}</h2>
            <a
              href={user.profileUrl}
              className="text-md text-purple-500 hover:text-purple-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @{user.username}
            </a>
            {/* add a (if contact already) then display other options (remove or something) */}
            <button onClick={onAddContact} className="mt-4 btn-primary">
              Add Contact
            </button>
          </div>
          <div className="flex flex-col p-4 bg-purple-100 rounded-lg">
            <div className="mb-2">
              <span className="font-bold text-purple-700">GitHub ID: </span>
              {user.githubId}
            </div>
            <div className="mb-2">
              <span className="font-bold text-purple-700">Profile URL: </span>
              <a
                href={user.profileUrl}
                className="text-purple-500 hover:text-purple-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.profileUrl}
              </a>
            </div>
            <div>
              <span className="font-bold text-purple-700">Location: </span>
              {user.location || "Not provided"}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
