import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const ContactDetails = ({ user }) => {
  const onAddContact = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/user/add/${user._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Contact added:", response.data);
    } catch (error) {
      console.error("Error adding contact:", error.response.data);
    }
  };

  return (
    <div className="flex flex-col flex-grow p-4 rounded-2xl bg-white shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-purple-600">
        Contact Details
      </h1>
      {user && (
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
            <button
              onClick={onAddContact}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Contact
            </button>
          </div>
          <div className="flex flex-col p-4 bg-purple-100 rounded-lg">
            <div className="mb-2">
              <span className="font-bold text-purple-700">GitHub ID: </span>
              {user.githubId}
            </div>
            <div className="mb-2">
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
            <div>
              <span className="font-bold text-purple-700">Location: </span>
              {user.location || "Not provided"}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
