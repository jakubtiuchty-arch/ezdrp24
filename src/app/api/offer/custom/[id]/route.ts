import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { buildOfferPdfHtml, type OfferItem } from "@/lib/offer";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const offer = await prisma.customOffer.findUnique({ where: { id } });
  if (!offer) {
    return new NextResponse("Oferta nie znaleziona", { status: 404 });
  }

  let items: OfferItem[];
  try {
    items = JSON.parse(offer.items);
  } catch {
    return new NextResponse("Błąd danych oferty", { status: 500 });
  }

  const html = buildOfferPdfHtml({
    offerNumber: offer.offerNumber,
    clientName: offer.clientName || "",
    clientOrg: offer.clientOrg || "",
    clientEmail: offer.clientEmail || "",
    clientPhone: offer.clientPhone || undefined,
    items,
    notes: offer.notes || undefined,
    isEdu: offer.isEdu,
    includeGratis: offer.includeGratis,
  });

  if (!html) {
    return new NextResponse("Brak pozycji w ofercie", { status: 400 });
  }

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
