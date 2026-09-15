import { create } from "zustand";
import type { UserType } from "../types/type";
import Cookies from "js-cookie";

interface AuthState {
  user: UserType | null;
  token: string | null;
  setTokenData: (user: UserType, token: string) => Promise<void>;
  removeTokenData: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user")!) || null,
  token: Cookies.get("token") || null,

  setTokenData: async (user, token) => {
    Cookies.set("token", token, {
      expires: 7,
    });
    localStorage.setItem("user", JSON.stringify(user));

    set({
      token: token,
      user: user,
    });
  },

  removeTokenData: () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    set({
      token: null,
      user: null,
    });
  },
}));
