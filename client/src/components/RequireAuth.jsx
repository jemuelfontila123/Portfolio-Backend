import { Navigate } from "react-router-dom";
import { isAuthenticated, clearAuth } from "../api.js";

// Wrap any page that needs a valid JWT.
export default function RequireAuth({ children }) {
  if (!isAuthenticated()) {
    clearAuth(); // remove a missing/expired token
    return <Navigate to="/signin" replace />;
  }
  return children;
}
