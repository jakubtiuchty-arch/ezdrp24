// Produkty i ceny (w groszach)
const PRODUCTS: Record<string, { name: string; description: string; price: number }> = {
  "DS2208": { name: "Skaner kodów kreskowych Zebra DS2208", description: "", price: 449_00 },
  "DS2278": { name: "Skaner kodów kreskowych Zebra DS2278", description: "", price: 999_00 },
  "ZD230t": { name: "Drukarka etykiet Zebra ZD230t", description: "", price: 1101_00 },
  "ZD421t": { name: "Drukarka etykiet Zebra ZD421t", description: "", price: 1850_00 },
  "DS-730DN": { name: "Skaner Epson DS-730DN", description: "", price: 1649_00 },
  "DS-790Wn": { name: "Skaner Epson DS-790Wn", description: "", price: 2750_00 },
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

const EDU_KEYWORDS = [
  "szkoła", "szkoły", "szkół", "szkolne", "szkolny",
  "przedszkole", "przedszkola",
  "żłobek", "żłobka",
  "liceum",
  "gimnazjum",
  "technikum",
  "zespół szkół", "zespołu szkół",
  "placówka oświatowa", "placówki oświatowej",
  "centrum kształcenia",
  "bursa",
  "poradnia",
  "ośrodek szkolno",
  "internat",
  "młodzieżowy dom kultury",
  "specjalny ośrodek",
];

export function isEducationalInstitution(orgName: string): boolean {
  const lower = orgName.toLowerCase();
  return EDU_KEYWORDS.some(kw => lower.includes(kw));
}

export function generateOfferNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `OFR-${year}${month}${day}-${rand}`;
}

export function getVariantProducts(variant: string) {
  const skus = VARIANTS[variant];
  if (!skus) return null;
  return skus.map((sku) => ({ sku, ...PRODUCTS[sku] }));
}

