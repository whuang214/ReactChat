import { useState, useEffect } from "react";
import axios from "axios";

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Make API call to backend to check if user is authenticated
    // If user is authenticated, set user state to the user object
  }, []);

  return user;
}

export default useAuth;
