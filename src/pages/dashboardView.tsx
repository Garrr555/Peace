import { useAuthStore } from "../store/auth.store";

function DashboardView() {
  const { user } = useAuthStore();
  console.log(user?.role);
  return (
    <div>
      <div>{user?.name}</div>
      <div>{user?.role}</div>
      <div>{user?.email}</div>
    </div>
  );
}

export default DashboardView;
