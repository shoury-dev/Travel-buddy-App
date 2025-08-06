const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../Controllers/loginController');
const verifyToken = require('../Middleware/authMiddleware');

// Public routes (no authentication required)
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (authentication required)
router.get('/profile', verifyToken, getUserProfile);

// Dashboard route (protected)
router.get('/dashboard', verifyToken, (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to your dashboard!',
    user: {
      userId: req.user.userId,
      email: req.user.email
    }
  });
});

// Test protected route
router.get('/test-protected', verifyToken, (req, res) => {
  res.json({
    success: true,
    message: 'This is a protected route',
    user: req.user
  });
});

module.exports = router;
