// authController.js

const passport = require("passport");

// Function to handle GitHub authentication
const githubAuth = (req, res, next) => {
  const authenticate = passport.authenticate("github");
  authenticate(req, res, next);
};

// Function to handle callback from GitHub after authentication
const githubCallback = (req, res) => {
  const callback = passport.authenticate(
    "github",
    { failureRedirect: "/login" },
    (err, user, info) => {
      if (err) {
        return res.status(401).json({ error: "Authentication failed" });
      }
      if (!user) {
        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(401).json({ error: "Login failed" });
        }
        if (process.env.NODE_ENV === "production") {
          return res.redirect(process.env.PROD_FRONTEND_ORIGIN);
        }
        res.redirect(process.env.DEV_FRONTEND_ORIGIN);
      });
    }
  );
  callback(req, res);
};

// Function to handle logout
const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    if (process.env.NODE_ENV === "production") {
      return res.redirect(process.env.PROD_FRONTEND_ORIGIN);
    }
    res.redirect(process.env.DEV_FRONTEND_ORIGIN);
  });
};

module.exports = {
  githubAuth,
  githubCallback,
  logout,
};
