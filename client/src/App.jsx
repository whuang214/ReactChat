import { useState } from "react";
import axios from "axios";
import "./App.css";
import useAuth from "./hooks/useAuth";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const { user, loading } = useAuth(); // Destructure user and loading states from useAuth hook

  if (loading) {
    return (
      // Render a loading indicator while waiting for authentication process to complete
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-800">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
        Welcome to the Front-End
      </h1>
      {user ? (
        <div className="flex flex-col items-center">
          <p className="text-xl text-green-500 my-3">
            Welcome, {user.username}!
          </p>
          <a
            href={`${API_URL}/auth/logout`}
            className="text-indigo-500 hover:text-indigo-600 transition-colors mx-3 bg-transparent border border-indigo-500 hover:border-indigo-600 font-semibold py-2 px-4 rounded-lg"
          >
            Logout
          </a>
        </div>
      ) : (
        <a
          href={`${API_URL}/auth/github`}
          className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Login with GitHub
        </a>
      )}
    </div>
  );
};

export default App;
