import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  let { user } = useSelector((state) => state.auth);

  // ✅ SAFE sessionStorage read
  if (!user) {
    try {
      user = JSON.parse(sessionStorage.getItem("user"));
    } catch {
      user = null;
    }
  }

  // ✅ Already logged in → redirect
  if (user) {
    if (user.role === "ADMIN") return <Navigate to="/admin" replace />;
    if (user.role === "DOCTOR") return <Navigate to="/doctor" replace />;
    if (user.role === "RECEPTIONIST") return <Navigate to="/reception" replace />;
    if (user.role === "PATIENT") return <Navigate to="/user" replace />;
  }

  return children;
};

export default PublicRoute;