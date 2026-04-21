import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { generateOfferNumber, buildOfferEmailHtml, getVariantProducts } from "@/lib/offer";

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

          const offerHtml = buildOfferEmailHtml({
            offerNumber,
            clientName: body.name || "",
            clientOrg: body.org || "",
            clientEmail: body.email,
            clientPhone: body.phone,
            variant: body.variant,
            notes: body.notes,
          });

          // Zapisz numer oferty w inquiry
          await prisma.inquiry.update({
            where: { id: inquiry.id },
            data: { read: false },
          });

          if (offerHtml) {
            // Email z ładnym tekstem + oferta w treści
            const emailWrapper = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <div style="background:linear-gradient(135deg,#7c3aed,#6d28d9);border-radius:12px 12px 0 0;padding:32px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">EZD RP</h1>
      <p style="margin:4px 0 0;color:#c4b5fd;font-size:13px;">ezdrp24.com.pl</p>
    </div>
    <div style="background:#fff;padding:32px;border:1px solid #e2e8f0;border-top:none;">
      <p style="font-size:15px;color:#0f172a;margin:0 0 16px;">Dzień dobry${body.name ? `, ${body.name.split(" ")[0]}` : ""}!</p>
      <p style="font-size:14px;color:#334155;line-height:1.7;margin:0 0 12px;">
        Bardzo dziękujemy za zainteresowanie naszą ofertą sprzętu EZD RP. Cieszymy się, że możemy pomóc w wyposażeniu stanowiska pracy Państwa instytucji.
      </p>
      <p style="font-size:14px;color:#334155;line-height:1.7;margin:0 0 12px;">
        Zgodnie z Państwa zapytaniem, przygotowaliśmy ofertę na <strong style="color:#7c3aed;">zestaw EZD RP ${body.variant}</strong>. Poniżej znajdą Państwo szczegółową specyfikację wraz z cenami.
      </p>
      <p style="font-size:14px;color:#334155;line-height:1.7;margin:0 0 24px;">
        Oferta jest ważna 14 dni. W razie pytań lub potrzeby dostosowania konfiguracji — jesteśmy do dyspozycji.
      </p>
      <div style="text-align:center;margin-bottom:24px;">
        <a href="${offerLink}" style="display:inline-block;background:#7c3aed;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">Otwórz ofertę (PDF)</a>
        <p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">Kliknij aby otworzyć ofertę w przeglądarce i zapisać jako PDF</p>
      </div>
    </div>
    <div style="background:#f8fafc;border-radius:0 0 12px 12px;padding:20px 32px;border:1px solid #e2e8f0;border-top:none;">
      <p style="margin:0 0 4px;color:#334155;font-size:13px;font-weight:600;">Pozdrawiamy,</p>
      <p style="margin:0 0 4px;color:#334155;font-size:13px;">Zespół Scanter Sp. z o.o.</p>
      <p style="margin:8px 0 0;color:#94a3b8;font-size:11px;">
        <a href="mailto:biuro@scanter.pl" style="color:#7c3aed;">biuro@scanter.pl</a> · <a href="tel:+48601828711" style="color:#7c3aed;">+48 601 828 711</a> · ul. Poświęcka 1a, 51-128 Wrocław
      </p>
    </div>
  </div>
</body></html>`;

            await resend.emails.send({
              from: "EZD RP Oferty <oferty@ezdrp24.com.pl>",
              to: body.email,
              subject: `Oferta ${offerNumber} — Zestaw EZD RP ${body.variant} — ezdrp24.com.pl`,
              html: emailWrapper,
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
