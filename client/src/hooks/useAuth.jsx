import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make an API call to the backend to check if the user is authenticated
    // If the user is authenticated, set the user state to the user object
    axios
      .get(`${API_URL}/user`, { withCredentials: true }) // Ensure credentials are included for cookie-based authentication
      .then((res) => {
        setUser(res.data.user);
        // console.log("Authenticated user:", res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Authentication error:", err);
        setLoading(false);
      });
  }, []);

  return { user, loading };
};
