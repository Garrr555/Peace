import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
  const token = Cookies.get("token");
  if (token) {
    return <Navigate to={"/dasboard"} replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
