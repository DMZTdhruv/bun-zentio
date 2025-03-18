"use client";

import { PanelRight } from "lucide-react";
import { _useSidebarStore, handleToggleSidebar } from "~/store/sidebar";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";

export const ToggleSidebar = ({ className }: { className: string }) => {
  const openSidebar = _useSidebarStore((state) => state.openSidebar);
  const pathname = usePathname();
  if (pathname.includes("/playground")) return;
  return (
    <button
      type="button"
      onClick={() => {
        handleToggleSidebar(!openSidebar);
      }}
      className={cn(
        className,
        `z-50 cursor-pointer bg-transparent text-white hover:bg-neutral-900 ${openSidebar ? "translate-x-[40px]" : ""} `,
      )}
    >
      <PanelRight className="size-4" />
    </button>
  );
};
