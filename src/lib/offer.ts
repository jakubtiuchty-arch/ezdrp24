// Produkty i ceny
const PRODUCTS: Record<string, { name: string; description: string; price: number }> = {
  "DS2208": { name: "Zebra DS2208", description: "Czytnik kodów kreskowych 1D/2D, przewodowy USB, Plug & Play", price: 449_00 },
  "DS2278": { name: "Zebra DS2278", description: "Czytnik kodów kreskowych 1D/2D, bezprzewodowy Bluetooth, zasięg 10m", price: 999_00 },
  "ZD230t": { name: "Zebra ZD230t", description: "Drukarka etykiet termotransferowa, 203 dpi, USB", price: 1101_00 },
  "ZD421t": { name: "Zebra ZD421t", description: "Drukarka etykiet termotransferowa premium, cartridge, 203/300 dpi", price: 1850_00 },
  "DS-730DN": { name: "Epson DS-730DN", description: "Skaner dokumentów 40 str./min, duplex, OCR, PDF/A, Ethernet", price: 1649_00 },
  "DS-790Wn": { name: "Epson DS-790Wn", description: "Skaner dokumentów 45 str./min, ekran dotykowy, Wi-Fi, DocuScan", price: 2750_00 },
};

const VARIANTS: Record<string, string[]> = {
  "Mini": ["DS2208", "ZD421t"],
  "Standard": ["DS2208", "ZD230t", "DS-730DN"],
  "Plus": ["DS2208", "ZD421t", "DS-730DN"],
  "Pro": ["DS2278", "ZD421t", "DS-790Wn"],
};

