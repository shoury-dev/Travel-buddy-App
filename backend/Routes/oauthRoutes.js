const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
require('../Config/googleOAuthConfig');
const { User } = require('../Modules/userSchema');

const router = express.Router();
const SECRET_KEY = 'mySecretKey123'; // Use process.env in production
const client = new OAuth2Client('75710238586-ak26dkipvhtl7v3u2djemqtieag53t4n.apps.googleusercontent.com');

// Handle Google OAuth token from frontend
router.post('/google-auth', async (req, res) => {
  try {
    const { credential } = req.body;
    
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: '75710238586-ak26dkipvhtl7v3u2djemqtieag53t4n.apps.googleusercontent.com'
    });
    
    const payload = ticket.getPayload();
    const googleId = payload['sub'];
    const email = payload['email'];
    const name = payload['name'];
    
    // Find or create user
    let user = await User.findOne({ googleId });
    if (!user) {
      user = new User({
        username: email,
        googleId: googleId
      });
      await user.save();
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    
    res.status(200).json({
      message: 'Google authentication successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: email,
        name: name
      }
    });
    
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({ message: 'Google authentication failed' });
  }
});

// Trigger Google OAuth login
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] })
);

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const user = req.user;

    // 🔐 Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    // 🎯 Send token to frontend/client
    res.status(200).json({
      message: 'Google OAuth successful',
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });
  }
);

module.exports = router;
