// app/middleware.ts
import { NextRequest, NextResponse } from "next/server";

// Paths that are restricted for authenticated users
const restrictedPathsForAuth = ["/login", "/register"];

// Middleware function
export function middleware(req: NextRequest) {
  const authToken = req.cookies.get("access-token");
  const { pathname } = req.nextUrl;

  // Redirect authenticated users away from login and register pages
  if (authToken && restrictedPathsForAuth.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect non-authenticated users trying to access routes other than login and register to login page
  if (!authToken && !restrictedPathsForAuth.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow the request to proceed if none of the above conditions are met
  return NextResponse.next();
}

// Configuration for matching specific routes to apply this middleware
export const config = {
  matcher: ["/login", "/register", "/user/profile"], // Add all paths that should be handled by this middleware
};
