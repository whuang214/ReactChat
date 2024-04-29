import { useAuth } from "../context/AuthContext.jsx";
import { useContext, useState } from "react";

export const UserProfile = () => {
  const { user, editUser } = useAuth();
  const [editMode, setEditMode] = useState(false);

  const handleEditProfile = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update user profile here
    user.bio = e.target[0].value;
editUser(user);
    setEditMode(false);
  };

  return (
    <div className="flex p-10 max-w-screen-md m-auto">
      <div className="m-auto bg-white rounded-lg shadow-lg p-4 overflow-auto">
        <h1>Profile</h1>
        {user ? (
          <div className="flex items-center space-x-3">
            <img
              src={user.avatarUrl || "default-avatar.png"}
              alt={`Avatar of ${user.displayName}`}
              className="w-20 h-20 rounded-full"
            />
            <div className="flex flex-col ">
              <span className="font-medium text-gray-900">
                {user.displayName}
              </span>
              <span className="text-sm text-gray-500">@{user.username}</span>
              <span className="text-sm text-gray-500">{user.location}</span>
              <span className="text-sm text-gray-500 break-all text-wrap">{user.bio}</span>
            </div>
          </div>
        ) : null }
        <button onClick={handleEditProfile} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          {editMode ? "Cancel Edit" : "Edit Profile"}
        </button>
        {editMode && (
          <div className="mt-4">
            {/* Add form fields for editing profile information here */}
            <form onSubmit={handleSubmit}> 
              <textarea type="text" placeholder="Bio" className="border border-gray-300 p-2 rounded w-full" defaultValue={user.bio} />
            
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-2">
                Save
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};