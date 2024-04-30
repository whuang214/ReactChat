const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const session = require("express-session");
const http = require("http");
const passport = require("passport");
const corsMiddleware = require("./config/corsConfig");
const { init: initSocket } = require("./config/socketConfig"); // Ensure this path is correct

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
    saveUninitialized: false,
    cookie: {
      domian : process.env.DOMAIN,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'lax',
      httpOnly: true,
    },
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
}
app.use(morgan("dev"));

// CORS middleware
app.use(corsMiddleware);

// Middleware to check if the user is authenticated using Passport
function isAuthenticated(req, res, next) {
  console.log(req.session);
  console.log(req.user);
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("User is not authenticated");
    return res.status(401).json({ error: "User is not authenticated" });
  }
}

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", isAuthenticated, require("./routes/userRoutes"));
app.use("/api/chat", isAuthenticated, require("./routes/chatRoutes"));

// Server setup
const server = http.createServer(app);
const io = initSocket(server); // Initialize Socket.IO with the HTTP server

const PORT = process.env.PORT || 3000;

// Replace app.listen with server.listen to ensure both Express and Socket.IO are using the same HTTP server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
