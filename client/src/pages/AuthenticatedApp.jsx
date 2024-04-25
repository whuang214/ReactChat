import { useEffect, useState } from "react";

import { Sidebar } from "../components/Sidebar/Sidebar";
import { Chat } from "../components/Chat/Chat";
import { UserProfile } from "../components/UserProfile";
import { Settings } from "../components/Settings";

export const AuthenticatedApp = () => {
  const [currentPage, setCurrentPage] = useState("profile");

  return (
    <div className="flex w-full h-screen">
      <Sidebar currentPage={currentPage} setPage={setCurrentPage} />
      {currentPage === "chat" && <Chat />}
      {currentPage === "profile" && <UserProfile />}
      {currentPage === "settings" && <Settings />}
    </div>
  );
};
