import { useEffect } from "react";
import { ConversationItem } from "../ConversationItem";
import { toast } from "react-toastify";

export const ConversationList = ({
  privateConversations,
  setPrivateConversations,
  currentConversation,
  fetchConversations,
  updateConversationById,
  handleDeleteConversation,
  handleAddConversationClick, // Passed from parent
}) => {
  return (
    <div className="panel">
      <div className="flex items-center justify-between p-2 m-2">
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
          handleDeleteConversation={handleDeleteConversation} // Ensure this function is defined or passed correctly
          updateConversationById={updateConversationById}
        />
      ))}
      {privateConversations.length === 0 && (
        <p className="flex items-center justify-center h-full text-gray-500">
          No conversations found
        </p>
      )}
    </div>
  );
};
