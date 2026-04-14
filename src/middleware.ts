import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  if (token === process.env.ADMIN_PASSWORD) {
    return NextResponse.next();
  }

  // Nie blokuj API logowania
  if (req.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/admin/login", req.url));
}

export const config = {
  matcher: ["/admin/:path*"],
};
