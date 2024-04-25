const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const corsMiddleware = require("./config/corsConfig");

dotenv.config(); // allow for .env
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
); // allow for sessions

// database setup
require("./config/database");

// passport setup
require("./config/passport-setup");
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(corsMiddleware);

// Middleware to check if the user is authenticated using Passport
function isAuthenticated(req, res, next) {
  // console.log("Session:", req.session); // Debug session data
  // console.log("User:", req.user); // Check if user data is present
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ error: "User is not authenticated" });
  }
}

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", isAuthenticated, require("./routes/userRoutes"));
app.use("/api/chat", isAuthenticated, require("./routes/chatRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
