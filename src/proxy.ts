import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getDashboard(role: string) {
  switch (role) {
    case "student": return "/student/dashboard";
    case "college": return "/college/dashboard";
    case "company": return "/company/dashboard";
    case "mentor": return "/mentor/dashboard";
    default: return "/login";
  }
}

// Public routes — always accessible
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/about",
  "/how-it-works",
  "/features",
  "/for-students",
  "/for-colleges",
  "/for-companies",
  "/pricing",
];

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;
  const role = (req.auth?.user as any)?.role;
  const isLoggedIn = !!req.auth;

  if (publicRoutes.some((r) => pathname === r || pathname.startsWith(r + "/"))) {
    if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL(getDashboard(role), req.url));
    }
    return NextResponse.next();
  }

  // Protected routes
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Role-based routing
  if (pathname.startsWith("/student") && role !== "student") {
    return NextResponse.redirect(new URL(getDashboard(role), req.url));
  }
  if (pathname.startsWith("/college") && role !== "college") {
    return NextResponse.redirect(new URL(getDashboard(role), req.url));
  }
  if (pathname.startsWith("/company") && role !== "company") {
    return NextResponse.redirect(new URL(getDashboard(role), req.url));
  }
  if (pathname.startsWith("/mentor") && role !== "mentor") {
    return NextResponse.redirect(new URL(getDashboard(role), req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
