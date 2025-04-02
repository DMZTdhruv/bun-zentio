import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthedUser {
  id: string;
  username: string | null;
  name: string | null;
}

interface AuthStore {
  user: AuthedUser;
  setAuthUser: (user: AuthedUser) => void;
}

export const _useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: { id: null, username: null, name: null },
      setAuthUser: (user) => set({ user }),
    }),
    {
      name: "zentio-user",
    },
  ),
);

export const initializeUser = _useAuthStore.getState().setAuthUser;
