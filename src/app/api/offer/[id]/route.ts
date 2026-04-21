import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { generateOfferNumber, buildOfferPdfHtml } from "@/lib/offer";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const inquiry = await prisma.inquiry.findUnique({ where: { id } });
  if (!inquiry || !inquiry.variant) {
    return new NextResponse("Oferta nie znaleziona", { status: 404 });
  }

  const offerNumber = generateOfferNumber();

  const html = buildOfferPdfHtml({
    offerNumber,
    clientName: inquiry.name || "",
    clientOrg: inquiry.org || "",
    clientEmail: inquiry.email,
    clientPhone: inquiry.phone || undefined,
    variant: inquiry.variant,
    notes: inquiry.notes || undefined,
  });

  if (!html) {
    return new NextResponse("Nieznany wariant", { status: 400 });
  }

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
