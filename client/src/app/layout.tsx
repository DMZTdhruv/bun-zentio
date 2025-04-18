import type { Metadata } from "next";
import { Suspense, useState } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { ReactQueryProvider } from "~/providers/react-query";
import { Toaster } from "sonner";
import { SideBar } from "~/components/shared/sidebar";
import { satoshiFont } from "~/components/font";
import { ScrollArea } from "~/components/ui/scroll-area";
import Wrapper from "~/components/wrapper";

export const metadata: Metadata = {
  title: "Zentio | Land Your dream tech job with ai",
  description: "Land your dream job with ai ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshiFont.variable} dark antialiased`}>
        <ReactQueryProvider>
          <div className="font-satoshi flex bg-black">
            <NuqsAdapter>
              <Suspense fallback={<div>Loading...</div>}>
                <SideBar />
                <Wrapper>
                  <ScrollArea className="max-h-screen overflow-y-auto rounded-md">
                    {children}
                  </ScrollArea>
                </Wrapper>
              </Suspense>
            </NuqsAdapter>
          </div>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
