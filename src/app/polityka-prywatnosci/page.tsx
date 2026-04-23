import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";
import { Shield, Lock, Eye, FileText, Scale, Server } from "lucide-react";

export const metadata: Metadata = {
  title: "Polityka Prywatności | Scanter Sp. z o.o.",
  description: "Zasady przetwarzania danych osobowych i polityka cookies serwisu ezdrp24.com.pl. Administrator: Scanter Sp. z o.o.",
  alternates: {
    canonical: "https://www.ezdrp24.com.pl/polityka-prywatnosci",
  },
};

export default function PrivacyPolicy() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://www.ezdrp24.com.pl" },
      { "@type": "ListItem", "position": 2, "name": "Polityka Prywatności", "item": "https://www.ezdrp24.com.pl/polityka-prywatnosci" }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Header />

      {/* Header Sekcji */}
      <div className="bg-white border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-100 text-violet-600 rounded-2xl mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Polityka Prywatności</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Dbamy o Twoje dane osobowe. Poniżej znajdziesz przejrzyste informacje o tym, kto jest ich administratorem, w jakim celu je przetwarzamy, jak długo je przechowujemy i jakie przysługują Ci prawa.
          </p>
        </div>
      </div>

      <main className="flex-grow py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* 1. Administrator */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">1. Administrator danych osobowych</h2>
                <p className="text-slate-600 leading-relaxed">
                  Administratorem Twoich danych osobowych jest:<br/>
                  <strong>Scanter Sp. z o.o.</strong><br/>
                  ul. Poświęcka 1a, 51-128 Wrocław<br/>
                  NIP: 8952040169, KRS: 0000568800<br/>
                  REGON: 362071519
                </p>
                <p className="text-slate-600 mt-3">
                  Kontakt w sprawach ochrony danych: <a href="mailto:biuro@scanter.pl" className="text-violet-600 hover:underline font-medium">biuro@scanter.pl</a>, tel. <a href="tel:+48601828711" className="text-violet-600 hover:underline font-medium">+48 601 828 711</a>.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Cele i podstawy prawne */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-4">2. Cele i podstawy prawne przetwarzania</h2>
                <p className="text-slate-600 mb-4">Przetwarzamy Twoje dane osobowe w następujących celach:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-900 mb-1">Obsługa zapytań ofertowych</h3>
                    <p className="text-sm text-slate-600">Przygotowanie wyceny i kontakt w sprawie oferty na sprzęt EZD RP. Podstawa: art. 6 ust. 1 lit. b RODO (podjęcie działań przed zawarciem umowy) oraz art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes — obsługa klienta).</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-900 mb-1">Realizacja zamówień</h3>
                    <p className="text-sm text-slate-600">Wykonanie umowy sprzedaży, wystawienie faktury VAT i dostarczenie sprzętu. Podstawa: art. 6 ust. 1 lit. b RODO (wykonanie umowy).</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-900 mb-1">Obsługa posprzedażowa</h3>
                    <p className="text-sm text-slate-600">Rozpatrywanie reklamacji, obsługa gwarancyjna, wsparcie techniczne. Podstawa: art. 6 ust. 1 lit. b RODO (wykonanie umowy) oraz art. 6 ust. 1 lit. c RODO (obowiązek prawny).</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-900 mb-1">Obowiązki prawne</h3>
                    <p className="text-sm text-slate-600">Prowadzenie księgowości, rozliczenia podatkowe, archiwizacja dokumentów handlowych. Podstawa: art. 6 ust. 1 lit. c RODO (obowiązek prawny wynikający z ustaw podatkowych i rachunkowych).</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Zakres danych */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">3. Zakres przetwarzanych danych</h2>
                <p className="text-slate-600 mb-3">W ramach formularza kontaktowego zbieramy:</p>
                <ul className="space-y-1.5 text-slate-600 text-sm">
                  {[
                    "Imię i nazwisko osoby kontaktowej",
                    "Nazwa instytucji / organizacji",
                    "Adres e-mail (wymagany)",
                    "Numer telefonu (opcjonalnie)",
                    "Województwo (w celu określenia obszaru dostawy)",
                    "Preferowany wariant zestawu EZD",
                    "Treść zapytania / uwagi"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-slate-600 mt-3 text-sm">
                  Podanie danych oznaczonych jako wymagane jest niezbędne do obsługi zapytania. Podanie pozostałych danych jest dobrowolne i ułatwia przygotowanie spersonalizowanej oferty.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Okres przechowywania */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">4. Okres przechowywania danych</h2>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 shrink-0"></span>
                    <span><strong>Zapytania ofertowe</strong> — przez okres prowadzenia korespondencji i do 12 miesięcy od ostatniego kontaktu, chyba że dojdzie do zawarcia umowy.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 shrink-0"></span>
                    <span><strong>Dane związane z umową</strong> — przez czas trwania umowy, a po jej zakończeniu przez okres wymagany przepisami prawa (do 5 lat dla celów podatkowych, do 6 lat dla ewentualnych roszczeń).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 shrink-0"></span>
                    <span><strong>Dane przetwarzane na podstawie zgody</strong> — do momentu wycofania zgody.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 5. Odbiorcy danych */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-sky-50 text-sky-600 rounded-xl shrink-0">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">5. Odbiorcy danych</h2>
                <p className="text-slate-600 mb-3 text-sm">Twoje dane mogą być przekazywane następującym kategoriom odbiorców:</p>
                <ul className="space-y-1.5 text-slate-600 text-sm">
                  {[
                    "Firmy kurierskie — w celu dostarczenia zamówionego sprzętu",
                    "Biuro rachunkowe — w celu obsługi księgowej i wystawienia faktur",
                    "Dostawcy usług IT — hosting (Vercel Inc.), baza danych (Supabase Inc.), poczta transakcyjna (Resend Inc.)",
                    "Organy publiczne — w przypadkach wymaganych przepisami prawa"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-sky-400 rounded-full mt-1.5 shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-slate-600 mt-3 text-sm">
                  Część naszych podwykonawców (Vercel, Supabase, Resend) przetwarza dane na terenie Stanów Zjednoczonych. Transfer odbywa się na podstawie standardowych klauzul umownych (SCC) zatwierdzonych przez Komisję Europejską zgodnie z art. 46 ust. 2 lit. c RODO.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Prawa */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-violet-50 text-violet-600 rounded-xl shrink-0">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">6. Twoje prawa</h2>
                <p className="text-slate-600 mb-3 text-sm">Na podstawie RODO przysługuje Ci prawo do:</p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {[
                    "Dostępu do swoich danych (art. 15 RODO)",
                    "Sprostowania danych (art. 16 RODO)",
                    "Usunięcia danych — prawo do bycia zapomnianym (art. 17 RODO)",
                    "Ograniczenia przetwarzania (art. 18 RODO)",
                    "Przenoszenia danych (art. 20 RODO)",
                    "Wniesienia sprzeciwu wobec przetwarzania (art. 21 RODO)",
                    "Cofnięcia zgody w dowolnym momencie (art. 7 ust. 3 RODO)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                      <span className="w-1.5 h-1.5 bg-violet-500 rounded-full shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-slate-600 mt-4 text-sm">
                  W celu realizacji swoich praw skontaktuj się z nami: <a href="mailto:biuro@scanter.pl" className="text-violet-600 hover:underline font-medium">biuro@scanter.pl</a>. Masz również prawo wniesienia skargi do organu nadzorczego — <strong>Prezesa Urzędu Ochrony Danych Osobowych</strong> (ul. Stawki 2, 00-193 Warszawa, <a href="https://uodo.gov.pl" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">uodo.gov.pl</a>).
                </p>
              </div>
            </div>
          </section>

          {/* 7. Cookies */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">7. Pliki cookies</h2>
                <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                  Serwis ezdrp24.com.pl wykorzystuje pliki cookies w celu:
                </p>
                <ul className="space-y-1.5 text-slate-600 text-sm mb-4">
                  {[
                    "Zapewnienia prawidłowego działania strony (cookies niezbędne)",
                    "Analizy ruchu na stronie za pomocą Google Analytics (cookies analityczne)",
                    "Zapamiętania preferencji użytkownika (cookies funkcjonalne)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-slate-600 text-sm mb-3">
                  Nie wykorzystujemy cookies do śledzenia aktywności poza naszą witryną w celach reklamowych (remarketing).
                </p>
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-sm text-amber-900">
                  Możesz w każdej chwili zmienić ustawienia dotyczące cookies w swojej przeglądarce internetowej. Usunięcie lub zablokowanie cookies może wpłynąć na funkcjonalność serwisu.
                </div>
              </div>
            </div>
          </section>

          {/* 8. Bezpieczeństwo */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">8. Bezpieczeństwo danych</h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony Twoich danych osobowych przed nieuprawnionym dostępem, utratą lub zniszczeniem. Serwis korzysta z szyfrowanego połączenia SSL/TLS. Dane przechowywane są na zabezpieczonych serwerach z ograniczonym dostępem.
                </p>
              </div>
            </div>
          </section>

          {/* 9. Zmiany */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-100 text-slate-600 rounded-xl shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">9. Zmiany polityki prywatności</h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. O istotnych zmianach będziemy informować poprzez komunikat na stronie internetowej. Aktualna wersja polityki jest zawsze dostępna pod adresem <a href="https://www.ezdrp24.com.pl/polityka-prywatnosci" className="text-violet-600 hover:underline">ezdrp24.com.pl/polityka-prywatnosci</a>.
                </p>
              </div>
            </div>
          </section>

          <p className="text-center text-sm text-slate-400 pt-8">
            Ostatnia aktualizacja: 14 kwietnia 2026 r.
          </p>

        </div>
      </main>
      <Footer />
    </div>
  );
}
