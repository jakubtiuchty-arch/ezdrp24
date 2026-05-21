import { NextRequest } from "next/server";

export function isAdmin(req: NextRequest): boolean {
  const token = req.cookies.get("admin_token")?.value;
  return Boolean(token && token === process.env.ADMIN_PASSWORD);
}
