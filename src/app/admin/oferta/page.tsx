import Link from "next/link";
import { OfferGenerator } from "./OfferGenerator";

export const dynamic = "force-dynamic";

export default function OfertaPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-slate-200">
          <Link href="/admin" className="px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-700">
            Zapytania
          </Link>
          <Link href="/admin/zamowienia" className="px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-700">
            Zamówienia
          </Link>
          <Link href="/admin/oferta" className="px-4 py-2.5 text-sm font-medium text-violet-700 border-b-2 border-violet-600">
            Generator oferty
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Generator oferty</h1>
          <p className="text-sm text-slate-500 mt-1">Wybierz urządzenia, dopasuj ceny i wygeneruj ofertę szytą pod klienta — w tym samym wzorze co oferty automatyczne.</p>
        </div>

        <OfferGenerator />
      </div>
    </div>
  );
}
