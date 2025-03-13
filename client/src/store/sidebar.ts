"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarStore {
  openSidebar: boolean;
  toggleSidebar: () => void;
}

export const _useSidebarStore = create<SidebarStore>()(
  persist(
    (set, get) => ({
      openSidebar: false,
      toggleSidebar: () => {
        console.log("toggled it", get().openSidebar);
        set({ openSidebar: !get().openSidebar });
      },
    }),
    {
      name: "zentio-sidebar",
    },
  ),
);

export const handleToggleSidebar = _useSidebarStore.getState().toggleSidebar;
