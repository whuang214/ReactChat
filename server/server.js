const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON bodies for this app

// Define allowed origins based on environment
let allowedOrigins = [process.env.PROD_ORIGIN];
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Log HTTP requests to the console in development mode
  allowedOrigins = [process.env.DEV_ORIGIN]; // Add development origin to allowed list
}

const corsOptions = {
  // Environment-specific CORS origin
  origin: function (origin, callback) {
    // if theres no origin (if the server calls itself) or the origin is in the allowed list, allow the request
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions)); // Enable CORS for all requests

app.get("/", (req, res) => {
  res.json({ message: "Message from the backend" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
