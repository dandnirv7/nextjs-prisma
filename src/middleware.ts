import { getSession } from "@/lib/auth/session";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  const publicRoutes = [
    "/login",
    "/register",
    "/api/auth/login",
    "/api/auth/register",
  ];

  if (publicRoutes.includes(pathname)) {
    if (session.isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard/overview", request.url));
    }
    return NextResponse.next();
  }

  const protectedRoutes = ["/dashboard/overview"];
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!session.isLoggedIn) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard/overview", request.url));
  }

  return NextResponse.next();
}
