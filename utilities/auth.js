export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); 
  }
  
  res.status(401).json({ 
      error: 'Unauthorized access. Please log in at /auth/login to access this resource.' 
  });
};