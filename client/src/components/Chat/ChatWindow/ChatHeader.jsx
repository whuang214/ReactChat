export const ChatHeader = ({ user, currentConversation }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  const otherParticipant =
    currentConversation.participants.find((p) => p._id !== user._id) ||
    currentConversation.participants[0];

  return (
    <div className="bg-purple-600 rounded-2xl shadow-lg text-white p-4 flex items-center">
      <img
        className="h-14 w-14 rounded-full border-2 border-purple-300 mr-3"
        src={`${otherParticipant.avatarUrl}`}
        alt="User Avatar"
      />
      <div>
        <h2 className="text-lg font-semibold">{`${otherParticipant.displayName}`}</h2>
        <p className="text-sm">{`${otherParticipant.username}`}</p>
      </div>
    </div>
  );
};
