import { useState } from "react";
import SideBarDashboard from "../components/sideBarDashboard";
import NavbarDasboard from "../components/navbarDasboard";
import { Outlet } from "react-router";

export default function DasboardLayout() {

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <SideBarDashboard isOpen={isOpen} />
      <div className="flex flex-1 flex-col">
        <NavbarDasboard isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
