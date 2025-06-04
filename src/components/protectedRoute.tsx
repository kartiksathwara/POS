import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useEffect, type ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}
const ProtectedRoute = ({ children }:ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
   const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);


  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
