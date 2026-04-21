import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: true,
      user: {
        select: {
          organizationName: true,
          contactPerson: true,
          email: true,
          phone: true,
          nip: true,
        },
      },
    },
  });

  return NextResponse.json(orders);
}
