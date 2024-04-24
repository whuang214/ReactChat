import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

import {
  ChatBubbleOvalLeftIcon,
  Cog6ToothIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import useAuth from "../../hooks/useAuth";

const SidebarItem = ({ icon: Icon, onClick }) => (
  <button
    className="flex items-center justify-center h-12 w-12 mb-4 text-white transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-110"
    onClick={onClick}
  >
    <Icon className="h-8 w-8" />
  </button>
);

// Logout user
const handleLogout = () => {
  axios
    .get(`${API_URL}/auth/logout`, {
      withCredentials: true,
    })
    .then(() => {
      window.location.href = window.location.href;
    })
    .catch((error) => {
      console.error(error);
    });
};

const Sidebar = ({ setPage }) => {
  const { user } = useAuth();

  return (
    <aside className="h-auto bg-purple-600 flex flex-col items-center m-7 p-4 rounded-2xl shadow-2xl">
      {/* User Profile */}
      <img
        className="w-12 h-12 mb-8 rounded-full border-2 border-white cursor-pointer"
        src={`${user?.avatarUrl}`}
        alt="Profile"
        onClick={() => setPage("profile")}
      />
      {/* Chat Page */}
      <SidebarItem
        icon={ChatBubbleOvalLeftIcon}
        onClick={() => {
          setPage("chat");
        }}
      />
      {/* Settings */}
      <SidebarItem
        icon={Cog6ToothIcon}
        onClick={() => {
          setPage("settings");
        }}
      />
      {/* Logout */}
      <SidebarItem icon={ArrowLeftEndOnRectangleIcon} onClick={handleLogout} />
    </aside>
  );
};

export default Sidebar;
