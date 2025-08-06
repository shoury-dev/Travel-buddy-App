// Middleware to handle successful authentication redirects
const redirectAfterAuth = (req, res, next) => {
  // This middleware can be used to redirect users after successful authentication
  // For API responses, we'll send JSON instead of redirecting
  next();
};

// Middleware to check if user is authenticated and redirect accordingly
const checkAuthAndRedirect = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (token) {
    // User is authenticated, allow access
    next();
  } else {
    // User is not authenticated, send error
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
      redirectTo: '/login'
    });
  }
};

module.exports = {
  redirectAfterAuth,
  checkAuthAndRedirect
};
