import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import { Login } from "./pages/Login";
import { AuthenticatedApp } from "./pages/AuthenticatedApp";
import { useAuth } from "./context/AuthContext";

import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      // Render a loading indicator while waiting for authentication process to complete
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <ToastContainer position="top-center" />
        <p className="text-xl font-semibold text-gray-800">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <ToastContainer position="top-center" />
      {user ? <AuthenticatedApp /> : <Login />}
    </div>
  );
};

export default App;
