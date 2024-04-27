import { useAuth } from "../context/AuthContext";

export const ConversationItem = ({
  conversation,
  currentConversation,
  setCurrentConversation,
}) => {
  const { user } = useAuth(); // Assuming useAuth is your auth hook that provides user data

  const otherParticipant =
    conversation.participants.find((p) => p._id !== user._id) ||
    conversation.participants[0];

  const handleClick = () => {
    setCurrentConversation(conversation); // Function to set the current conversation
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center p-4 rounded-lg cursor-pointer ${
        currentConversation._id === conversation._id
          ? "bg-gray-200"
          : "hover:bg-gray-100"
      }`}
    >
      <img
        src={otherParticipant.avatarUrl || "https://via.placeholder.com/50"}
        alt="Avatar"
        className="w-10 h-10 rounded-full mr-3"
      />
      <div>
        <h3 className="text-sm font-semibold">
          {otherParticipant.displayName}
        </h3>
        <a
          href={otherParticipant.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-500 hover:text-blue-600"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};