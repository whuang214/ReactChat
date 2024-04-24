const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON bodies for this app

// Define CORS options
const corsOptions = {
  // Environment-specific CORS origin
  origin: function (origin, callback) {
    let allowedOrigins = [process.env.DEV_ORIGIN];
    if (process.env.NODE_ENV === "production") {
      allowedOrigins = [process.env.PROD_ORIGIN];
    }

    // if theres no origin (if the server calls itself) or the origin is in the allowed list, allow the request
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions)); // Enable CORS for all requests

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Log HTTP requests to the console in development mode
}

// Define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Message from the backend" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
