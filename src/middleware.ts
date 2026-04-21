import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Admin panel
  if (path.startsWith("/admin")) {
    if (path === "/admin/login" || path.startsWith("/api/admin")) {
      return NextResponse.next();
    }
    const token = req.cookies.get("admin_token")?.value;
    if (token === process.env.ADMIN_PASSWORD) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Panel klienta
  if (path.startsWith("/panel")) {
    if (path === "/panel/login" || path === "/panel/rejestracja" || path.startsWith("/api/panel")) {
      return NextResponse.next();
    }
    const userId = req.cookies.get("panel_user")?.value;
    if (userId) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/panel/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/panel/:path*"],
};
