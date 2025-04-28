import localFont from "next/font/local";
import { Inter, Geist } from "next/font/google";

export const satoshiFont = localFont({
  src: "./Satoshi-Variable.ttf",
  variable: "--font-satoshi-variable",
});

export const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
