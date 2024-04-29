import "./ContactDetails.css";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const ContactDetails = ({ clickedUser, loggedInUser }) => {
  const [isContact, setIsContact] = useState(false);

  useEffect(() => {
    fetchUserContacts();
  }, [clickedUser]);

  const fetchUserContacts = async () => {
    axios
      .get(`${API_URL}/user/contacts`, { withCredentials: true })
      .then((response) => {
        setIsContact(
          response.data.contacts.some(
            (contact) => contact._id === clickedUser._id
          )
        );
      })
      .catch((error) => {
        console.error("Error fetching user contacts:", error.response.data);
      });
  };

  const onAddContact = () => {
    axios
      .post(
        `${API_URL}/user/add/${clickedUser._id}`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        toast.success(`Added ${clickedUser.username} as a contact!`);
        setIsContact(true); // Update state to reflect the change
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const onRemoveContact = () => {
    axios
      .post(
        `${API_URL}/user/remove/${clickedUser._id}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then(() => {
        toast.success(`Removed ${clickedUser.username} as a contact.`);
        setIsContact(false); // Update state to reflect the change
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className="panel p-10 w-1/2">
      <h1 className="panel-header">Contact Details</h1>
      {clickedUser && (
        <>
          <div className="profile-header mb-6">
            <img
              className="w-32 h-32 rounded-full border-4 border-purple-light mb-4"
              src={clickedUser.avatarUrl}
              alt={clickedUser.displayName}
            />
            <h2 className="text-2xl font-semibold">
              {clickedUser.displayName}
            </h2>
            <a
              href={clickedUser.profileUrl}
              className="text-md text-purple hover:text-purple-dark hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @{clickedUser.username}
            </a>
            {clickedUser._id !== loggedInUser._id &&
              (isContact ? (
                <button onClick={onRemoveContact} className="mt-4 btn-primary">
                  Remove Contact
                </button>
              ) : (
                <button onClick={onAddContact} className="mt-4 btn-primary">
                  Add Contact
                </button>
              ))}
          </div>
          <div className="flex flex-col p-4 bg-purple-light rounded-lg">
            <div className="mb-2">
              <span className="font-bold text-purple-dark">GitHub ID: </span>
              {clickedUser.githubId}
            </div>
            <div className="mb-2">
              <span className="font-bold text-purple-dark">Profile URL: </span>
              <a
                href={clickedUser.profileUrl}
                className="text-purple hover:text-purple-dark hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {clickedUser.profileUrl}
              </a>
            </div>
            <div>
              <span className="font-bold text-purple-dark">Location: </span>
              {clickedUser.location || "Not provided"}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
