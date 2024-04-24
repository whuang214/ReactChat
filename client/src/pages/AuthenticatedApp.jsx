import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar/Sidebar";

const AuthenticatedApp = () => {
  const [currentPage, setCurrentPage] = useState("profile");

  return (
    <div className="flex w-full h-screen">
      <Sidebar setPage={setCurrentPage} />
      {currentPage === "profile" && <p>Profile Page</p>}
      {currentPage === "chat" && <p>Chat Page</p>}
      {currentPage === "settings" && <p>Settings Page</p>}
    </div>
  );
};

export default AuthenticatedApp;
