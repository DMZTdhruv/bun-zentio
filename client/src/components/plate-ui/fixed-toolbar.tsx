"use client";

import { withCn } from "@udecode/cn";

import { Toolbar } from "./toolbar";

export const FixedToolbar = withCn(
  Toolbar,
  "fixed max-w-[100%] top-0 h-[50px] left-0 z-50 scrollbar-hide w-full justify-between overflow-x-auto rounded-t-lg bg-transparent text-white p-1 backdrop-blur-sm supports-backdrop-blur:bg-background/60",
);
