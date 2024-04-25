const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const corsMiddleware = require("./config/corsConfig");

dotenv.config(); // Load environment variables from .env file
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Database setup
require("./config/database");

// Passport setup
require("./config/passport-setup");
app.use(passport.initialize());
app.use(passport.session());

// Middleware for development environment
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// CORS middleware
app.use(corsMiddleware);

// Middleware to check if the user is authenticated using Passport
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ error: "User is not authenticated" });
  }
}

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", isAuthenticated, require("./routes/userRoutes"));
app.use("/api/chat", isAuthenticated, require("./routes/chatRoutes"));

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
