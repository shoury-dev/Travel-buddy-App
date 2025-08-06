const express = require('express');
const cors = require('cors');
const path = require('path');
const loginRoutes = require('./Routes/routes');
// const oauthRoutes = require('./Routes/oauthRoutes');
const localDB = require('./Config/localDatabase');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize local database
console.log('Initializing local database...');

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Travel Buddy API Server is running!',
    status: 'Online',
    database: 'Local JSON Database',
    endpoints: {
      register: 'POST /travel_buddy/register - User registration',
      login: 'POST /travel_buddy/login - User login',
      profile: 'GET /travel_buddy/profile - Get user profile (requires token)',
      dashboard: 'GET /travel_buddy/dashboard - Access dashboard (requires token)',
      googleAuth: 'GET /auth/google - Google OAuth login'
    },
    usage: {
      register: {
        method: 'POST',
        url: '/travel_buddy/register',
        body: {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123'
        }
      },
      login: {
        method: 'POST',
        url: '/travel_buddy/login',
        body: {
          email: 'john@example.com',
          password: 'password123'
        }
      }
    }
  });
});

// Health check route
app.get('/health', (req, res) => {
  const users = localDB.getAllUsers();
  res.json({
    status: 'healthy',
    database: 'connected',
    userCount: users.length,
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/travel_buddy', loginRoutes);
// app.use('/auth', oauthRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    availableRoutes: [
      'POST /travel_buddy/register',
      'POST /travel_buddy/login',
      'GET /travel_buddy/profile',
      'GET /travel_buddy/dashboard',
      'GET /auth/google'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Travel Buddy Server running on http://localhost:${PORT}`);
  console.log(`📊 Database: Local JSON file`);
  console.log(`🔗 Frontend: http://localhost:5173`);
  console.log(`📚 API Documentation: http://localhost:${PORT}`);
});
