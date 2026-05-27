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

  try {
    const { id } = await params;
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order?.furgonetkaPackageId) {
      return NextResponse.json({ error: "No shipment for this order" }, { status: 404 });
    }

    const label = await getPackageLabel(order.furgonetkaPackageId);

    // Wariant A: Furgonetka zwróciła JSON z presigned URL lub base64 content.
    if (label.isJson) {
      const json = JSON.parse(label.body.toString("utf-8")) as {
        data?: { url?: string; content?: string };
        url?: string;
        content?: string;
      };
      const unwrapped = json.data || json;
      if (unwrapped.url) {
        return NextResponse.redirect(unwrapped.url);
      }
      if (unwrapped.content) {
        const pdf = Buffer.from(unwrapped.content, "base64");
        return new NextResponse(new Uint8Array(pdf), {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename="list-przewozowy-${order.orderNumber}.pdf"`,
          },
        });
      }
      return NextResponse.json({ error: "Label not available yet" }, { status: 503 });
    }

    // Wariant B: Furgonetka zwróciła PDF bezpośrednio.
    return new NextResponse(new Uint8Array(label.body), {
      headers: {
        "Content-Type": label.contentType,
        "Content-Disposition": `inline; filename="list-przewozowy-${order.orderNumber}.pdf"`,
      },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Nieznany błąd";
    console.error("Shipment label error:", e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
