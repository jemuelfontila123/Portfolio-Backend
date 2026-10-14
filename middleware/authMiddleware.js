import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  
  // 1. Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token provided" });
  }

  // 2. Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3. Check if user still exists in database
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({ error: "The user belonging to this token no longer exists" });
  }

  // 4. Grant access to protected route
  req.user = currentUser;
  next();
});