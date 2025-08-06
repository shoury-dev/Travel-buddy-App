// App/Routes/loginRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../Controllers/loginController');
const verifyToken = require('../Middleware/authMiddleware');

// Routes
router.post('/register', register);
router.post('/login', login);


router.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: 'Profile access granted',
    user: req.user
  });
});

module.exports = router;
