const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../Config/googleOAuthConfig');

const router = express.Router();
const SECRET_KEY = 'mySecretKey123'; // Use process.env in production

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
