import { useAuthStore } from "../store/auth.store";

function DashboardView() {
  const { user } = useAuthStore();
  console.log(user);
  return (
    <div>
      <div>{user?.name}</div>
      <div>{user?.email}</div>
    </div>
  );
}

export default DashboardView;
