import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

import { useAuth } from "../hooks/useAuth";

import {
  ChatBubbleOvalLeftIcon,
  Cog6ToothIcon,
  ArrowLeftEndOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

const SidebarItem = ({ icon: Icon, label, onClick, selected }) => (
  <button
    onClick={onClick}
    className={`group w-full flex items-center justify-start p-2 my-2 ${
      selected ? "bg-dark-purple text-white" : "bg-purple text-white"
    } relative rounded-lg transition duration-300 ease-in-out`}
  >
    <div
      className={`absolute left-0 top-0 w-1 h-full ${
        selected ? "bg-yellow-400" : "bg-transparent"
      } transition-all duration-300 ease-in-out rounded-lg`}
    ></div>
    <Icon className="h-10 w-10 ml-2 mr-3" />
    <span
      className={`flex-1 text-left ${
        selected ? "font-bold" : "font-medium"
      } transition duration-300 ease-in-out`}
    >
      {label}
    </span>
  </button>
);

// Logout user
const handleLogout = () => {
  axios
    .get(`${API_URL}/auth/logout`, {
      withCredentials: true,
    })
    .then(() => {
      window.location.href = window.location.href; // reload the page
    })
    .catch((error) => {
      console.error(error);
    });
};

export const Sidebar = ({ currentPage, setPage }) => {
  const { user } = useAuth();

  return (
    <aside className="w-1/12 bg-purple-600 flex flex-col items-center rounded-3xl shadow-2xl m-7">
      <img
        className="w-14 h-14 md:w-16 md:h-16 lg:w-24 lg:h-24 my-8 rounded-full border-2 border-white cursor-pointer"
        src={`${user?.avatarUrl}`}
        alt="Profile"
        onClick={() => setPage("profile")}
      />
      <div className="flex flex-col justify-between flex-grow space-y-7 m-10">
        {/* Add Contact Page */}
        <SidebarItem
          icon={UserPlusIcon}
          onClick={() => setPage("add-contact")}
          selected={currentPage === "add-contact"}
        />
        {/* Chat Page */}
        <SidebarItem
          icon={ChatBubbleOvalLeftIcon}
          onClick={() => setPage("chat")}
          selected={currentPage === "chat"}
        />
        {/* Settings */}
        <SidebarItem
          icon={Cog6ToothIcon}
          onClick={() => setPage("settings")}
          selected={currentPage === "settings"}
        />
        {/* Spacer */}
        <div className="flex-grow" />
        {/* Logout */}
        <SidebarItem
          icon={ArrowLeftEndOnRectangleIcon}
          onClick={handleLogout}
        />
      </div>
    </aside>
  );
};
