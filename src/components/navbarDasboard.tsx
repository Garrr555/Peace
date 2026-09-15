import { Menu } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function NavbarDasboard({ isOpen, setIsOpen }: NavbarProps) {
  const { removeTokenData } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeTokenData();
    toast.success("Logout Berhasil");
    navigate("/");
  };

  return (
    <header className="flex h-16 items-center justify-between shadow-xl bg-slate-50 px-6 ">
      <div className="flex items-center gap-4">
        <button
          className="rounded-lg p-2 hover:bg-slate-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu />
        </button>
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleLogout()}
          className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-3xl cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default NavbarDasboard;
