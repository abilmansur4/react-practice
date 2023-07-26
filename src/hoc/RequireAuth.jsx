import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();

  if (!auth.accessToken) {
    return <Navigate to="/login"  />;
  }

  return children;
};

export { RequireAuth };
