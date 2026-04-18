import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { Check, ArrowRight, ScanBarcode, Star, Wifi, Usb } from "lucide-react";

export const metadata: Metadata = {
  title: "Czytniki kodów do EZD RP — Zebra DS2208 vs DS2278 | Porównanie",
  description: "Który czytnik kodów do EZD RP wybrać? Porównanie Zebra DS2208 (przewodowy) i DS2278 (bezprzewodowy). Odczyt kodów 1D, 2D i QR do rejestracji wpływów RPW. Plug & Play USB.",
  keywords: ["EZD czytnik", "czytnik kodów EZD", "czytnik do EZD RP", "Zebra DS2208", "Zebra DS2278", "czytnik kodów kreskowych RPW", "skaner kodów EZD"],
  alternates: {
    canonical: "https://ezdrp24.com.pl/ezd-rp/czytniki",
  },
  openGraph: {
    title: "Czytniki kodów do EZD RP — Zebra DS2208 vs DS2278",
    description: "Porównanie czytników kodów do systemu EZD RP. Odczyt 1D, 2D, QR — rejestracja wpływów RPW. Przewodowy vs bezprzewodowy.",
    url: "https://ezdrp24.com.pl/ezd-rp/czytniki",
  },
};

export default function CzytnikiPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://ezdrp24.com.pl" },
      { "@type": "ListItem", "position": 2, "name": "Czytniki kodów do EZD", "item": "https://ezdrp24.com.pl/ezd-rp/czytniki" }
    ]
  };

  const productLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Zebra DS2208 — czytnik kodów do EZD RP",
      "description": "Przewodowy czytnik kodów kreskowych 1D/2D/QR do rejestracji wpływów (RPW) w systemie EZD RP. USB Plug & Play, odporny na upadki z 1.5m, klasa IP52.",
      "brand": { "@type": "Brand", "name": "Zebra" },
      "sku": "DS2208",
      "image": "https://ezdrp24.com.pl/ds2208_1.webp",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "PLN",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Zebra DS2278 — bezprzewodowy czytnik kodów do EZD RP",
      "description": "Bezprzewodowy czytnik kodów Bluetooth do EZD RP. Zasięg 10m, bateria na 14h pracy, stacja dokująca w zestawie. Idealny do okien podawczych i mobilnej rejestracji.",
      "brand": { "@type": "Brand", "name": "Zebra" },
      "sku": "DS2278",
      "image": "https://ezdrp24.com.pl/ds2278_1.webp",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "PLN",
        "availability": "https://schema.org/InStock"
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {productLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <Header />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center gap-2 text-xs text-slate-500">
              <li><Link href="/" className="hover:text-violet-600 transition-colors">Strona główna</Link></li>
              <li>/</li>
              <li className="text-slate-800 font-medium">Czytniki kodów do EZD</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-white border-b border-slate-200 py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <ScanBarcode className="w-5 h-5 text-violet-600" />
                <span className="text-sm font-medium text-violet-600 uppercase tracking-wide">Czytniki kodów</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                Czytniki kodów do <span className="text-violet-700">EZD RP</span>
              </h1>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl">
                Czytnik kodów kreskowych jest niezbędnym elementem stanowiska EZD RP. Służy do <strong>rejestracji wpływów (RPW)</strong> — skanowania kodów z kopert, paczek i etykiet. Oferujemy dwa modele Zebra: przewodowy DS2208 i bezprzewodowy DS2278, oba zgodne z wymaganiami systemu EZD.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="#porownanie"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-bold rounded-full hover:bg-violet-700 transition-colors"
                >
                  Zobacz porównanie <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#formularz"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-900 font-bold rounded-full hover:bg-slate-200 transition-colors"
                >
                  Zapytaj o cenę
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Do czego służy czytnik */}
        <section className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
              Do czego służy czytnik kodów w EZD RP?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <ScanBarcode className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Rejestracja wpływów (RPW)</h3>
                <p className="text-sm text-slate-600">Główne zastosowanie — skanowanie kodów kreskowych z kopert i paczek wpływających do urzędu. Kod jest automatycznie odczytywany i rejestrowany w systemie EZD RP.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Odczyt etykiet EZD</h3>
                <p className="text-sm text-slate-600">Skanowanie kodów z etykiet na teczkach aktowych, segregatorach i dokumentach w Składzie Chronologicznym. Szybkie wyszukiwanie i weryfikacja akt.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Obsługa formatów 1D, 2D i QR</h3>
                <p className="text-sm text-slate-600">System EZD RP wykorzystuje różne formaty kodów — Code 128, Data Matrix, PDF417 i QR. Oba czytniki Zebra obsługują wszystkie te standardy natywnie.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Porównanie */}
        <section id="porownanie" className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Zebra DS2208 vs DS2278 — który czytnik wybrać?
            </h2>
            <p className="text-slate-600 mb-10 max-w-2xl">
              Oba czytniki obsługują identyczne formaty kodów i są w pełni zgodne z EZD RP. Kluczowa różnica to <strong>kabel vs Bluetooth</strong>.
            </p>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* DS2208 */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                <div className="relative h-64 bg-white flex items-center justify-center">
                  <Image
                    src="/ds2208_1.webp"
                    alt="Zebra DS2208 czytnik kodów przewodowy do EZD - widok główny"
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Usb className="w-5 h-5 text-slate-500" />
                      Zebra DS2208
                    </h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-700">Przewodowy</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">Niezawodny czytnik przewodowy USB do stałego stanowiska kancelaryjnego. Ekonomiczny i bezobsługowy — podłącz i skanuj.</p>
                  <ul className="space-y-2">
                    {[
                      "Połączenie: USB (kabel 2m w zestawie)",
                      "Odczyt: 1D, 2D, QR, PDF417, Data Matrix",
                      "Odporność na upadki: 1.5m na beton",
                      "Klasa szczelności: IP52",
                      "Tryb pracy: ciągły (zasilanie z USB)",
                      "Plug & Play — bez instalacji sterowników"
                    ].map((spec, i) => (
                      <li key={i} className="flex items-center text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* DS2278 */}
              <div className="bg-violet-50 rounded-2xl border-2 border-violet-300 overflow-hidden relative">
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-violet-600 rounded-full text-white text-xs font-bold">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    Mobilność
                  </div>
                </div>
                <div className="relative h-64 bg-white flex items-center justify-center">
                  <Image
                    src="/ds2278_1.webp"
                    alt="Zebra DS2278 czytnik kodów bezprzewodowy do EZD - widok główny"
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Wifi className="w-5 h-5 text-violet-500" />
                      Zebra DS2278
                    </h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-violet-200 text-violet-700">Bezprzewodowy</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">Bezprzewodowy czytnik Bluetooth — idealny do okien podawczych, rejestracji paczek i pracy mobilnej w sekretariacie. Stacja dokująca w zestawie.</p>
                  <ul className="space-y-2">
                    {[
                      "Połączenie: Bluetooth 4.0 (zasięg 10m)",
                      "Odczyt: 1D, 2D, QR, PDF417, Data Matrix",
                      "Bateria: do 14h ciągłej pracy",
                      "Odporność na upadki: 1.5m na beton",
                      "Klasa szczelności: IP42",
                      "Stacja dokująca USB w zestawie (ładowanie + parowanie)",
                      "Pamięć wewnętrzna: bufor do 2500 kodów offline"
                    ].map((spec, i) => (
                      <li key={i} className="flex items-center text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Tabela porównawcza */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-3 px-4 font-bold text-slate-900">Parametr</th>
                    <th className="text-center py-3 px-4 font-bold text-slate-900">DS2208</th>
                    <th className="text-center py-3 px-4 font-bold text-violet-700 bg-violet-50">DS2278</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Łączność", "USB (kabel)", "Bluetooth 4.0 + stacja USB"],
                    ["Zasięg bezprzewodowy", "—", "do 10 metrów"],
                    ["Czas pracy na baterii", "— (zasilanie USB)", "do 14 godzin"],
                    ["Obsługiwane kody", "1D, 2D, QR, PDF417, Data Matrix", "1D, 2D, QR, PDF417, Data Matrix"],
                    ["Odporność na upadki", "1.5m na beton", "1.5m na beton"],
                    ["Klasa szczelności", "IP52", "IP42"],
                    ["Prędkość skanowania", "Natychmiastowa", "Natychmiastowa"],
                    ["Bufor offline", "Nie", "Tak (do 2500 kodów)"],
                    ["Waga", "158g", "214g (z baterią)"],
                    ["Stacja dokująca", "Nie dotyczy", "W zestawie"],
                    ["Zgodność EZD RP / RPW", "Tak", "Tak"],
                    ["Segment", "Stałe stanowisko", "Mobilna rejestracja"],
                    ["Dla kogo?", "Kancelaria, stałe biurko", "Okno podawcze, paczki, mobilność"],
                  ].map(([param, ds2208, ds2278], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                      <td className="py-3 px-4 font-medium text-slate-700">{param}</td>
                      <td className="py-3 px-4 text-center text-slate-600">{ds2208}</td>
                      <td className="py-3 px-4 text-center text-slate-900 font-medium bg-violet-50/50">{ds2278}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Kiedy który */}
        <section className="py-12 lg:py-16 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
              Który czytnik EZD wybrać?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Usb className="w-5 h-5 text-slate-500" />
                  Wybierz DS2208 jeśli:
                </h3>
                <ul className="space-y-2">
                  {[
                    "Czytnik będzie stał na jednym stanowisku (biurko kancelarii)",
                    "Nie potrzebujesz bezprzewodowej mobilności",
                    "Szukasz ekonomicznego, niezawodnego rozwiązania",
                    "Rejestrujesz wpływy z kopert i mniejszych przesyłek",
                    "Zależy Ci na zerowej obsłudze — podłącz USB i działa"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-600">
                      <Check className="w-4 h-4 text-slate-400 mr-2 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-500">
                  DS2208 znajdziesz w zestawach: <Link href="/#warianty" className="text-violet-600 hover:underline font-medium">Mini, Standard i Plus</Link>
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-violet-300">
                <h3 className="text-lg font-bold text-violet-700 mb-3 flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-violet-500" />
                  Wybierz DS2278 jeśli:
                </h3>
                <ul className="space-y-2">
                  {[
                    "Pracujesz przy oknie podawczym i rejestrujesz duże paczki",
                    "Potrzebujesz zasięgu — czytnik w ręku, PC na biurku (do 10m)",
                    "Rejestrujesz wpływy w różnych pomieszczeniach (mobilność)",
                    "Chcesz skanować kody z dużych przesyłek bez przenoszenia ich do czytnika",
                    "Chcesz bufor offline (skanowanie bez połączenia, synchronizacja później)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-600">
                      <Check className="w-4 h-4 text-violet-500 mr-2 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-500">
                  DS2278 znajdziesz w zestawie: <Link href="/#warianty" className="text-violet-600 hover:underline font-medium">Pro</Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
              Najczęstsze pytania o czytniki do EZD
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "Czy czytnik do EZD musi obsługiwać kody 2D?",
                  a: "Tak. System EZD RP generuje etykiety z kodami 2D (Data Matrix, PDF417) oraz QR. Czytniki obsługujące tylko kody 1D (kreskowe) nie są wystarczające. Oba modele Zebra DS2208 i DS2278 odczytują natywnie wszystkie formaty kodów wymagane przez EZD RP."
                },
                {
                  q: "Czy czytnik Zebra DS2208/DS2278 wymaga instalacji sterowników?",
                  a: "Nie. Oba czytniki działają w trybie Plug & Play — po podłączeniu do portu USB (DS2208 kablem, DS2278 przez stację dokującą) system Windows rozpoznaje je automatycznie jako urządzenie HID (jak klawiatura). Odczytany kod jest wpisywany w aktywne pole tekstowe."
                },
                {
                  q: "Jak działa tryb offline w DS2278?",
                  a: "Czytnik DS2278 posiada pamięć wewnętrzną na ok. 2500 kodów. Gdy oddalisz się poza zasięg Bluetooth (10m), czytnik przechodzi w tryb batch — skanowane kody zapisują się w pamięci. Po powrocie w zasięg, dane synchronizują się automatycznie z komputerem."
                },
                {
                  q: "Ile wytrzymuje bateria w DS2278?",
                  a: "Bateria zapewnia do 14 godzin ciągłej pracy (ok. 33 000 skanów na jednym ładowaniu). Ładowanie odbywa się przez stację dokującą USB — pełne naładowanie trwa ok. 4 godziny. Stacja dokująca jest dołączona w zestawie."
                },
                {
                  q: "Czy mogę używać czytnika z dowolnym oprogramowaniem EZD?",
                  a: "Tak. Czytniki Zebra DS2208 i DS2278 emulują klawiaturę (HID) — odczytany kod jest wpisywany jako tekst w dowolne aktywne pole. Działają z każdym oprogramowaniem EZD, w tym EZD RP od NASK, EZD PUW, eDok i innymi systemami wykorzystywanymi w polskiej administracji."
                }
              ].map((item, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{item.q}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 lg:py-16 bg-violet-50 border-b border-violet-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Potrzebujesz czytnika kodów do EZD RP?
            </h2>
            <p className="text-slate-600 mb-6 max-w-xl mx-auto">
              Zamów czytnik osobno lub w kompletnym zestawie EZD z drukarką etykiet i skanerem dokumentów. Faktura VAT z odroczonym terminem płatności.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/#warianty"
                className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-bold rounded-full hover:bg-violet-700 transition-colors"
              >
                Zobacz zestawy z czytnikiem <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="tel:+48601828711"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Zadzwoń: +48 601 828 711
              </Link>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
