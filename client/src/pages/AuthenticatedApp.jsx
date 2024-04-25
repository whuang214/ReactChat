import { useEffect, useState } from "react";

import { Sidebar } from "../components/Sidebar/Sidebar";
import { Chat } from "../components/Chat/Chat";

export const AuthenticatedApp = () => {
  const [currentPage, setCurrentPage] = useState("profile");

  return (
    <div className="flex w-full h-screen">
      <Sidebar setPage={setCurrentPage} />
      {currentPage === "chat" && <Chat />}
      {currentPage === "profile" && <p>Profile Page</p>}
      {currentPage === "settings" && <p>Settings Page</p>}
    </div>
  );
};
