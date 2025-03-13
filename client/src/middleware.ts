import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth");
  console.log(authCookie?.value);

  // For unauthenticated users, redirect to /sign-in, but ONLY if they're not already going there
  if (!authCookie?.value && !request.nextUrl.pathname.startsWith("/sign-in")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // For authenticated users trying to access /sign-in, redirect them to home
  if (authCookie?.value && request.nextUrl.pathname.startsWith("/sign-in")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
