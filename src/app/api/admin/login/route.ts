import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dni
    });
    return res;
  }

  return NextResponse.json({ success: false, error: "Nieprawidłowy login lub hasło" }, { status: 401 });
}
