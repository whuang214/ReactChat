import { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const handleClick = async () => {
    try {
      // Make API call to backend
      const response = await axios.get(import.meta.env.VITE_API_URL);
      console.log("Response:", response.data);
      // Display message from JSON response in an alert
      alert(response.data.message);
    } catch (error) {
      // Handle error if API call fails
      console.error("Error:", error);
      alert("Error occurred while fetching data");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Welcome to the front end</h1>
      <button onClick={handleClick}>Fetch Data</button>
    </div>
  );
};

export default App;
