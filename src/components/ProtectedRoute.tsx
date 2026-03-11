import { Navigate, Outlet } from "react-router-dom";
import { getStoredToken } from "../lib/auth";

export default function ProtectedRoute() {
  const token = getStoredToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
