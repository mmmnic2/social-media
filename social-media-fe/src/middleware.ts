import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("sessionToken");
  const pathname = request.nextUrl.pathname;

  // Nếu không có token và pathname không bắt đầu với /login hoặc /register, redirect về /
  if (!token) {
    if (
      !pathname.startsWith("/login") &&
      !pathname.startsWith("/register") &&
      pathname !== "/"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // Nếu có token và pathname bắt đầu với /login hoặc /register, redirect về /
    if (
      (pathname.startsWith("/login") || pathname.startsWith("/register")) &&
      pathname !== "/"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
