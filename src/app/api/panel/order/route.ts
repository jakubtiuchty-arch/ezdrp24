import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function generateOrderNumber() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ZAM/${date}/${rand}`;
}

export async function POST(req: NextRequest) {
  const userId = req.cookies.get("panel_user")?.value;
  if (!userId) {
    return NextResponse.json({ error: "Nie zalogowano" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: "Użytkownik nie znaleziony" }, { status: 404 });
  }

  const { items, notes, delivery } = await req.json();

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Koszyk jest pusty" }, { status: 400 });
  }

  const orderNumber = generateOrderNumber();

  const order = await prisma.order.create({
    data: {
      orderNumber,
      status: "PENDING",
      notes: notes || null,
      deliveryStreet: delivery?.street || user.street,
      deliveryPostalCode: delivery?.postalCode || user.postalCode,
      deliveryCity: delivery?.city || user.city,
      userId: user.id,
      items: {
        create: items.map((item: { id: string; name: string; quantity: number; price: number }) => ({
          productId: item.id,
          productSku: item.id,
          productName: item.name,
          quantity: item.quantity,
          unit: "szt.",
          unitPrice: item.price,
        })),
      },
    },
    include: { items: true },
  });

  const total = order.items.reduce((sum, i) => sum + (i.unitPrice || 0) * i.quantity, 0);

  const itemsHtml = order.items.map(i =>
    `<tr>
      <td style="padding:12px 16px;border-bottom:1px solid #f1f5f9;color:#334155;font-size:14px;">${i.productName}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #f1f5f9;text-align:center;color:#334155;font-size:14px;">${i.quantity}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #f1f5f9;text-align:right;color:#334155;font-size:14px;">${((i.unitPrice || 0) * i.quantity).toFixed(2)} zł</td>
    </tr>`
  ).join("");

  const vatTotal = (total * 0.23).toFixed(2);
  const grossTotal = (total * 1.23).toFixed(2);

  const wrapper = (content: string) => `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      <div style="max-width:600px;margin:0 auto;padding:24px;">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#7c3aed,#6d28d9);border-radius:12px 12px 0 0;padding:32px;text-align:center;">
          <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.3px;">EZD RP</h1>
          <p style="margin:4px 0 0;color:#c4b5fd;font-size:13px;">ezdrp24.com.pl</p>
        </div>
        <!-- Content -->
        <div style="background:#ffffff;padding:32px;border:1px solid #e2e8f0;border-top:none;">
          ${content}
        </div>
        <!-- Footer -->
        <div style="background:#f8fafc;border-radius:0 0 12px 12px;padding:24px 32px;border:1px solid #e2e8f0;border-top:none;text-align:center;">
          <p style="margin:0;color:#94a3b8;font-size:12px;">Scanter Sp. z o.o. | ul. Poświęcka 1a, 51-128 Wrocław</p>
          <p style="margin:4px 0 0;color:#94a3b8;font-size:12px;">
            <a href="mailto:biuro@scanter.pl" style="color:#7c3aed;text-decoration:none;">biuro@scanter.pl</a> &middot;
            <a href="tel:+48601828711" style="color:#7c3aed;text-decoration:none;">+48 601 828 711</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const orderTable = `
    <table style="width:100%;border-collapse:collapse;margin:24px 0;">
      <thead>
        <tr style="background:#f8fafc;">
          <th style="padding:10px 16px;text-align:left;font-size:12px;text-transform:uppercase;color:#64748b;letter-spacing:0.5px;border-bottom:2px solid #e2e8f0;">Produkt</th>
          <th style="padding:10px 16px;text-align:center;font-size:12px;text-transform:uppercase;color:#64748b;letter-spacing:0.5px;border-bottom:2px solid #e2e8f0;">Ilość</th>
          <th style="padding:10px 16px;text-align:right;font-size:12px;text-transform:uppercase;color:#64748b;letter-spacing:0.5px;border-bottom:2px solid #e2e8f0;">Wartość</th>
        </tr>
      </thead>
      <tbody>${itemsHtml}</tbody>
    </table>
    <table style="width:100%;border-collapse:collapse;background:#f8fafc;border-radius:8px;">
      <tr><td style="padding:8px 16px;font-size:13px;color:#64748b;">Netto:</td><td style="padding:8px 16px;text-align:right;font-size:13px;color:#334155;">${total.toFixed(2)} zł</td></tr>
      <tr><td style="padding:8px 16px;font-size:13px;color:#64748b;">VAT 23%:</td><td style="padding:8px 16px;text-align:right;font-size:13px;color:#334155;">${vatTotal} zł</td></tr>
      <tr><td style="padding:10px 16px;font-size:15px;font-weight:700;color:#0f172a;border-top:2px solid #e2e8f0;">Do zapłaty brutto:</td><td style="padding:10px 16px;text-align:right;font-size:15px;font-weight:700;color:#0f172a;border-top:2px solid #e2e8f0;">${grossTotal} zł</td></tr>
    </table>
  `;

  const clientInfo = `
    <div style="background:#f8fafc;border-radius:8px;padding:16px;margin:20px 0;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:4px 0;color:#64748b;font-size:13px;width:100px;">Klient:</td><td style="padding:4px 0;color:#0f172a;font-size:13px;font-weight:600;">${user.organizationName}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;font-size:13px;">Osoba:</td><td style="padding:4px 0;color:#334155;font-size:13px;">${user.contactPerson || "—"}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;font-size:13px;">NIP:</td><td style="padding:4px 0;color:#334155;font-size:13px;">${user.nip || "—"}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;font-size:13px;">Adres:</td><td style="padding:4px 0;color:#334155;font-size:13px;">${[user.street, user.postalCode, user.city].filter(Boolean).join(", ") || "—"}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;font-size:13px;">Tel:</td><td style="padding:4px 0;color:#334155;font-size:13px;">${user.phone || "—"}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b;font-size:13px;">Email:</td><td style="padding:4px 0;color:#334155;font-size:13px;"><a href="mailto:${user.email}" style="color:#7c3aed;">${user.email}</a></td></tr>
      </table>
    </div>
  `;

  const adminEmailHtml = wrapper(`
    <div style="text-align:center;margin-bottom:24px;">
      <div style="display:inline-block;background:#fef3c7;color:#92400e;font-size:12px;font-weight:600;padding:4px 12px;border-radius:999px;text-transform:uppercase;letter-spacing:0.5px;">Nowe zamówienie</div>
    </div>
    <h2 style="margin:0 0 4px;color:#0f172a;font-size:22px;text-align:center;">${orderNumber}</h2>
    <p style="margin:0 0 20px;color:#64748b;font-size:13px;text-align:center;">${new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
    ${clientInfo}
    ${orderTable}
    ${notes ? `<div style="margin-top:16px;padding:12px 16px;background:#eff6ff;border-radius:8px;font-size:13px;color:#1e40af;"><strong>Uwagi:</strong> ${notes}</div>` : ""}
  `);

  const clientEmailHtml = wrapper(`
    <h2 style="margin:0 0 8px;color:#0f172a;font-size:22px;">Dziękujemy za zamówienie!</h2>
    <p style="margin:0 0 4px;color:#64748b;font-size:14px;">Numer zamówienia: <strong style="color:#0f172a;">${orderNumber}</strong></p>
    <p style="margin:0 0 24px;color:#64748b;font-size:14px;">${new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}</p>
    ${orderTable}
    ${notes ? `<div style="margin-bottom:16px;padding:12px 16px;background:#f8fafc;border-radius:8px;font-size:13px;color:#334155;"><strong>Uwagi:</strong> ${notes}</div>` : ""}
    <div style="background:#f0fdf4;border-radius:8px;padding:16px;margin:24px 0;">
      <p style="margin:0 0 8px;color:#166534;font-size:14px;font-weight:600;">Co dalej?</p>
      <ul style="margin:0;padding:0 0 0 18px;color:#166534;font-size:13px;line-height:1.8;">
        <li>Przystępujemy do realizacji zamówienia</li>
        <li>Faktura VAT zostanie wystawiona w KSeF</li>
        <li>O wysyłce poinformujemy emailem</li>
      </ul>
    </div>
    <div style="text-align:center;margin-top:24px;">
      <a href="https://ezdrp24.com.pl/panel/zamowienia" style="display:inline-block;background:#7c3aed;color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Zobacz zamówienie w panelu</a>
    </div>
  `);

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const resend = new Resend(apiKey);

    try {
      await Promise.all([
        resend.emails.send({
          from: "EZD RP Zamówienia <zamowienia@ezdrp24.com.pl>",
          to: process.env.NOTIFY_EMAIL || "biuro@scanter.pl",
          subject: `Nowe zamówienie ${orderNumber} — ${user.organizationName} — ${grossTotal} zł`,
          html: adminEmailHtml,
        }),
        resend.emails.send({
          from: "EZD RP Zamówienia <zamowienia@ezdrp24.com.pl>",
          to: user.email,
          subject: `Potwierdzenie zamówienia ${orderNumber} — ezdrp24.com.pl`,
          html: clientEmailHtml,
        }),
      ]);
    } catch (e) {
      console.error("Email send error:", e);
    }
  }

  return NextResponse.json({ success: true, orderNumber });
}
