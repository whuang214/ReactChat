import { useEffect } from "react";
import { ConversationItem } from "../ConversationItem";

export const GroupList = ({
  groupConversations,
  currentConversation,
  fetchConversations,
  updateConversationById,
  handleDeleteConversation,
}) => {
  return (
    <div className="panel mb-7 h-2/5">
      <div className="flex items-center justify-between p-2 m-2">
        <h1 className="panel-header">Groups</h1>
      </div>
      <div className="overflow-y-auto">
        {groupConversations.map((conversation) => (
          <ConversationItem
            key={conversation._id}
            conversation={conversation}
            currentConversation={currentConversation}
            handleDeleteConversation={handleDeleteConversation}
            updateConversationById={updateConversationById}
            isGroup={true} // Pass true to handle group-specific logic
          />
        ))}
      </div>
      {groupConversations.length === 0 && (
        <p className="flex items-center justify-center h-full text-gray-500">
          No group conversations found
        </p>
      )}
    </div>
  );
};
