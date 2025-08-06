const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const { User } = require('../Modules/userSchema');

const SECRET_KEY = 'mySecretKey123'; // Keep this secure

passport.use(new GoogleStrategy({
  clientID: '75710238586-ak26dkipvhtl7v3u2djemqtieag53t4n.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: '/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      user = new User({
        username: profile.displayName,
        googleId: profile.id
      });
      await user.save();
    }

    // Attach JWT to user object
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Append token to user for later use in response
    user.token = token;

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));
