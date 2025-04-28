"use client";

import { usePathname } from "next/navigation";
import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const wrapperClassName =
    pathname === "/sign-in" || pathname === "sign-up"
      ? `
relative z-10 flex-1  overflow-hidden bg-[#0d0d0d] max-h-screen
`
      : `relative z-10 mr-[10px] flex-1 scale-y-[0.97] overflow-hidden rounded-xl border border-neutral-800 bg-[#0d0d0d]`;

  return <div className={wrapperClassName}>{children}</div>;
};

export default Wrapper;
