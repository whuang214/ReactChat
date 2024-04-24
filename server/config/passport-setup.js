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
      console.log("Passport callback function fired");
      const user = {
        id: profile.id,
        name: profile.name,
        username: profile.username,
      };
      done(null, profile);
    }
  )
);

// when we need to store the user in the session
passport.serializeUser((user, done) => {
  // TODO: store user in the session
  done(null, user);
});

// when we need to fetch the user from the database
passport.deserializeUser((user, done) => {
  // TODO: fetch user from the database
  done(null, user);
});
