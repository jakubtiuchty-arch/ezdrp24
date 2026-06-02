import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildOfferEmailHtml, type OfferItem } from "@/lib/offer";

export async function POST(req: Request) {
  const { id } = await req.json();

  const offer = await prisma.customOffer.findUnique({ where: { id } });
  if (!offer) {
    return NextResponse.json({ error: "Oferta nie znaleziona" }, { status: 404 });
  }
  if (!offer.clientEmail) {
    return NextResponse.json({ error: "Brak adresu e-mail klienta" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Brak klucza Resend" }, { status: 500 });
  }

  let items: OfferItem[];
  try {
    items = JSON.parse(offer.items);
  } catch {
    return NextResponse.json({ error: "Błąd danych oferty" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const offerLink = `https://www.ezdrp24.com.pl/api/offer/custom/${offer.id}`;

  const emailHtml = buildOfferEmailHtml({
    offerNumber: offer.offerNumber,
    clientName: offer.clientName || "",
    clientOrg: offer.clientOrg || "",
    items,
    offerLink,
    isEdu: offer.isEdu,
  });

  if (!emailHtml) {
    return NextResponse.json({ error: "Błąd generowania oferty" }, { status: 500 });
  }

  const { data, error } = await resend.emails.send({
    from: "EZD RP Oferty <oferty@ezdrp24.com.pl>",
    to: offer.clientEmail,
    subject: `Oferta ${offer.offerNumber} — sprzęt EZD RP — ezdrp24.com.pl`,
    html: emailHtml,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await prisma.customOffer.update({
    where: { id: offer.id },
    data: {
      offerEmailId: data?.id || null,
      offerSentAt: new Date(),
    },
  });

  return NextResponse.json({ success: true, emailId: data?.id, offerNumber: offer.offerNumber });
}
