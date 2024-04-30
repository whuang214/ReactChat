// authController.js

const passport = require("passport");

// Function to handle GitHub authentication
const githubAuth = (req, res, next) => {
  const authenticate = passport.authenticate("github");
  authenticate(req, res, next);
};

// Function to handle callback from GitHub after authentication
const githubCallback = (req, res, next) => {
  const redirectUrl =
    process.env.NODE_ENV === "production"
      ? process.env.PROD_FRONTEND_ORIGIN
      : process.env.DEV_FRONTEND_ORIGIN;
  passport.authenticate(
    "github",
    { failureRedirect: redirectUrl },
    (err, user, info) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ error: "Authentication failed" });
      }
      if (!user) {
        console.log("User not found");
        return res.redirect(redirectUrl);
      }
      req.logIn(user, (err) => {
        if (err) {
          console.log(err);
          return res.status(401).json({ error: "Login failed" });
        }
        console.log(`Redirecting to ${redirectUrl}`);
        res.redirect(redirectUrl);
      });
    }
  )(req, res, next);
};

// Function to handle logout
// Function to handle logout
const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }

    // Respond with a success message
    return res.status(200).json({ message: "Logout successful" });
  });
};

module.exports = {
  githubAuth,
  githubCallback,
  logout,
};
