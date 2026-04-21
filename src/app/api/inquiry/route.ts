import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { generateOfferNumber, buildOfferEmailHtml, getVariantProducts, isEducationalInstitution } from "@/lib/offer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const inquiry = await prisma.inquiry.create({
      data: {
        name: body.name || null,
        org: body.org || null,
        email: body.email,
        phone: body.phone || null,
        voivodeship: body.voivodeship || null,
        variant: body.variant || null,
        notes: body.notes || null,
        rfq: body.rfq || false,
      },
    });

    // Powiadomienie email
    const notifyEmail = process.env.NOTIFY_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;
    if (notifyEmail && apiKey) {
      const resend = new Resend(apiKey);
      try {
        await resend.emails.send({
          from: "EZD RP Zapytania <zapytania@ezdrp24.com.pl>",
          to: notifyEmail,
          subject: `Nowe zapytanie EZD RP — ${body.name || body.email}${body.rfq ? " [RFQ]" : ""}`,
          html: `
            <h2>Nowe zapytanie ofertowe</h2>
            <table style="border-collapse:collapse;width:100%;max-width:500px;">
              <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Imię i nazwisko</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">${body.name || "—"}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Instytucja</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">${body.org || "—"}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${body.email}">${body.email}</a></td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Telefon</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="tel:${body.phone || ""}">${body.phone || "—"}</a></td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Województwo</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.voivodeship || "—"}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Wariant</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">${body.variant || "—"}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">RFQ</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.rfq ? "✅ Tak" : "Nie"}</td></tr>
              ${body.notes ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Uwagi</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.notes}</td></tr>` : ""}
            </table>
            <p style="margin-top:16px;color:#999;font-size:12px;">
              <a href="https://ezdrp24.com.pl/admin">Otwórz panel administracyjny</a>
            </p>
          `,
        });
      } catch (emailErr) {
        console.error("Email send error:", emailErr);
      }

      // Auto-wysyłka oferty do klienta jeśli wybrał wariant
      if (body.variant && getVariantProducts(body.variant) && body.email) {
        try {
          const offerNumber = generateOfferNumber();
          const offerLink = `https://ezdrp24.com.pl/api/offer/${inquiry.id}`;

          const isEdu = body.org ? isEducationalInstitution(body.org) : false;

          const emailHtml = buildOfferEmailHtml({
            offerNumber,
            clientName: body.name || "",
            clientOrg: body.org || "",
            variant: body.variant,
            offerLink,
            isEdu,
          });

          if (emailHtml) {
            await resend.emails.send({
              from: "EZD RP Oferty <oferty@ezdrp24.com.pl>",
              to: body.email,
              subject: `Oferta ${offerNumber} — Zestaw EZD RP ${body.variant} — ezdrp24.com.pl`,
              html: emailHtml,
            });
          }
        } catch (offerErr) {
          console.error("Offer email error:", offerErr);
        }
      }
    }

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch (err) {
    console.error("Inquiry POST error:", err);
    return NextResponse.json({ success: false, error: "Błąd zapisu" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(inquiries);
  } catch {
    return NextResponse.json({ error: "Błąd odczytu" }, { status: 500 });
  }
}
