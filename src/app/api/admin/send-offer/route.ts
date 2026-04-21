import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { generateOfferNumber, buildOfferEmailHtml, getVariantProducts, isEducationalInstitution } from "@/lib/offer";

export async function POST(req: Request) {
  const { inquiryId } = await req.json();

  const inquiry = await prisma.inquiry.findUnique({ where: { id: inquiryId } });
  if (!inquiry) {
    return NextResponse.json({ error: "Zapytanie nie znalezione" }, { status: 404 });
  }

  if (!inquiry.variant || !getVariantProducts(inquiry.variant)) {
    return NextResponse.json({ error: "Brak wariantu w zapytaniu" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Brak klucza Resend" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const offerNumber = generateOfferNumber();
  const offerLink = `https://www.ezdrp24.com.pl/api/offer/${inquiry.id}`;
  const isEdu = inquiry.org ? isEducationalInstitution(inquiry.org) : false;

  const emailHtml = buildOfferEmailHtml({
    offerNumber,
    clientName: inquiry.name || "",
    clientOrg: inquiry.org || "",
    variant: inquiry.variant,
    offerLink,
    isEdu,
  });

  if (!emailHtml) {
    return NextResponse.json({ error: "Błąd generowania oferty" }, { status: 500 });
  }

  const { data, error } = await resend.emails.send({
    from: "EZD RP Oferty <oferty@ezdrp24.com.pl>",
    to: inquiry.email,
    subject: `Oferta ${offerNumber} — Zestaw EZD RP ${inquiry.variant} — ezdrp24.com.pl`,
    html: emailHtml,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Zapisz email ID i oznacz jako wysłane
  await prisma.inquiry.update({
    where: { id: inquiryId },
    data: {
      read: true,
      offerEmailId: data?.id || null,
      offerSentAt: new Date(),
    },
  });

  return NextResponse.json({ success: true, emailId: data?.id, offerNumber });
}
