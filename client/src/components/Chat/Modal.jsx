import React, { useState, useRef } from "react";
import Select from "react-select";
import { Option, SingleValue, MultiValue } from "./CustomSelectComponents";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

export const Modal = ({
  handleAddConversation,
  setShowModal,
  userContacts,
}) => {
  const modalRef = useRef(null); // Create a ref for the modal content
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [conversationName, setConversationName] = useState(""); // State to store the conversation name
  const { user } = useAuth();

  const options = userContacts.map((contact) => ({
    value: contact._id,
    label: contact.displayName,
    avatarUrl: contact.avatarUrl,
  }));

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions || []);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  const handleAddConversationClick = () => {
    if (selectedOptions.length > 1 && !conversationName) {
      toast.error("Must enter conversation name for group conversations");
      return;
    }
    handleAddConversation(selectedOptions, conversationName);
    setShowModal(false);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto"
      onClick={handleClickOutside}
    >
      <div
        className="mx-auto p-5 w-full max-w-md panel"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Start a New Conversation
          </h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        {/* Contact picker */}
        <div className="mb-4">
          <Select
            id="contacts-select"
            instanceId="contacts-select"
            isMulti
            options={options}
            components={{ Option, SingleValue, MultiValue }}
            onChange={handleChange}
            className={"basic-multi-select" + " focus:border-" + `${user?.colors.lightColor}`}
            classNamePrefix="select"
            placeholder="Select contacts..."
          />
        </div>
        {/* Conditional Input for Conversation Name */}
        {selectedOptions.length > 1 && (
          <div className="mb-4">
            <input
              type="text"
              className={"w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent" 
                + " focus:ring-" + `${user?.colors.mainColor}`}
              placeholder="Enter conversation name"
              value={conversationName}
              onChange={(e) => setConversationName(e.target.value)}
            />
          </div>
        )}
        {/* Action buttons */}
        <div className="flex justify-end mt-4">
          <button className={"btn-primary" + " bg-" + `${user?.colors.mainColor}` + " hover:bg-" + `${user?.colors.darkColor}`} onClick={handleAddConversationClick}>
            Start Conversation
          </button>
        </div>
      </div>
    </div>
  );
};
