import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

import { useAuth } from "../hooks/useAuth";

import {
  ChatBubbleOvalLeftIcon,
  Cog6ToothIcon,
  ArrowLeftEndOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

const SidebarItem = ({ icon: Icon, onClick, selected }) => (
  <div className="h-14 w-14 md:h-16 md:w-16 lg:h-20 lg:w-20">
    <button
      className={`flex w-full h-full items-center justify-center rounded-3xl text-white transition duration-500 ease-in-out transform ${
        selected
          ? "bg-white text-purple-600 shadow-2xl"
          : "hover:-translate-y-1 hover:scale-110"
      }`}
      onClick={onClick}
    >
      <Icon
        className={`transition duration-500 ease-in-out w-full h-full m-0 ${
          selected ? "text-purple-600" : "text-white"
        }`}
      />
    </button>
  </div>
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

export const Sidebar = ({ currentPage, setPage }) => {
  const { user } = useAuth();

  return (
    <aside className="w-1/10 bg-purple-600 flex flex-col items-center rounded-3xl shadow-2xl m-7">
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
