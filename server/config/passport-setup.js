const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // find or create user logic
      done(null, profile);
    }
  )
);

// when we need to store the user in the session
passport.serializeUser((user, done) => done(null, user.id));

// when we need to fetch the user from the database
passport.deserializeUser((id, done) => {
  done(null, user);
});
