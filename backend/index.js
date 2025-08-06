const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const loginRoutes = require('./App/Routes/routes');
const oauthRoutes = require('./App/Routes/oauthRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/loginDB')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/travel_buddy', loginRoutes);
app.use('/auth', oauthRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
