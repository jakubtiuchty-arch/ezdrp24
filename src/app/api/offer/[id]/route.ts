import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { generateOfferNumber, buildOfferEmailHtml } from "@/lib/offer";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const inquiry = await prisma.inquiry.findUnique({ where: { id } });
  if (!inquiry || !inquiry.variant) {
    return new NextResponse("Oferta nie znaleziona", { status: 404 });
  }

  const offerNumber = generateOfferNumber();

  const html = buildOfferEmailHtml({
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

  // Wrap w print-ready page
  const printHtml = `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Oferta ${offerNumber} — EZD RP</title>
  <style>
    @media print {
      .no-print { display: none !important; }
      body { padding: 0; margin: 0; background: white; }
    }
    @page { size: A4; margin: 10mm; }
    body { margin: 0; padding: 0; background: #f8fafc; }
  </style>
</head>
<body>
  <div class="no-print" style="background:#7c3aed;color:white;padding:15px 20px;margin-bottom:20px;border-radius:8px;max-width:650px;margin:20px auto;display:flex;justify-content:space-between;align-items:center;">
    <div><strong>Oferta ${offerNumber}</strong> — Kliknij aby zapisać jako PDF</div>
    <button onclick="window.print()" style="background:white;color:#7c3aed;border:none;padding:10px 25px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:14px;">Zapisz PDF</button>
  </div>
  ${html}
  <script>
    // Auto-print on mobile (optional)
  </script>
</body>
</html>`;

  return new NextResponse(printHtml, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
