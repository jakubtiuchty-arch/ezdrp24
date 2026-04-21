import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();

  const existing = await prisma.user.findUnique({ where: { email: body.email } });
  if (existing) {
    return NextResponse.json({ error: "Konto z tym adresem email już istnieje. Zaloguj się." }, { status: 400 });
  }

  const hash = await bcrypt.hash(body.password, 10);

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: hash,
      organizationName: body.organizationName,
      nip: body.nip || null,
      street: body.street || null,
      postalCode: body.postalCode || null,
      city: body.city || null,
      contactPerson: `${body.firstName} ${body.lastName}`,
      phone: body.phone || null,
    },
  });

  const res = NextResponse.json({ success: true });
  res.cookies.set("panel_user", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
