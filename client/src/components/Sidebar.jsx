import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

import "./Sidebar.css";

import { useAuth } from "../hooks/useAuth";

import {
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  ArrowLeftStartOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";

const SidebarItem = ({ icon: Icon, label, onClick, selected }) => (
  <button
    onClick={onClick}
    className={`sidebar-item ${
      selected ? "sidebar-item-selected" : "sidebar-item-unselected"
    } flex items-center justify-between`}
  >
    <div className="flex items-center p-8">
      <Icon className="h-10 w-10 ml-2 mr-3" />
      <span
        className={`sidebar-item-label ${
          selected
            ? "sidebar-item-label-selected"
            : "sidebar-item-label-unselected"
        }`}
      >
        {label}
      </span>
    </div>
    <div
      className={`sidebar-item-indicator ${
        selected
          ? "sidebar-item-indicator-selected"
          : "sidebar-item-indicator-unselected"
      }`}
    ></div>
    {/* Indicator */}
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
    <aside className="sidebar">
      <img
        className="profile-img"
        src={`${user?.avatarUrl}`}
        alt="Profile"
        onClick={() => setPage("profile")}
      />
      <div className="sidebar-content">
        {/* Add Contact Page */}
        <SidebarItem
          icon={UserPlusIcon}
          onClick={() => setPage("add-contact")}
          selected={currentPage === "add-contact"}
        />
        {/* Chat Page */}
        <SidebarItem
          icon={ChatBubbleLeftIcon}
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
          icon={ArrowLeftStartOnRectangleIcon}
          onClick={handleLogout}
        />
      </div>
    </aside>
  );
};
