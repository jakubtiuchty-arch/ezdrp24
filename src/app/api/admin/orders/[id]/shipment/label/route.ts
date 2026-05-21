import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin-auth";
import { getPackageLabel } from "@/lib/furgonetka";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order?.furgonetkaPackageId) {
    return NextResponse.json({ error: "No shipment for this order" }, { status: 404 });
  }

  const label = await getPackageLabel(order.furgonetkaPackageId);

  if (label.url) {
    return NextResponse.redirect(label.url);
  }

  if (label.content) {
    const pdf = Buffer.from(label.content, "base64");
    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="list-przewozowy-${order.orderNumber}.pdf"`,
      },
    });
  }

  return NextResponse.json({ error: "Label not available yet" }, { status: 503 });
}
