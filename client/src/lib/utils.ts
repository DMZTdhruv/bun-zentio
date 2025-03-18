import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import { AuthResponse } from "~/schema/user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const verifyJsonWebToken = (data: string) => {
//   return jwt.verify(data, SECRET_KEY) as AuthResponse;
// };
