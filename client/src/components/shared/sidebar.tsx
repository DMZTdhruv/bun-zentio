"use client";

import { _useSidebarStore } from "~/store/sidebar";
import { ToggleSidebar } from "../dashboard/toggle-sidebar";
import { House, LucideProps, Settings, User } from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SideBar = () => {
  const sidebarState = _useSidebarStore((state) => state.openSidebar);
  const navItems = [
    { icon: House, text: "Dashboard", href: "/" },
    { icon: Settings, text: "Settings", href: "/settings" },
    { icon: User, text: "Profile", href: "/profile" },
  ];
  const pathname = usePathname();
  if (pathname === "/sign-in" || pathname === "/sign-up") return;
  return (
    <div
      className={`${sidebarState ? "w-[45px]" : "ml-0"} smooth-transition relative h-screen w-64 bg-black`}
    >
      <ToggleSidebar className="absolute top-6 right-3" />
      <p className="pt-4 pl-4 text-2xl font-semibold">
        {sidebarState ? "z" : "zentio"}
      </p>
      <div
        className={`mt-6 flex w-full flex-col ${sidebarState ? "gap-3" : "gap-2"} pl-3 text-base`}
      >
        {navItems.map((link) => {
          return (
            <Navlink
              key={link.text}
              Icon={link.icon}
              title={link.text}
              sidebarState={sidebarState}
              href={link.href}
            />
          );
        })}
      </div>
    </div>
  );
};

const Navlink = ({
  Icon,
  title,
  sidebarState,
  href,
}: {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  sidebarState: boolean;
  href: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="relative">
      <div
        className={`transition-color relative z-10 flex items-center gap-2 pl-0.5 ${
          isActive ? "text-white" : "text-neutral-500"
        } duration-75 hover:text-white`}
      >
        <Icon className="size-4" />
        {!sidebarState && <span key="nav-text">{title}</span>}
      </div>
    </Link>
  );
};