function formatPrice(grosze: number): string {
  return (grosze / 100).toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function generateOfferNumber(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `OFR-${date}-${rand}`;
}

export function getVariantProducts(variant: string) {
  const skus = VARIANTS[variant];
  if (!skus) return null;
  return skus.map((sku) => ({ sku, ...PRODUCTS[sku] }));
}

export function buildOfferEmailHtml(opts: {
  offerNumber: string;
  clientName: string;
  clientOrg: string;
  clientEmail: string;
  clientPhone?: string;
  variant: string;
  notes?: string;
}) {
  const products = getVariantProducts(opts.variant);
  if (!products) return null;

  const subtotalNetto = products.reduce((s, p) => s + p.price, 0);
  const vatAmount = Math.round(subtotalNetto * 0.23);
  const totalBrutto = subtotalNetto + vatAmount;

  const today = new Date();
  const validUntil = new Date(today);
  validUntil.setDate(validUntil.getDate() + 14);

  const itemsRows = products
    .map((p, i) => {
      const brutto = Math.round(p.price * 1.23);
      return `
      <tr>
        <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:center;">${i + 1}</td>
        <td style="padding:12px;border-bottom:1px solid #e5e7eb;">
          <div style="font-weight:600;color:#1e1b4b;">${escapeHtml(p.name)}</div>
          <div style="font-size:10px;color:#64748b;margin-top:4px;">${escapeHtml(p.description)}</div>
        </td>
        <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:center;">1 szt.</td>
        <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:bold;">${formatPrice(p.price)} zł</td>
        <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:center;">23%</td>
        <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:bold;">${formatPrice(brutto)} zł</td>
      </tr>`;
    })
    .join("");

  return `
<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8"><title>Oferta ${opts.offerNumber}</title></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:650px;margin:0 auto;padding:24px;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#7c3aed,#6d28d9);border-radius:12px 12px 0 0;padding:24px 32px;display:flex;justify-content:space-between;align-items:center;">
      <div>
        <div style="color:#ffffff;font-size:20px;font-weight:700;">Scanter</div>
        <div style="color:#c4b5fd;font-size:11px;">ezdrp24.com.pl</div>
      </div>
      <div style="text-align:right;">
        <div style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:2px;">OFERTA</div>
        <div style="color:#c4b5fd;font-size:11px;">Nr: ${opts.offerNumber}</div>
      </div>
    </div>

    <!-- Content -->
    <div style="background:#ffffff;padding:32px;border:1px solid #e2e8f0;border-top:none;">

      <!-- Parties -->
      <table style="width:100%;margin-bottom:24px;">
        <tr>
          <td style="width:50%;vertical-align:top;padding-right:16px;">
            <div style="font-size:10px;color:#7c3aed;text-transform:uppercase;letter-spacing:1px;font-weight:bold;margin-bottom:8px;border-bottom:1px solid #e5e7eb;padding-bottom:5px;">Sprzedawca</div>
            <div style="font-weight:bold;font-size:13px;margin-bottom:4px;">Scanter Sp. z o.o.</div>
            <div style="font-size:11px;color:#444;margin-bottom:2px;">ul. Poświęcka 1a</div>
            <div style="font-size:11px;color:#444;margin-bottom:2px;">51-128 Wrocław</div>
            <div style="font-size:11px;color:#444;margin-bottom:2px;">NIP: 8952040169</div>
            <div style="font-size:11px;color:#444;margin-bottom:2px;">Email: biuro@scanter.pl</div>
            <div style="font-size:11px;color:#444;">Tel: +48 601 828 711</div>
          </td>
          <td style="width:50%;vertical-align:top;padding-left:16px;">
            <div style="font-size:10px;color:#7c3aed;text-transform:uppercase;letter-spacing:1px;font-weight:bold;margin-bottom:8px;border-bottom:1px solid #e5e7eb;padding-bottom:5px;">Nabywca</div>
            <div style="font-weight:bold;font-size:13px;margin-bottom:4px;">${escapeHtml(opts.clientOrg)}</div>
            <div style="font-size:11px;color:#444;margin-bottom:2px;">${escapeHtml(opts.clientName)}</div>
            <div style="font-size:11px;color:#444;margin-bottom:2px;">Email: ${escapeHtml(opts.clientEmail)}</div>
            ${opts.clientPhone ? `<div style="font-size:11px;color:#444;">Tel: ${escapeHtml(opts.clientPhone)}</div>` : ""}
          </td>
        </tr>
      </table>

      <!-- Dates -->
      <table style="width:100%;margin-bottom:24px;background:#f8fafc;border-radius:6px;border:1px solid #e2e8f0;">
        <tr>
          <td style="padding:12px;text-align:center;">
            <div style="font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Data wystawienia</div>
            <div style="font-weight:bold;font-size:13px;margin-top:3px;">${today.toLocaleDateString("pl-PL")}</div>
          </td>
          <td style="padding:12px;text-align:center;">
            <div style="font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Ważna do</div>
            <div style="font-weight:bold;font-size:13px;margin-top:3px;">${validUntil.toLocaleDateString("pl-PL")}</div>
          </td>
          <td style="padding:12px;text-align:center;">
            <div style="font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Nr oferty</div>
            <div style="font-weight:bold;font-size:13px;margin-top:3px;">${opts.offerNumber}</div>
          </td>
        </tr>
      </table>

      <!-- Wariant -->
      <div style="margin-bottom:16px;font-size:13px;color:#334155;">
        Zestaw: <strong style="color:#7c3aed;">EZD RP ${escapeHtml(opts.variant)}</strong>
      </div>

      <!-- Items -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <thead>
          <tr>
            <th style="background:linear-gradient(135deg,#7c3aed,#6d28d9);color:white;padding:10px 12px;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:0.5px;width:35px;">Lp.</th>
            <th style="background:linear-gradient(135deg,#7c3aed,#6d28d9);color:white;padding:10px 12px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.5px;">Nazwa produktu</th>
            <th style="background:linear-gradient(135deg,#7c3aed,#6d28d9);color:white;padding:10px 12px;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:0.5px;width:60px;">Ilość</th>
            <th style="background:linear-gradient(135deg,#7c3aed,#6d28d9);color:white;padding:10px 12px;text-align:right;font-size:10px;text-transform:uppercase;letter-spacing:0.5px;width:95px;">Cena netto</th>
            <th style="background:linear-gradient(135deg,#7c3aed,#6d28d9);color:white;padding:10px 12px;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:0.5px;width:50px;">VAT</th>
            <th style="background:linear-gradient(135deg,#7c3aed,#6d28d9);color:white;padding:10px 12px;text-align:right;font-size:10px;text-transform:uppercase;letter-spacing:0.5px;width:95px;">Brutto</th>
          </tr>
        </thead>
        <tbody>${itemsRows}</tbody>
      </table>

      <!-- Summary -->
      <table style="width:100%;margin-bottom:24px;">
        <tr><td></td>
          <td style="width:260px;">
            <div style="background:#f8fafc;padding:15px;border-radius:6px;border:1px solid #e2e8f0;">
              <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:11px;">
                <span style="color:#64748b;">Wartość netto:</span>
                <span>${formatPrice(subtotalNetto)} zł</span>
              </div>
              <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:11px;">
                <span style="color:#64748b;">VAT 23%:</span>
                <span>${formatPrice(vatAmount)} zł</span>
              </div>
              <div style="font-size:16px;font-weight:bold;color:#7c3aed;border-top:2px solid #7c3aed;padding-top:10px;margin-top:10px;display:flex;justify-content:space-between;">
                <span>Razem brutto:</span>
                <span>${formatPrice(totalBrutto)} zł</span>
              </div>
            </div>
          </td>
        </tr>
      </table>

      <!-- Gratis -->
      <div style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);padding:12px 15px;border-radius:6px;margin-bottom:20px;border:1px solid #86efac;font-size:11px;">
        <strong style="color:#166534;">Gratis do zestawu:</strong> 2 rolki etykiet 50×30 mm + 2 taśmy termotransferowe 110mm×74m (wartość ponad 100 zł netto)
      </div>

      <!-- Conditions -->
      <div style="background:#f8fafc;padding:15px;border-radius:6px;margin-bottom:24px;border:1px solid #e2e8f0;">
        <div style="font-weight:bold;color:#1e1b4b;margin-bottom:10px;font-size:12px;">Warunki oferty</div>
        <table style="width:100%;font-size:11px;">
          <tr><td style="width:140px;color:#64748b;padding:3px 0;">Ważność oferty:</td><td style="font-weight:600;">do ${validUntil.toLocaleDateString("pl-PL")}</td></tr>
          <tr><td style="color:#64748b;padding:3px 0;">Warunki płatności:</td><td style="font-weight:600;">Przelew 14 dni</td></tr>
          <tr><td style="color:#64748b;padding:3px 0;">Termin dostawy:</td><td style="font-weight:600;">2-5 dni roboczych</td></tr>
        </table>
      </div>

      ${opts.notes ? `
      <div style="background:#fffbeb;padding:12px 15px;border-radius:6px;margin-bottom:20px;border:1px solid #fde68a;font-size:11px;">
        <strong style="color:#92400e;">Uwagi klienta:</strong> ${escapeHtml(opts.notes)}
      </div>` : ""}
    </div>

    <!-- Footer -->
    <div style="background:#f8fafc;border-radius:0 0 12px 12px;padding:16px 32px;border:1px solid #e2e8f0;border-top:none;text-align:center;">
      <p style="margin:0;color:#94a3b8;font-size:10px;">Dokument wygenerowany automatycznie przez system ezdrp24.com.pl</p>
      <p style="margin:4px 0 0;color:#94a3b8;font-size:10px;">Scanter Sp. z o.o. | ul. Poświęcka 1a, 51-128 Wrocław | <a href="mailto:biuro@scanter.pl" style="color:#7c3aed;">biuro@scanter.pl</a> | +48 601 828 711</p>
    </div>
  </div>
</body>
</html>`;
}
