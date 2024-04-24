import express from 'express';
import passport from 'passport';
import { config } from 'dotenv';
import { Strategy as GitHubStrategy } from 'passport-github';
import mongoose from 'mongoose';
import session from 'express-session';

config();
const router = express.Router();
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;


//LOGIN
//create a user model
const userSchema = new Schema({
    username: String,
    githubId: String
  });

  const User = mongoose.model('User', userSchema);

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, cb) => {
    let user = await User.findOne({ githubId: profile.id });
    if (!user) {
      user = new User({ username: profile.username, githubId: profile.id });
      await user.save();
    } else if (user.username != profile.username) {
      const filter = {githubId: profile.id};
      const change = {username: profile.username};
      await User.findOneAndUpdate(filter, change);
    }

    return cb(null, user);
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id);
  cb(null, user);
});

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set to true if your app is on https
}));


router.get('/github', passport.authenticate('github'));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    req.session.userId = req.user._id;
    res.redirect('/index.html');
  }
);

// get username 
router.get('/getusername', async (req, res) => {
  try {
    if (req.session.userId) {
      const user
        = await User.findById(req.session
          .userId);
      res.json({ username: user.username });
    } else {
      es.status(500).json({ error: 'Failed to retrieve username' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve username' });
  }
});


export default router;


