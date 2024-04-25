import { useState } from "react";

import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const AddContact = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // contact the server to search for the user
  };

  return (
    <div className="flex flex-grow m-7 ml-0">
      <div className="flex flex-col flex-grow p-4 rounded-lg mr-7 bg-white shadow-lg">
        <div className="text-3xl font-bold mb-4">Add Contact</div>
        <div className="mb-4">
          <input
            className="w-full p-2 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition duration-200 ease-in-out"
            type="text"
            placeholder="Search by username or display name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="overflow-auto">
          <div>List Results here</div>
        </div>
      </div>
      <div className="flex flex-col flex-grow p-4 rounded-lg bg-white shadow-lg">
        <div className="text-3xl font-bold mb-4">Contact Details</div>
      </div>
    </div>
  );
};
