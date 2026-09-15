import React from "react";
import { Link } from "react-router";
import { useAuthStore } from "../store/auth.store";
import { LayoutDashboardIcon } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const { token } = useAuthStore();

  return (
    <nav className="fixed z-100 backdrop-blur-2xl flex items-center justify-between w-full md:px-16 lg:px-24 xl:px-32 py-4 px-4 bg-slate-200/0">
      <Link to={"/"}>
        <img src="/picture/porsche-2.svg" alt="" width={100} />
      </Link>

      {/* MENU LINKS */}
      <div
        className={`max-md:absolute max-md:bg-white/90 max-md:overflow-hidden max-md:transition-[width] max-md:duration-300 max-md:top-0 max-md:left-0 max-md:flex-col max-md:justify-center max-md:text-lg max-md:backdrop-blur flex items-center gap-8 font-medium ${menuOpen ? "max-md:w-full" : "max-md:w-0"}`}
      >
        <Link to="/">Home</Link>
        <Link to="/event">Event</Link>
        <button
          aria-label="close menu"
          className="size-6 md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {token ? (
        <Link to="/dashboard">
          <button className="cursor-pointer max-md:hidden p-4 bg-green-100 hover:bg-green-200 transition active:scale-95 rounded-full">
            <LayoutDashboardIcon />
          </button>
        </Link>
      ) : (
        <Link to="/login">
          <button className="cursor-pointer max-md:hidden px-8 py-4 bg-gradient-to-b from-transparent via-transparent to-green-100 hover:bg-green-200 transition active:scale-95 rounded-2xl">
            Login
          </button>
        </Link>
      )}

      {/* BURGER MENU */}
      <button
        aria-label="menu burger"
        className="size-6 md:hidden"
        onClick={() => setMenuOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-align-justify"
        >
          <path d="M3 12h18M3 18h18M3 6h18" />
        </svg>
      </button>
    </nav>
  );
}
