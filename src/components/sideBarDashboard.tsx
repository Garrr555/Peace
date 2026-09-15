import { Link, NavLink } from "react-router";

interface SidebarProps {
  isOpen: boolean;
}

const menus = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "My Event",
    path: "/dashboard/event",
  },
  {
    name: "All Event",
    path: "/dashboard/all",
  },
];

function SideBarDashboard({ isOpen }: SidebarProps) {
  return (
    <aside
      className={`shadow-xl bg-slate-50 transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}
    >
      <div className="p-6">
        {isOpen && (
          <Link to={"/"}>
            <img
              src="/picture/porsche-2.svg"
              alt=""
              width={100}
              className="flex items-center justify-center mx-auto"
            />
          </Link>
        )}
      </div>
      <nav className="space-y-2 p-4">
        {menus.map((menu, i) => (
          <NavLink
            key={i}
            to={menu.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 transition ${isActive ? "bg-blue-500 text-white font-semibold" : "hover:bg-slate-200"}`
            }
            end
          >
            {isOpen ? menu.name : menu.name.charAt(0)}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default SideBarDashboard;
