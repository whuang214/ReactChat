const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json()); // Parse JSON bodies for this app

// Log HTTP requests to the console in development mode
app.use(morgan("dev"));

// Define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Message from the backend" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
