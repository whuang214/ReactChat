import { useEffect, useState } from "react";

import { Sidebar } from "../components/Sidebar";
import { Chat } from "../components/Chat/Chat";
import { AddContact } from "../components/Contact/AddContact";
import { UserProfile } from "../components/UserProfile";
import { Settings } from "../components/Settings";

export const AuthenticatedApp = () => {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("profile");

  return (
    <div className="flex w-full h-screen">
      <Sidebar currentPage={currentPage} setPage={setCurrentPage} />
      {currentPage === "chat" && <Chat />}
      {currentPage === "add-contact" && <AddContact />}
      {currentPage === "profile" && <UserProfile />}
      {currentPage === "settings" && <Settings />}
    </div>
  );
};