export function buildOfferPdfHtml(opts: {
  offerNumber: string;
  clientName: string;
  clientOrg: string;
  clientEmail: string;
  clientPhone?: string;
  variant: string;
  notes?: string;
  isEdu?: boolean;
}) {
  const products = getVariantProducts(opts.variant);
  if (!products) return null;

  const subtotalNetto = products.reduce((s, p) => s + p.price, 0);
  const vatAmount = Math.round(subtotalNetto * 0.23);
  const totalBrutto = subtotalNetto + vatAmount;

  const today = new Date();
  const validUntil = new Date(today);
  validUntil.setDate(validUntil.getDate() + 14);

  const itemsRows = products.map((p, i) => {
    const brutto = Math.round(p.price * 1.23);
    return `
    <tr>
      <td style="padding:14px 12px;border-bottom:1px solid #e5e7eb;vertical-align:top;color:#64748b;">${i + 1}</td>
      <td style="padding:14px 12px;border-bottom:1px solid #e5e7eb;vertical-align:top;">
        <div style="font-weight:700;color:#0f172a;font-size:12px;">${escapeHtml(p.name)}</div>
      </td>
      <td style="padding:14px 12px;border-bottom:1px solid #e5e7eb;text-align:center;vertical-align:top;">1 szt.</td>
      <td style="padding:14px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:700;vertical-align:top;">${formatPrice(p.price)} zł</td>
      <td style="padding:14px 12px;border-bottom:1px solid #e5e7eb;text-align:center;vertical-align:top;">23%</td>
      <td style="padding:14px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:700;vertical-align:top;">${formatPrice(brutto)} zł</td>
    </tr>`;
  }).join("");

  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Oferta ${opts.offerNumber}</title>
  <style>
    @media print { .no-print { display: none !important; } body { padding: 20px; margin: 0; } }
    @page { size: A4; margin: 15mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 11px; line-height: 1.4; color: #333; padding: 40px; max-width: 800px; margin: 0 auto; background: white; }
  </style>
</head>
<body>
  <!-- Print bar -->
  <div class="no-print" style="background:#7c3aed;color:white;padding:15px 20px;margin-bottom:20px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;">
    <div><strong>Oferta ${escapeHtml(opts.offerNumber)}</strong> — Kliknij aby zapisać jako PDF</div>
    <button onclick="window.print()" style="background:white;color:#7c3aed;border:none;padding:10px 25px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:14px;">Drukuj / Zapisz PDF</button>
  </div>

  <!-- Header -->
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:30px;padding-bottom:15px;border-bottom:3px solid #7c3aed;">
    <div>
      <img src="https://www.ezdrp24.com.pl/scanter_logo_email.png" alt="Scanter" style="height:55px;width:auto;" />
    </div>
    <div style="text-align:right;">
      <div style="font-size:26px;font-weight:800;color:#1e1b4b;letter-spacing:2px;">OFERTA</div>
      <div style="font-size:11px;color:#64748b;">Nr: ${escapeHtml(opts.offerNumber)}</div>
    </div>
  </div>

  <!-- Parties -->
  <div style="display:flex;justify-content:space-between;margin-bottom:25px;">
    <div style="width:47%;">
      <div style="font-weight:700;color:#7c3aed;margin-bottom:8px;font-size:10px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e5e7eb;padding-bottom:5px;">Sprzedawca</div>
      <div style="font-weight:700;font-size:13px;margin-bottom:4px;">Scanter Sp. z o.o.</div>
      <div style="font-size:11px;color:#444;margin-bottom:2px;">ul. Poświęcka 1a</div>
      <div style="font-size:11px;color:#444;margin-bottom:2px;">51-128 Wrocław</div>
      <div style="font-size:11px;color:#444;margin-bottom:2px;">NIP: 8952040169</div>
      <div style="font-size:11px;color:#444;margin-bottom:2px;">Email: biuro@scanter.pl</div>
      <div style="font-size:11px;color:#444;">Tel: +48 601 828 711</div>
    </div>
    <div style="width:47%;">
      <div style="font-weight:700;color:#7c3aed;margin-bottom:8px;font-size:10px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e5e7eb;padding-bottom:5px;">Nabywca</div>
      <div style="font-weight:700;font-size:13px;margin-bottom:4px;">${escapeHtml(opts.clientOrg || "—")}</div>
      ${opts.clientName ? `<div style="font-size:11px;color:#444;margin-bottom:2px;">${escapeHtml(opts.clientName)}</div>` : ""}
      <div style="font-size:11px;color:#444;margin-bottom:2px;">Email: ${escapeHtml(opts.clientEmail)}</div>
      ${opts.clientPhone ? `<div style="font-size:11px;color:#444;">Tel: ${escapeHtml(opts.clientPhone)}</div>` : ""}
    </div>
  </div>

  <!-- Dates -->
  <div style="display:flex;justify-content:space-between;margin-bottom:25px;padding:12px 15px;background:#f8fafc;border-radius:6px;border:1px solid #e2e8f0;">
    <div style="text-align:center;flex:1;">
      <div style="font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Data wystawienia</div>
      <div style="font-weight:700;font-size:13px;margin-top:3px;">${today.toLocaleDateString("pl-PL")}</div>
    </div>
    <div style="text-align:center;flex:1;">
      <div style="font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Ważna do</div>
      <div style="font-weight:700;font-size:13px;margin-top:3px;">${validUntil.toLocaleDateString("pl-PL")}</div>
    </div>
    <div style="text-align:center;flex:1;">
      <div style="font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Nr oferty</div>
      <div style="font-weight:700;font-size:13px;margin-top:3px;">${escapeHtml(opts.offerNumber)}</div>
    </div>
  </div>

  <!-- Variant label -->
  <div style="margin-bottom:15px;font-size:12px;color:#334155;">
    Zestaw: <strong style="color:#7c3aed;">EZD RP ${escapeHtml(opts.variant)}</strong>
  </div>

  <!-- Items table -->
  <table style="width:100%;border-collapse:collapse;margin-bottom:25px;">
    <thead>
      <tr>
        <th style="background:linear-gradient(135deg,#7c3aed,#6d28d9);color:white;padding:10px 12px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.5px;width:35px;">Lp.</th>
        <th style="background:linear-gradient(135deg,#7c3aed,#6d28d9);color:white;padding:10px 12px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.5px;">Nazwa produktu</th>
        <th style="background:linear-gradient(135deg,#7c3aed,#6d28d9);color:white;padding:10px 12px;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:0.5px;width:60px;">Ilość</th>
        <th style="background:linear-gradient(135deg,#7c3aed,#6d28d9);color:white;padding:10px 12px;text-align:right;font-size:10px;text-transform:uppercase;letter-spacing:0.5px;width:100px;">Cena netto</th>
        <th style="background:linear-gradient(135deg,#7c3aed,#6d28d9);color:white;padding:10px 12px;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:0.5px;width:50px;">VAT</th>
        <th style="background:linear-gradient(135deg,#7c3aed,#6d28d9);color:white;padding:10px 12px;text-align:right;font-size:10px;text-transform:uppercase;letter-spacing:0.5px;width:100px;">Brutto</th>
      </tr>
    </thead>
    <tbody>${itemsRows}</tbody>
  </table>

  <!-- Summary -->
  <div style="display:flex;justify-content:flex-end;margin-bottom:25px;">
    <div style="width:260px;background:#f8fafc;padding:15px;border-radius:6px;border:1px solid #e2e8f0;">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:11px;">
        <span style="color:#64748b;">Wartość netto:</span>
        <span>${formatPrice(subtotalNetto)} zł</span>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:11px;">
        <span style="color:#64748b;">VAT 23%:</span>
        <span>${formatPrice(vatAmount)} zł</span>
      </div>
      <div style="font-size:16px;font-weight:700;color:#7c3aed;border-top:2px solid #7c3aed;padding-top:10px;margin-top:10px;display:flex;justify-content:space-between;">
        <span>Razem brutto:</span>
        <span>${formatPrice(totalBrutto)} zł</span>
      </div>
    </div>
  </div>

  <!-- Gratis -->
  <div style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);padding:12px 15px;border-radius:6px;margin-bottom:20px;border:1px solid #86efac;font-size:11px;">
    <strong style="color:#166534;">Gratis do zestawu:</strong> 2 rolki etykiet 50×30 mm + 2 taśmy termotransferowe 110mm×74m (wartość ponad 100 zł netto)
  </div>

  ${opts.isEdu ? `
  <!-- VAT 0% info for educational institutions -->
  <div style="background:linear-gradient(135deg,#eff6ff,#dbeafe);padding:14px 15px;border-radius:6px;margin-bottom:20px;border:1px solid #93c5fd;font-size:11px;">
    <strong style="color:#1e40af;">Informacja o stawce VAT 0%</strong>
    <p style="margin:6px 0 0;color:#1e3a5f;line-height:1.6;">
      Jako placówka oświatowa, Państwa jednostka może skorzystać ze <strong>stawki VAT 0%</strong> na wybrane produkty z niniejszej oferty.
      Warunkiem jest uzyskanie stosownego zaświadczenia od organu prowadzącego (np. Urząd Miasta, Gminy).
      Chętnie pomożemy w przygotowaniu wniosku — prosimy o kontakt.
    </p>
  </div>` : ""}

  <!-- Conditions -->
  <div style="background:#f8fafc;padding:15px;border-radius:6px;margin-bottom:25px;border:1px solid #e2e8f0;">
    <div style="font-weight:700;color:#1e1b4b;margin-bottom:10px;font-size:12px;">Warunki oferty</div>
    <div style="display:flex;margin-bottom:6px;">
      <span style="width:140px;color:#64748b;font-size:11px;">Ważność oferty:</span>
      <span style="font-weight:600;font-size:11px;">do ${validUntil.toLocaleDateString("pl-PL")}</span>
    </div>
    <div style="display:flex;margin-bottom:6px;">
      <span style="width:140px;color:#64748b;font-size:11px;">Warunki płatności:</span>
      <span style="font-weight:600;font-size:11px;">Przelew 14 dni</span>
    </div>
    <div style="display:flex;">
      <span style="width:140px;color:#64748b;font-size:11px;">Termin dostawy:</span>
      <span style="font-weight:600;font-size:11px;">2-5 dni roboczych</span>
    </div>
  </div>

  ${opts.notes ? `
  <div style="background:#fffbeb;padding:12px 15px;border-radius:6px;margin-bottom:20px;border:1px solid #fde68a;font-size:11px;">
    <strong style="color:#92400e;">Uwagi klienta:</strong> ${escapeHtml(opts.notes)}
  </div>` : ""}

  <!-- Footer -->
  <div style="text-align:center;color:#64748b;font-size:9px;padding-top:15px;border-top:1px solid #e5e7eb;">
    <p style="margin-bottom:3px;">Dokument wygenerowany automatycznie przez system ezdrp24.com.pl</p>
    <p>Scanter Sp. z o.o. | ul. Poświęcka 1a, 51-128 Wrocław | <a href="mailto:biuro@scanter.pl" style="color:#7c3aed;">biuro@scanter.pl</a> | +48 601 828 711</p>
  </div>
</body>
</html>`;
}

export function buildOfferEmailHtml(opts: {
  offerNumber: string;
  clientName: string;
  clientOrg: string;
  variant: string;
  offerLink: string;
  isEdu?: boolean;
}) {
  const products = getVariantProducts(opts.variant);
  if (!products) return null;

  const subtotalNetto = products.reduce((s, p) => s + p.price, 0);
  const totalBrutto = subtotalNetto + Math.round(subtotalNetto * 0.23);
  const firstName = "";

  const itemsList = products.map(p =>
    `<tr>
      <td style="padding:10px 16px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#334155;">${escapeHtml(p.name)}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #f1f5f9;text-align:right;font-size:13px;color:#334155;font-weight:600;">${formatPrice(p.price)} zł <span style="font-weight:400;color:#94a3b8;font-size:11px;">netto</span></td>
    </tr>`
  ).join("");

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">

    <!-- Logo -->
    <div style="background:#ffffff;border-radius:16px 16px 0 0;padding:24px 32px;text-align:center;border:1px solid #e2e8f0;border-bottom:none;">
      <img src="https://www.ezdrp24.com.pl/scanter_logo_email.png" alt="Scanter" style="height:54px;width:auto;" />
    </div>
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#7c3aed,#6d28d9);padding:20px 32px;text-align:center;">
      <div style="color:#ffffff;font-size:14px;font-weight:600;letter-spacing:0.5px;">Sprzęt EZD RP dla administracji publicznej</div>
    </div>

    <!-- Content -->
    <div style="background:#ffffff;padding:36px 32px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">

      <p style="font-size:16px;color:#0f172a;margin:0 0 20px;font-weight:600;">
        Dzień dobry!
      </p>

      <p style="font-size:14px;color:#475569;line-height:1.8;margin:0 0 16px;">
        Bardzo dziękujemy za zainteresowanie naszą ofertą. Cieszymy się, że możemy pomóc w wyposażeniu Państwa stanowiska pracy w sprzęt do systemu EZD RP.
      </p>

      <p style="font-size:14px;color:#475569;line-height:1.8;margin:0 0 24px;">
        Przygotowaliśmy dla Państwa ofertę na <strong style="color:#7c3aed;">zestaw EZD RP ${escapeHtml(opts.variant)}</strong>. Poniżej skrócone zestawienie — pełna oferta z cenami, warunkami i szczegółami dostępna jest pod przyciskiem.
      </p>

      <!-- Products summary -->
      <div style="background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;margin-bottom:24px;">
        <div style="background:#7c3aed;padding:12px 16px;">
          <span style="color:white;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Zestaw EZD RP ${escapeHtml(opts.variant)}</span>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          ${itemsList}
          <tr>
            <td style="padding:10px 16px;font-size:13px;color:#64748b;">Razem netto:</td>
            <td style="padding:10px 16px;text-align:right;font-size:13px;color:#334155;font-weight:600;">${formatPrice(subtotalNetto)} zł</td>
          </tr>
          <tr style="background:#f1f5f9;">
            <td style="padding:12px 16px;font-size:14px;font-weight:700;color:#0f172a;">Razem brutto (z VAT 23%):</td>
            <td style="padding:12px 16px;text-align:right;font-size:16px;font-weight:800;color:#7c3aed;">${formatPrice(totalBrutto)} zł</td>
          </tr>
        </table>
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin:32px 0;">
        <a href="${opts.offerLink}" style="display:inline-block;background:#7c3aed;color:#ffffff;padding:16px 44px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:0.3px;border:2px solid #6d28d9;">Pobierz ofertę PDF</a>
        <p style="margin:10px 0 0;font-size:12px;color:#94a3b8;">Oferta otworzy się w przeglądarce — zapisz jako PDF przez Drukuj (Ctrl+P)</p>
      </div>

      <!-- Info box -->
      <div style="background:#f0fdf4;border-radius:10px;padding:20px;border:1px solid #bbf7d0;margin-bottom:24px;">
        <p style="margin:0 0 8px;color:#166534;font-size:13px;font-weight:700;">Do każdego zestawu dołączamy gratis:</p>
        <p style="margin:0;color:#166534;font-size:13px;">2 rolki etykiet 50×30 mm + 2 taśmy termotransferowe — wartość ponad 100 zł netto</p>
      </div>

      ${opts.isEdu ? `
      <div style="background:#eff6ff;border-radius:10px;padding:20px;border:1px solid #93c5fd;margin-bottom:24px;">
        <p style="margin:0 0 8px;color:#1e40af;font-size:13px;font-weight:700;">Informacja o stawce VAT 0%</p>
        <p style="margin:0;color:#1e3a5f;font-size:13px;line-height:1.6;">
          Jako placówka oświatowa, Państwa jednostka może skorzystać ze <strong>stawki VAT 0%</strong> na wybrane produkty.
          Wymagane jest zaświadczenie od organu prowadzącego (np. Urząd Miasta, Gminy). Chętnie pomożemy w przygotowaniu wniosku.
        </p>
      </div>` : ""}

      <div style="background:#f8fafc;border-radius:10px;padding:20px;border:1px solid #e2e8f0;">
        <p style="margin:0 0 6px;font-size:13px;color:#475569;">Oferta jest ważna <strong>14 dni</strong>. Warunki płatności: przelew 14 dni. Dostawa: 2-5 dni roboczych.</p>
        <p style="margin:0;font-size:13px;color:#475569;">W razie pytań lub potrzeby modyfikacji — proszę odpisać na tego maila lub zadzwonić.</p>
      </div>
    </div>

    <!-- Signature -->
    <div style="background:#f8fafc;padding:28px 32px;border:1px solid #e2e8f0;border-top:none;">
      <p style="margin:0 0 4px;color:#0f172a;font-size:14px;font-weight:600;">Pozdrawiamy,</p>
      <p style="margin:0 0 12px;color:#475569;font-size:13px;">Zespół Scanter Sp. z o.o.</p>
      <div style="border-top:1px solid #e2e8f0;padding-top:12px;">
        <p style="margin:0;font-size:12px;color:#64748b;">
          <a href="mailto:biuro@scanter.pl" style="color:#7c3aed;text-decoration:none;font-weight:600;">biuro@scanter.pl</a>
          &nbsp;·&nbsp;
          <a href="tel:+48601828711" style="color:#7c3aed;text-decoration:none;font-weight:600;">+48 601 828 711</a>
        </p>
        <p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">ul. Poświęcka 1a, 51-128 Wrocław · ezdrp24.com.pl</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="border-radius:0 0 16px 16px;padding:16px 32px;text-align:center;border:1px solid #e2e8f0;border-top:none;background:#ffffff;">
      <p style="margin:0;color:#cbd5e1;font-size:10px;">Nr oferty: ${escapeHtml(opts.offerNumber)}</p>
    </div>

  </div>
</body></html>`;
}
