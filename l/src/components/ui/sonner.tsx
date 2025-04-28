"use client";

import type React from "react";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export function CustomToaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-black group-[.toaster]:text-white group-[.toaster]:border-none group-[.toaster]:shadow-lg",
          title: "group-[.toast]:text-white font-medium",
          description: "group-[.toast]:text-gray-300 text-sm",
          actionButton: "group-[.toast]:bg-white group-[.toast]:text-black",
          cancelButton:
            "group-[.toast]:bg-transparent group-[.toast]:text-white group-[.toast]:border-white",
          closeButton:
            "group-[.toast]:text-white group-[.toast]:opacity-70 group-[.toast]:hover:opacity-100",
          success:
            "group-[.toaster]:bg-black group-[.toaster]:text-white group-[.toaster]:border-none",
          error:
            "group-[.toaster]:bg-black group-[.toaster]:text-white group-[.toaster]:border-none",
          info: "group-[.toaster]:bg-black group-[.toaster]:text-white group-[.toaster]:border-none",
          warning:
            "group-[.toaster]:bg-black group-[.toaster]:text-white group-[.toaster]:border-none",
          loading:
            "group-[.toaster]:bg-black group-[.toaster]:text-white group-[.toaster]:border-none",
        },
      }}
      {...props}
    />
  );
}
