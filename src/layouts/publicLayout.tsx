import { Outlet } from "react-router";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function PublicLayout() {
  return (
    <div className="flex items-center flex-col justify-between text-sm text-gray-800 text-center h-[785px]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
