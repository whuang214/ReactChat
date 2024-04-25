export const ChatHeader = ({ user, currentConversation }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-purple-600 rounded-2xl shadow-lg text-white p-4 flex items-center">
      <img
        className="h-14 w-14 rounded-full border-2 border-purple-300 mr-3"
        src={`${user.avatarUrl}`}
        alt="User Avatar"
      />
      <div>
        <h2 className="text-lg font-semibold">{`${user.displayName}`}</h2>
        <p className="text-sm">{`${user.username}`}</p>
      </div>
    </div>
  );
};
