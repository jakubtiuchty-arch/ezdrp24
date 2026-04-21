import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Resend webhook event types: email.sent, email.delivered, email.bounced, etc.
  const { type, data } = body;

  if (type === "email.delivered" && data?.email_id) {
    // Znajdź inquiry po email_id i ustaw offerDeliveredAt
    await prisma.inquiry.updateMany({
      where: { offerEmailId: data.email_id },
      data: { offerDeliveredAt: new Date() },
    });
  }

  return NextResponse.json({ received: true });
}
