import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

import { useAuth } from "../../hooks/useAuth";

import {
  ChatBubbleOvalLeftIcon,
  Cog6ToothIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

const SidebarItem = ({ icon: Icon, onClick }) => (
  <button
    className="flex items-center justify-center h-14 w-14 md:h-16 md:w-16 lg:h-18 lg:w-18 mb-4 text-white transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-110"
    onClick={onClick}
  >
    <Icon className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14" />
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

export const Sidebar = ({ setPage }) => {
  const { user } = useAuth();

  return (
    <aside className="w-1/10 h-auto bg-purple-600 flex flex-col items-center m-7 mr-0 p-4 rounded-2xl shadow-2xl">
      {/* User Profile */}
      <img
        className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mb-8 rounded-full border-2 border-white cursor-pointer"
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
