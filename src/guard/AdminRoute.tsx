import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/auth.store";

const AdminRoute = () => {
  const { user } = useAuthStore();

  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
