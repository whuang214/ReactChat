export const ContactDetails = ({ user }) => {
  return (
    <div className="flex flex-col flex-grow p-4 rounded-lg bg-white shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-purple-600">
        Contact Details
      </h1>
      {user && ( // This line checks if user object exists before rendering the details
        <>
          <div className="flex flex-col items-center mb-6">
            <img
              className="w-32 h-32 rounded-full border-4 border-purple-300 mb-4"
              src={user.avatarUrl}
              alt={user.displayName}
            />
            <h2 className="text-2xl font-semibold">{user.displayName}</h2>
            <a
              href={user.profileUrl}
              className="text-md text-purple-500 hover:text-purple-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @{user.username}
            </a>
          </div>
          <div className="flex flex-col p-4 bg-purple-100 rounded-lg">
            <div className="mb-2">
              <span className="font-bold text-purple-700">GitHub ID: </span>
              {user.githubId}
            </div>
            <div>
              <span className="font-bold text-purple-700">Profile URL: </span>
              <a
                href={user.profileUrl}
                className="text-purple-500 hover:text-purple-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.profileUrl}
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
