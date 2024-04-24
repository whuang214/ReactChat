const express = require("express");
const morgan = require("morgan");

const app = express();

// Log HTTP requests to the console
app.use(morgan("dev"));

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
