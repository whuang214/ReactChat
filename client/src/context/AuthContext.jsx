// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser(); // Fetch user data when the component mounts
  }, []); // Run this effect only once on component mount

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/user`, { withCredentials: true });
      setUser(res.data.user);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const updateUser = async () => {
    setLoading(true); // Set loading state to true before fetching data
    try {
      const res = await axios.get(`${API_URL}/user`, {
        withCredentials: true,
      });
      setUser(res.data.user);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
