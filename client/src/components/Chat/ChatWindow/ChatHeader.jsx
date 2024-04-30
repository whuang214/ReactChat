export const ChatHeader = ({ user, currentConversation }) => {
  if (!currentConversation) {
    return <div>Loading...</div>;
  }

  // make sure otherParticipant is updated when the currentConversation changes
  // if current convo is private than the other participant is the other person in the convo
  // if current convo is group than the group name is the title
  if (currentConversation.type === "group") {
    return (
      <div className={"rounded-2xl shadow-lg text-white p-4 flex items-center" + " bg-" + `${user?.colors.mainColor}`}>
        <img
          className={"h-14 w-14 rounded-full border-2 mr-3" + " border-" + `${user?.colors.lightColor}`}
          src={`https://via.placeholder.com/50`}
          alt="User Avatar"
        />
        <div>
          <h2 className="text-lg font-semibold">{`${currentConversation.name}`}</h2>
          <p className="text-sm">{`Group`}</p>
        </div>
      </div>
    );
  }
  const otherParticipant =
    currentConversation.participants.find((p) => p._id !== user._id) ||
    currentConversation.participants[0];

  return (
    <div className={"rounded-2xl shadow-lg text-white p-4 flex items-center" + " bg-" + `${user?.colors.mainColor}`}>
      <img
        className={"h-14 w-14 rounded-full border-2 mr-3" + " border-" +`${user?.colors.lightColor}`}
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
