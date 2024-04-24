import { useState } from "react";
import axios from "axios";
import "./App.css";

import useAuth from "./hooks/useAuth";

const App = () => {
  const user = useAuth();

  return (
    // if user is logged in, display the username
    // otherwise, display the login button
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
        Welcome to the Front-End
      </h1>
      {user ? (
        <p className="text-xl text-green-500">Welcome, {user.username}!</p>
      ) : (
        <a
          href={import.meta.env.VITE_API_URL + "/auth/github"}
          className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Login with GitHub
        </a>
      )}
    </div>
  );
};

export default App;
