import { cookies } from "next/headers";
import { prisma } from "./prisma";

export async function getPanelUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("panel_user")?.value;
  if (!userId) return null;

  return prisma.user.findUnique({
    where: { id: userId },
  });
}
