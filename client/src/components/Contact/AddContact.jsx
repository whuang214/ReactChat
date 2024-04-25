import { useState } from "react";
import { ContactDetails } from "./ContactDetails";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const AddContact = () => {
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
        `${API_URL}/user/search?term=${searchTerm}`
      );
      setSearchResults(response.data.results);
      setError(null);
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.error);
        setSearchResults([]);
      } else {
        console.error("Error searching for users:", error);
        setError("An error occurred while searching for users.");
        setSearchResults([]);
      }
    }
  };

  const handleContactClick = async (id) => {
    // make a request to the server by id to get the contact details
    console.log("Getting user details for:", id);
    try {
      const response = await axios.get(`${API_URL}/user/search/${id}`);
      console.log("Contact details:", response.data.user);
      setSelectedUser(response.data.user);
      setError(null);
    } catch (error) {
      if (error.response.status === 404) {
        setError(error.response.data.error);
        setSelectedUser(null);
      } else {
        console.error("Error getting contact details:", error);
        setError("An error occurred while getting contact details.");
        setSelectedUser(null);
      }
    }
  };

  return (
    <div className="flex flex-grow m-7 ml-0">
      <div className="flex flex-col flex-grow p-4 rounded-lg mr-7 bg-white shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Add Contact</h1>
        <div className="mb-4 flex items-center justify-center">
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
            className="ml-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 ease-in-out"
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
        </div>
      </div>
      <ContactDetails user={selectedUser} />
    </div>
  );
};
