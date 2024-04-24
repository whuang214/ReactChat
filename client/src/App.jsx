import { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const handleClick = async () => {
    try {
      // Make API call to backend
      const response = await axios.get("http://localhost:3000/");
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
      <h1>Welcome to the front end</h1>
      <button onClick={handleClick}>Fetch Data</button>
    </div>
  );
};

export default App;
