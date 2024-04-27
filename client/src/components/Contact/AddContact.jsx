import { useState } from "react";
import { ContactDetails } from "./ContactDetails";
import { useAuth } from "../../context/AuthContext";

import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const AddContact = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/user/search?term=${searchTerm}`,
        {
          withCredentials: true,
        }
      );
      setSearchResults(response.data.results);
      setError(null);
    } catch (error) {
      console.error("Error searching for users:", error.response.data);
      setError(error.response.data.error);
      setSearchResults([]);
    }
  };

  const handleContactClick = async (id) => {
    // make a request to the server by id to get the contact details
    try {
      const response = await axios.get(`${API_URL}/user/search/${id}`, {
        withCredentials: true,
      });
      setSelectedUser(response.data.user);
      setError(null);
    } catch (error) {
      console.error("Error getting contact details:", error.response.data);
      setError(error.response.data.error);
      setSelectedUser(null);
    }
  };

  return (
    <div className="flex m-7 ml-0 flex-grow">
      <div className="panel mr-7 p-10 w-1/2">
        <h1 className="panel-header mb-2">Add Contact</h1>
        <div className="mb-7 flex items-center justify-center">
          <input
            className="w-full p-2 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition duration-200 ease-in-out"
            type="text"
            placeholder="Search by username or display name"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            className="ml-2 btn-primary rounded-xl"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="overflow-auto">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}
          {searchResults.length > 0 ? (
            <div>
              {searchResults.map((user) => (
                <div key={user._id} className="mb-4">
                  <button
                    className="flex justify-between w-full items-center focus:outline-none bg-gray-200 hover:bg-gray-300 rounded-2xl p-2"
                    onClick={() => handleContactClick(user._id)}
                  >
                    <div className="flex items-center">
                      <img
                        className="w-16 h-16 rounded-full mx-4"
                        src={user.avatarUrl}
                        alt={`Avatar of ${user.displayName}`}
                      />
                      <div className="flex flex-col justify-center">
                        <div className="font-bold text-gray-800">
                          {user.displayName}
                        </div>
                        <div className="text-gray-600">@{user.username}</div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            !error && (
              <div className="text-gray-500 text-center mt-4">
                No search results found.
              </div>
            )
          )}
        </div>
      </div>
      {selectedUser ? (
        <ContactDetails user={selectedUser} />
      ) : (
        <ContactDetails user={user} />
      )}
    </div>
  );
};
