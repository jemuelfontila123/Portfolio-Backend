import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, isAdmin, clearAuth } from "../api.js";

export default function RequireAdmin() {
  if (!isAuthenticated()) {
    clearAuth();
    return <Navigate to="/admin/signin" replace />;
  }
  if (!isAdmin()) return <Navigate to="/" replace />;
  return <Outlet />;
}
