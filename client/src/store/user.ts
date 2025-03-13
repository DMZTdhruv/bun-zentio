import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthedUser {
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
      user: { username: null, name: null },
      setAuthUser: (user) => set({ user }),
    }),
    {
      name: "zentio-user",
    },
  ),
);

export const initializeUser = _useAuthStore.getState().setAuthUser;
