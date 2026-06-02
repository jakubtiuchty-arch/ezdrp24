"use client";

import { useMemo, useRef, useState } from "react";
import { OFFER_CATALOG, isEducationalInstitution } from "@/lib/offer";
import { Plus, Trash2, FileText, Send, Loader2, Check, AlertCircle } from "lucide-react";

type Line = { key: string; name: string; qty: number; unitPriceZl: string };

// Cena "12,99" / "12.99" / "1 850" -> grosze
function parseGrosze(zl: string): number {
  const normalized = zl.replace(/\s/g, "").replace(",", ".");
  const value = Number(normalized);
  if (!isFinite(value) || value < 0) return 0;
  return Math.round(value * 100);
}

function formatZl(grosze: number): string {
  return (grosze / 100).toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function OfferGenerator() {
  const keyRef = useRef(0);
  const nextKey = () => `l${++keyRef.current}`;

  const [org, setOrg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isEdu, setIsEdu] = useState(false);
  const [eduTouched, setEduTouched] = useState(false);
  const [includeGratis, setIncludeGratis] = useState(true);
  const [lines, setLines] = useState<Line[]>([]);

  const [generated, setGenerated] = useState<{ id: string; offerNumber: string; sig: string } | null>(null);
  const [busy, setBusy] = useState<"idle" | "pdf" | "email">("idle");
  const [sentId, setSentId] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Sygnatura formularza — każda zmiana unieważnia wygenerowaną ofertę (derived, bez efektu)
  const formSig = JSON.stringify({ org, name, email, phone, notes, isEdu, includeGratis, lines });
  const activeOffer = generated && generated.sig === formSig ? generated : null;
  const isSent = !!activeOffer && sentId === activeOffer.id;

  // Auto-wykrywanie placówki oświatowej z nazwy instytucji (dopóki admin nie ustawi ręcznie)
  const handleOrgChange = (value: string) => {
    setOrg(value);
    if (!eduTouched) setIsEdu(value ? isEducationalInstitution(value) : false);
  };

  const catalogByCategory = useMemo(() => {
    const map = new Map<string, typeof OFFER_CATALOG>();
    for (const entry of OFFER_CATALOG) {
      if (!map.has(entry.category)) map.set(entry.category, []);
      map.get(entry.category)!.push(entry);
    }
    return Array.from(map.entries());
  }, []);

  const subtotalNetto = lines.reduce((s, l) => s + parseGrosze(l.unitPriceZl) * l.qty, 0);
  const vat = Math.round(subtotalNetto * 0.23);
  const brutto = subtotalNetto + vat;

  const addFromCatalog = (entry: (typeof OFFER_CATALOG)[number]) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.name === entry.name);
      if (existing) {
        return prev.map((l) => (l.key === existing.key ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...prev, { key: nextKey(), name: entry.name, qty: 1, unitPriceZl: (entry.price / 100).toFixed(2) }];
    });
  };

  const addCustom = () => {
    setLines((prev) => [...prev, { key: nextKey(), name: "", qty: 1, unitPriceZl: "" }]);
  };

  const updateLine = (key: string, patch: Partial<Line>) => {
    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, ...patch } : l)));
  };

  const removeLine = (key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  };

  const buildItems = () =>
    lines
      .map((l) => ({ name: l.name.trim(), qty: l.qty, unitPrice: parseGrosze(l.unitPriceZl) }))
      .filter((it) => it.name && it.qty > 0);

  // Tworzy rekord oferty w bazie i zwraca {id, offerNumber} lub null
  const createOffer = async (): Promise<{ id: string; offerNumber: string; sig: string } | null> => {
    if (activeOffer) return activeOffer;
    const items = buildItems();
    if (items.length === 0) {
      setError("Dodaj co najmniej jedną pozycję z nazwą i ilością.");
      return null;
    }
    setError("");
    const res = await fetch("/api/admin/custom-offer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientOrg: org,
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        notes,
        isEdu,
        includeGratis,
        items,
      }),
    });
    const data = await res.json();
    if (!data.success) {
      setError(data.error || "Błąd generowania oferty");
      return null;
    }
    const result = { id: data.id, offerNumber: data.offerNumber, sig: formSig };
    setGenerated(result);
    return result;
  };

  const handleGeneratePdf = async () => {
    setBusy("pdf");
    // Otwieramy okno synchronicznie, by ominąć blokadę popupów
    const win = window.open("", "_blank");
    const offer = await createOffer();
    if (offer && win) {
      win.location.href = `/api/offer/custom/${offer.id}`;
    } else if (win) {
      win.close();
    }
    setBusy("idle");
  };

  const handleSendEmail = async () => {
    if (!email.trim()) {
      setError("Aby wysłać ofertę mailem, podaj adres e-mail klienta.");
      return;
    }
    setBusy("email");
    const offer = await createOffer();
    if (!offer) {
      setBusy("idle");
      return;
    }
    const res = await fetch("/api/admin/custom-offer/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: offer.id }),
    });
    const data = await res.json();
    if (data.success) {
      setSentId(offer.id);
      setError("");
    } else {
      setError(data.error || "Błąd wysyłki maila");
    }
    setBusy("idle");
  };

  const inputCls =
    "w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
      {/* Lewa kolumna — formularz */}
      <div className="space-y-6">
        {/* Dane klienta */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Dane klienta</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-500 mb-1">Instytucja / firma</label>
              <input className={inputCls} value={org} onChange={(e) => handleOrgChange(e.target.value)} placeholder="np. Urząd Gminy Przykładowo" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Osoba kontaktowa</label>
              <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Imię i nazwisko" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">E-mail</label>
              <input className={inputCls} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="kontakt@instytucja.pl" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Telefon</label>
              <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+48 ..." />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-500 mb-1">Uwagi (widoczne w ofercie)</label>
              <textarea className={inputCls} rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="np. dostawa na adres oddziału..." />
            </div>
          </div>
          <div className="flex flex-wrap gap-5 mt-4">
            <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isEdu}
                onChange={(e) => { setIsEdu(e.target.checked); setEduTouched(true); }}
                className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
              />
              Placówka oświatowa (informacja o VAT 0%)
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={includeGratis}
                onChange={(e) => setIncludeGratis(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
              />
              Dołącz gratis (etykiety + taśmy)
            </label>
          </div>
        </div>

        {/* Katalog */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Katalog — dodaj urządzenie</h2>
          <div className="space-y-4">
            {catalogByCategory.map(([category, entries]) => (
              <div key={category}>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">{category}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {entries.map((entry) => (
                    <button
                      key={entry.sku}
                      onClick={() => addFromCatalog(entry)}
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-slate-200 text-left text-sm hover:border-violet-300 hover:bg-violet-50 transition-colors cursor-pointer"
                    >
                      <span className="text-slate-700">{entry.name}</span>
                      <span className="flex items-center gap-1.5 shrink-0 text-slate-500">
                        {formatZl(entry.price)} zł
                        <Plus className="w-4 h-4 text-violet-600" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={addCustom}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-slate-300 text-sm font-medium text-slate-600 hover:border-violet-400 hover:text-violet-700 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Dodaj własną pozycję
            </button>
          </div>
        </div>

        {/* Pozycje oferty */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Pozycje oferty</h2>
          {lines.length === 0 && (
            <p className="text-sm text-slate-400 py-4 text-center">Brak pozycji — dodaj urządzenia z katalogu powyżej.</p>
          )}
          {lines.length > 0 && (
            <div className="space-y-2">
              <div className="hidden sm:grid grid-cols-[1fr_70px_110px_110px_36px] gap-2 text-xs font-medium text-slate-400 px-1">
                <span>Nazwa</span>
                <span className="text-center">Ilość</span>
                <span className="text-right">Cena netto</span>
                <span className="text-right">Wartość</span>
                <span></span>
              </div>
              {lines.map((l) => {
                const lineNetto = parseGrosze(l.unitPriceZl) * l.qty;
                return (
                  <div key={l.key} className="grid grid-cols-[1fr_70px_110px_110px_36px] gap-2 items-center">
                    <input
                      className={inputCls}
                      value={l.name}
                      onChange={(e) => updateLine(l.key, { name: e.target.value })}
                      placeholder="Nazwa pozycji"
                    />
                    <input
                      className={inputCls + " text-center"}
                      type="number"
                      min={1}
                      value={l.qty}
                      onChange={(e) => updateLine(l.key, { qty: Math.max(1, Math.round(Number(e.target.value) || 1)) })}
                    />
                    <input
                      className={inputCls + " text-right"}
                      value={l.unitPriceZl}
                      onChange={(e) => updateLine(l.key, { unitPriceZl: e.target.value })}
                      placeholder="0,00"
                      inputMode="decimal"
                    />
                    <span className="text-right text-sm font-semibold text-slate-700 px-1">{formatZl(lineNetto)} zł</span>
                    <button
                      onClick={() => removeLine(l.key)}
                      className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      aria-label="Usuń pozycję"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Prawa kolumna — podsumowanie + akcje */}
      <div className="lg:sticky lg:top-6 self-start space-y-4">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Podsumowanie</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Wartość netto</span>
              <span className="font-medium text-slate-900">{formatZl(subtotalNetto)} zł</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>VAT 23%</span>
              <span className="font-medium text-slate-900">{formatZl(vat)} zł</span>
            </div>
            <div className="flex justify-between pt-3 mt-1 border-t border-slate-200 text-base">
              <span className="font-bold text-slate-900">Razem brutto</span>
              <span className="font-bold text-violet-700">{formatZl(brutto)} zł</span>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {activeOffer && (
            <div className="mt-4 p-3 rounded-lg bg-violet-50 text-violet-700 text-sm">
              Oferta <strong>{activeOffer.offerNumber}</strong> gotowa.
            </div>
          )}
          {isSent && (
            <div className="flex items-center gap-2 mt-2 p-3 rounded-lg bg-emerald-50 text-emerald-700 text-sm">
              <Check className="w-4 h-4 shrink-0" /> Wysłano na {email}
            </div>
          )}

          <div className="mt-5 space-y-2">
            <button
              onClick={handleGeneratePdf}
              disabled={busy !== "idle"}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 disabled:opacity-60 transition-colors cursor-pointer"
            >
              {busy === "pdf" ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
              Generuj i otwórz PDF
            </button>
            <button
              onClick={handleSendEmail}
              disabled={busy !== "idle"}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-violet-200 text-violet-700 text-sm font-semibold hover:bg-violet-50 disabled:opacity-60 transition-colors cursor-pointer"
            >
              {busy === "email" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Wyślij mailem do klienta
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            PDF otwiera się w nowej karcie — zapisz przez Drukuj (Ctrl/Cmd+P). Mail wysyła link do oferty na adres klienta.
          </p>
        </div>
      </div>
    </div>
  );
}
