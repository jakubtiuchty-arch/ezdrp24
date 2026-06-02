import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { generateOfferNumber, type OfferItem } from "@/lib/offer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const rawItems: unknown[] = Array.isArray(body.items) ? body.items : [];
    const items: OfferItem[] = rawItems
      .map((it) => {
        const item = it as { name?: string; qty?: number; unitPrice?: number };
        const name = (item.name || "").trim();
        const qty = Math.round(Number(item.qty));
        const unitPrice = Math.round(Number(item.unitPrice));
        return { name, qty, unitPrice };
      })
      .filter((it) => it.name && it.qty > 0 && it.unitPrice >= 0);

    if (items.length === 0) {
      return NextResponse.json({ error: "Dodaj co najmniej jedną pozycję" }, { status: 400 });
    }

    const offer = await prisma.customOffer.create({
      data: {
        offerNumber: generateOfferNumber(),
        clientOrg: body.clientOrg?.trim() || null,
        clientName: body.clientName?.trim() || null,
        clientEmail: body.clientEmail?.trim() || null,
        clientPhone: body.clientPhone?.trim() || null,
        notes: body.notes?.trim() || null,
        isEdu: !!body.isEdu,
        includeGratis: body.includeGratis !== false,
        items: JSON.stringify(items),
      },
    });

    return NextResponse.json({ success: true, id: offer.id, offerNumber: offer.offerNumber });
  } catch (err) {
    console.error("Custom offer create error:", err);
    return NextResponse.json({ error: "Błąd zapisu oferty" }, { status: 500 });
  }
}
