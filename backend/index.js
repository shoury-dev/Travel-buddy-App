const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const loginRoutes = require('./Routes/routes');
const oauthRoutes = require('./Routes/oauthRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// MongoDB connection - using MongoDB Atlas for cloud database
// Replace this with your MongoDB Atlas connection string
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://demo:demo123@cluster0.mongodb.net/travelbuddy?retryWrites=true&w=majority';

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    console.log('Continuing without database - some features may not work');
  });

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Travel Buddy API Server is running!',
    endpoints: {
      auth: '/auth/google - Google OAuth login',
      register: '/travel_buddy/register - User registration',
      login: '/travel_buddy/login - User login',
      profile: '/travel_buddy/profile - Get user profile (requires token)'
    }
  });
});

// Routes
app.use('/travel_buddy', loginRoutes);
app.use('/auth', oauthRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
