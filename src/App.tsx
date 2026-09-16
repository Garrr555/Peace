import { Route, Routes } from "react-router";
import PublicLayout from "./layouts/publicLayout";
import HomeView from "./pages/homeView";
import EventView from "./pages/eventView";
import LoginView from "./pages/loginView";
import RegisterView from "./pages/registerView";
import DashboardView from "./pages/dashboardView";
import DasboardLayout from "./layouts/dashboardLayout";
import DetailPage from "./pages/detailPage";
import ProtectedRoute from "./guard/ProtectedRoute";
import PublicRoute from "./guard/PublicRoute";
import DashboardEvent from "./pages/dashboardEvent";
import CreateEvent from "./pages/dashboard/createEvent";
import UpdateEvent from "./pages/dashboard/updateEvent";
import AllDashboardEvent from "./pages/allDashboardEvent";
import DashboardUsers from "./pages/dashboardUsers";
import AdminRoute from "./guard/AdminRoute";
import DetailUserPage from "./pages/detailUserPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomeView />} />
          <Route path="/event" element={<EventView />} />
        </Route>
        {/* Public */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
        </Route>
        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DasboardLayout />}>
            <Route index element={<DashboardView />} />
            {/* Admin Only */}{" "}
            <Route element={<AdminRoute />}>
              <Route path="users" element={<DashboardUsers />} />
            </Route>
            <Route path="event" element={<DashboardEvent />} />
            <Route path="all" element={<AllDashboardEvent />} />
            <Route path="event/create" element={<CreateEvent />} />
            <Route path="event/edit/:id" element={<UpdateEvent />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/user/:id" element={<DetailUserPage />} />
          </Route>
          <Route path="/event/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
