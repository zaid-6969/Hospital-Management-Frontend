import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  let { user } = useSelector((state) => state.auth);

  if (!user) {
    user = JSON.parse(localStorage.getItem("user"));
  }

  if (!user) return <Navigate to="/" />;

  if (role && user.role !== role) return <Navigate to="/" />;


  return children;
};

export default ProtectedRoute;