export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // req.user comes from your previous `protect` middleware
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: "You do not have permission to perform this action" 
      });
    }
    next();
  };
};