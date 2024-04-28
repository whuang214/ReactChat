import { useAuth } from "../hooks/useAuth";

export const UserProfile = () => {

  const { user } = useAuth();
  return (
    <div className="flex p-10">
      <div className="m-auto bg-white rounded-lg shadow-lg p-4">
        <h1>Profile</h1>
        {user ? (
          <div className="flex items-center space-x-3">
            <img
              src={user.avatarUrl || "default-avatar.png"}
              alt={`Avatar of ${user.displayName}`}
              className="w-20 h-20 rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">
                {user.displayName}
              </span>
              <span className="text-sm text-gray-500">@{user.username}</span>
              <span className="text-sm text-gray-500">{user.location}</span>
            </div>
          </div>

            
        ) : null }


      </div>
    </div>
  );
};


