"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarStore {
  openSidebar: boolean;
  toggleSidebar: (value: boolean) => void;
}

export const _useSidebarStore = create<SidebarStore>()(
  persist(
    (set, get) => ({
      openSidebar: false,
      toggleSidebar: (value) => {
        set({ openSidebar: value });
      },
    }),
    {
      name: "zentio-sidebar",
    },
  ),
);

export const handleToggleSidebar = _useSidebarStore.getState().toggleSidebar;
