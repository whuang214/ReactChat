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
}) => {
  return (
    <div className="panel h-2/5">
      <div className="flex items-center justify-between p-2 m-2">
        <h1 className="panel-header">Conversations</h1>
      </div>
      <div className="overflow-y-auto">
        {privateConversations.map((conversation) => (
          <ConversationItem
            key={conversation._id}
            conversation={conversation}
            currentConversation={currentConversation}
            handleDeleteConversation={handleDeleteConversation} // Ensure this function is defined or passed correctly
            updateConversationById={updateConversationById}
          />
        ))}
      </div>

      {privateConversations.length === 0 && (
        <p className="flex items-center justify-center h-full text-gray-500">
          No conversations found
        </p>
      )}
    </div>
  );
};
