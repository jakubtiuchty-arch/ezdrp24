import Link from "next/link";
import { cities } from "@/lib/cities";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
          {/* Kolumna 1 */}
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Dostawa i realizacja</p>
            <p className="text-lg font-bold text-slate-900 mb-2">Scanter Sp. z o.o.</p>
            <div className="space-y-0.5 text-sm text-slate-700">
              <p>ul. Poświęcka 1a, 51-128 Wrocław</p>
              <p>NIP 8952040169</p>
            </div>
            <div className="mt-2 space-y-0.5 text-sm">
              <p>
                Infolinia: <a href="tel:+48601828711" className="text-violet-700 hover:underline font-medium">+48 601 828 711</a>
              </p>
              <p>
                E-mail: <a href="mailto:biuro@scanter.pl" className="text-violet-700 hover:underline font-medium">biuro@scanter.pl</a>
              </p>
            </div>
          </div>

          {/* Kolumna 2 */}
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Linki</p>
            <ul>
              <li>
                <Link href="/polityka-prywatnosci" className="text-violet-700 hover:underline text-sm">
                  Polityka prywatności
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolumna 3 - Obsługiwane miasta */}
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Obsługiwane miasta</p>
            <ul className="text-xs space-y-1 text-slate-600">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link href={`/ezd-rp/${city.slug}`} className="hover:text-violet-700 transition-colors">
                    EZD RP {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolumna 4 */}
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Informacje</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Zebra® i Epson® to zarejestrowane znaki towarowe odpowiednich właścicieli. 
              Strona ma charakter informacyjny i nie stanowi porady prawnej. 
              Dostawa z fakturą z odroczonym terminem płatności.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-200">
          <p className="text-center text-xs text-slate-500">
            © {currentYear} Scanter Sp. z o.o. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
