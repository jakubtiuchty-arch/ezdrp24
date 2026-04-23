import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { Check, ArrowRight, Printer, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Drukarki etykiet do EZD RP — Zebra ZD230t vs ZD421t | Porównanie",
  description: "Która drukarka etykiet do EZD RP jest lepsza? Porównanie Zebra ZD230t i ZD421t — druk termotransferowy, trwałość 5+ lat, zgodność ze Składem Chronologicznym. Ceny od 899 zł netto.",
  keywords: ["EZD drukarka", "drukarka etykiet EZD", "drukarka do EZD RP", "Zebra ZD230t", "Zebra ZD421t", "drukarka kodów kreskowych EZD", "Skład Chronologiczny drukarka"],
  alternates: {
    canonical: "https://ezdrp24.com.pl/ezd-rp/drukarki",
  },
  openGraph: {
    title: "Drukarki etykiet do EZD RP — Zebra ZD230t vs ZD421t",
    description: "Porównanie drukarek do systemu EZD RP. Druk termotransferowy, trwałość 5+ lat, zgodność ze Składem Chronologicznym.",
    url: "https://ezdrp24.com.pl/ezd-rp/drukarki",
  },
};

export default function DrukarkiPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://ezdrp24.com.pl" },
      { "@type": "ListItem", "position": 2, "name": "Drukarki etykiet do EZD", "item": "https://ezdrp24.com.pl/ezd-rp/drukarki" }
    ]
  };

  const productLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Zebra ZD230t — drukarka etykiet do EZD RP",
      "description": "Ekonomiczna drukarka termotransferowa do systemu EZD RP. Szerokość druku 104mm, trwałość wydruku 5+ lat, zgodna ze Składem Chronologicznym.",
      "brand": { "@type": "Brand", "name": "Zebra" },
      "sku": "ZD230t",
      "image": "https://www.ezdrp24.com.pl/zd230_1.webp",
      "dateModified": new Date().toISOString().slice(0, 10),
      "offers": {
        "@type": "Offer",
        "price": "1101",
        "priceCurrency": "PLN",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": { "@type": "Organization", "name": "Scanter Sp. z o.o." },
        "shippingDetails": { "@type": "OfferShippingDetails", "shippingRate": { "@type": "MonetaryAmount", "value": "0", "currency": "PLN" }, "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "PL" }, "deliveryTime": { "@type": "ShippingDeliveryTime", "handlingTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 2, "unitCode": "DAY" }, "transitTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 3, "unitCode": "DAY" } } },
        "hasMerchantReturnPolicy": { "@type": "MerchantReturnPolicy", "applicableCountry": "PL", "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow", "merchantReturnDays": 14, "returnMethod": "https://schema.org/ReturnByMail", "returnFees": "https://schema.org/FreeReturn" }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Zebra ZD421t — drukarka etykiet premium do EZD RP",
      "description": "Zaawansowana drukarka termotransferowa do EZD RP z systemem wymiany taśmy na cartridge. Szybszy druk, ruchomy czujnik etykiet.",
      "brand": { "@type": "Brand", "name": "Zebra" },
      "sku": "ZD421t",
      "image": "https://www.ezdrp24.com.pl/zd421_1.webp",
      "dateModified": new Date().toISOString().slice(0, 10),
      "offers": {
        "@type": "Offer",
        "price": "1850",
        "priceCurrency": "PLN",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": { "@type": "Organization", "name": "Scanter Sp. z o.o." },
        "shippingDetails": { "@type": "OfferShippingDetails", "shippingRate": { "@type": "MonetaryAmount", "value": "0", "currency": "PLN" }, "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "PL" }, "deliveryTime": { "@type": "ShippingDeliveryTime", "handlingTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 2, "unitCode": "DAY" }, "transitTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 3, "unitCode": "DAY" } } },
        "hasMerchantReturnPolicy": { "@type": "MerchantReturnPolicy", "applicableCountry": "PL", "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow", "merchantReturnDays": 14, "returnMethod": "https://schema.org/ReturnByMail", "returnFees": "https://schema.org/FreeReturn" }
      }
    }
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Czy mogę użyć zwykłej drukarki do etykiet w EZD RP?", "acceptedAnswer": { "@type": "Answer", "text": "Nie. System EZD RP wymaga drukarki termotransferowej, ponieważ wydruk musi być czytelny przez minimum 5 lat (wymóg Składu Chronologicznego). Zwykłe drukarki termiczne (paragonowe) generują wydruk, który blaknie po kilku miesiącach pod wpływem światła i wilgoci." }},
      { "@type": "Question", "name": "Jakie etykiety pasują do drukarek Zebra ZD230t i ZD421t?", "acceptedAnswer": { "@type": "Answer", "text": "Oba modele obsługują etykiety o szerokości do 104mm. Najczęściej stosowane rozmiary w EZD RP to 50×30 mm (na paczki i przesyłki) oraz 80×50 mm (na teczki aktowe i segregatory). Etykiety muszą być papierowe termotransferowe." }},
      { "@type": "Question", "name": "Co to jest system cartridge w Zebra ZD421t?", "acceptedAnswer": { "@type": "Answer", "text": "System cartridge to opatentowane przez Zebra rozwiązanie, w którym taśma barwiąca (ribbon) jest zamknięta w wymiennym wkładzie. Wymiana trwa około 30 sekund i nie wymaga nawijania taśmy na rdzeń — wystarczy wyjąć stary cartridge i włożyć nowy." }},
      { "@type": "Question", "name": "Ile etykiet wydrukuje jedna taśma barwiąca?", "acceptedAnswer": { "@type": "Answer", "text": "Standardowa taśma wax-resin o długości 74m i szerokości 110mm wystarczy na ok. 1500-2500 etykiet w formacie 50×30 mm, w zależności od pokrycia nadrukiem. Do każdego zestawu EZD dołączamy 2 taśmy gratis na start." }},
      { "@type": "Question", "name": "Czy drukarka EZD wymaga sterowników?", "acceptedAnswer": { "@type": "Answer", "text": "Drukarki Zebra ZD230t i ZD421t działają w trybie Plug & Play — po podłączeniu USB system Windows automatycznie wykrywa urządzenie. Opcjonalnie można zainstalować Zebra Setup Utilities do zaawansowanej konfiguracji." }}
    ]
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {productLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Header />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center gap-2 text-xs text-slate-500">
              <li><Link href="/" className="hover:text-violet-600 transition-colors">Strona główna</Link></li>
              <li>/</li>
              <li className="text-slate-800 font-medium">Drukarki etykiet do EZD</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative bg-white border-b border-slate-200 py-12 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 hidden lg:block">
            <Image
              src="/drukarki_ezd_hero.webp"
              alt="Drukarka etykiet Zebra na stanowisku EZD RP"
              fill
              className="object-contain object-right"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white from-40% via-white/90 via-55% to-transparent to-70%" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                Drukarki etykiet do <span className="text-violet-700">EZD RP</span>
              </h1>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl">
                System EZD RP wymaga <strong>drukarki termotransferowej</strong> do wydruku kodów kreskowych na teczki aktowe i Skład Chronologiczny. Drukarki termiczne (paragonowe) nie spełniają wymogu trwałości 5+ lat — wydruk blaknie. Oferujemy dwa modele Zebra, które spełniają wszystkie wymagania.
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

        {/* Dlaczego termotransfer */}
        <section className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
              Dlaczego drukarka do EZD musi być termotransferowa?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Trwałość 5+ lat</h3>
                <p className="text-sm text-slate-600">Instrukcja Kancelaryjna wymaga, aby kody na teczkach aktowych i w Składzie Chronologicznym były czytelne przez minimum 5 lat. Druk termotransferowy to gwarantuje.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Odporność na warunki</h3>
                <p className="text-sm text-slate-600">Wydruk termotransferowy jest odporny na wilgoć, światło i ścieranie — nie blaknie jak wydruk z drukarki termicznej (paragonowej). Idealne do archiwów.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Zgodność z NASK</h3>
                <p className="text-sm text-slate-600">Oba modele Zebra z naszej oferty spełniają rekomendacje NASK (operatora EZD RP) i PUW dotyczące jakości wydruku kodów kreskowych do rejestracji.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Porównanie */}
        <section id="porownanie" className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Zebra ZD230t vs ZD421t — którą wybrać?
            </h2>
            <p className="text-slate-600 mb-10 max-w-2xl">
              Obie drukarki spełniają wymagania EZD RP. Różnią się prędkością, wygodą obsługi i ceną. Poniżej szczegółowe porównanie.
            </p>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* ZD230t */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                <div className="relative h-64 bg-white flex items-center justify-center">
                  <Image
                    src="/zd230_1.webp"
                    alt="Zebra ZD230t drukarka etykiet do EZD - widok główny"
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900">Zebra ZD230t</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-700">Ekonomiczny</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">Podstawowa drukarka termotransferowa do EZD. Sprawdza się w mniejszych urzędach z niewielkim wolumenem drukowania etykiet.</p>
                  <ul className="space-y-2">
                    {[
                      "Szerokość druku: do 104 mm",
                      "Rozdzielczość: 203 dpi",
                      "Prędkość: do 102 mm/s",
                      "Druk termotransferowy (taśma wax/wax-resin)",
                      "Interfejs: USB",
                      "Trwałość wydruku: 5+ lat"
                    ].map((spec, i) => (
                      <li key={i} className="flex items-center text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ZD421t */}
              <div className="bg-violet-50 rounded-2xl border-2 border-violet-300 overflow-hidden relative">
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-violet-600 rounded-full text-white text-xs font-bold">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    Rekomendowany
                  </div>
                </div>
                <div className="relative h-64 bg-white flex items-center justify-center">
                  <Image
                    src="/zd421_1.webp"
                    alt="Zebra ZD421t drukarka etykiet premium do EZD - widok główny"
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900">Zebra ZD421t</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-violet-200 text-violet-700">Premium</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">Zaawansowana drukarka z systemem cartridge do szybkiej wymiany taśmy. Idealna dla urzędów z dużym wolumenem drukowania i wieloma stanowiskami.</p>
                  <ul className="space-y-2">
                    {[
                      "Szerokość druku: do 104 mm",
                      "Rozdzielczość: 203 lub 300 dpi",
                      "Prędkość: do 152 mm/s (50% szybsza)",
                      "System wymiany taśmy na cartridge",
                      "Ruchomy czujnik etykiet",
                      "Interfejs: USB + opcja Ethernet/Wi-Fi",
                      "Trwałość wydruku: 5+ lat"
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
              <table className="w-full text-sm border-collapse" aria-label="Porównanie drukarek etykiet Zebra ZD230t vs ZD421t do EZD RP">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th scope="col" className="text-left py-3 px-4 font-bold text-slate-900">Parametr</th>
                    <th scope="col" className="text-center py-3 px-4 font-bold text-slate-900">ZD230t</th>
                    <th scope="col" className="text-center py-3 px-4 font-bold text-violet-700 bg-violet-50">ZD421t</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Typ druku", "Termotransferowy", "Termotransferowy"],
                    ["Rozdzielczość", "203 dpi", "203 / 300 dpi"],
                    ["Prędkość druku", "do 102 mm/s", "do 152 mm/s"],
                    ["Szerokość druku", "do 104 mm", "do 104 mm"],
                    ["Wymiana taśmy", "Manualna (rdzeń)", "Cartridge (30 sek.)"],
                    ["Czujnik etykiet", "Stały", "Ruchomy (auto-kalibracja)"],
                    ["Interfejsy", "USB", "USB + Ethernet/Wi-Fi (opcja)"],
                    ["Obsługa sieciowa", "Nie", "Tak (opcja)"],
                    ["Trwałość wydruku", "5+ lat", "5+ lat"],
                    ["Zgodność EZD RP", "Tak", "Tak"],
                    ["Segment", "Ekonomiczny", "Premium"],
                    ["Dla kogo?", "Mniejsze urzędy, 1-2 stanowiska", "Większe urzędy, 3+ stanowisk"],
                  ].map(([param, zd230, zd421], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                      <td className="py-3 px-4 font-medium text-slate-700">{param}</td>
                      <td className="py-3 px-4 text-center text-slate-600">{zd230}</td>
                      <td className="py-3 px-4 text-center text-slate-900 font-medium bg-violet-50/50">{zd421}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Kiedy którą */}
        <section className="py-12 lg:py-16 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
              Którą drukarkę EZD wybrać?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Wybierz ZD230t jeśli:</h3>
                <ul className="space-y-2">
                  {[
                    "Masz 1-2 stanowiska EZD w urzędzie",
                    "Drukujesz do 100 etykiet dziennie",
                    "Potrzebujesz podłączenia tylko przez USB",
                    "Szukasz ekonomicznego rozwiązania",
                    "Nie wymieniasz taśmy częściej niż raz w tygodniu"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-600">
                      <Check className="w-4 h-4 text-slate-400 mr-2 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-500">
                  ZD230t znajdziesz w zestawach: <Link href="/#warianty" className="text-violet-600 hover:underline font-medium">Standard</Link>
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-violet-300">
                <h3 className="text-lg font-bold text-violet-700 mb-3">Wybierz ZD421t jeśli:</h3>
                <ul className="space-y-2">
                  {[
                    "Masz 3 lub więcej stanowisk EZD",
                    "Drukujesz ponad 100 etykiet dziennie",
                    "Chcesz szybką wymianę taśmy (system cartridge — 30 sek.)",
                    "Potrzebujesz druku sieciowego (Ethernet/Wi-Fi)",
                    "Zależy Ci na wyższej rozdzielczości (300 dpi)",
                    "Pracownicy mają obsługiwać drukarkę samodzielnie"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-600">
                      <Check className="w-4 h-4 text-violet-500 mr-2 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-500">
                  ZD421t znajdziesz w zestawach: <Link href="/#warianty" className="text-violet-600 hover:underline font-medium">Mini, Plus i Pro</Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ specyficzne */}
        <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
              Najczęstsze pytania o drukarki do EZD
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "Czy mogę użyć zwykłej drukarki do etykiet w EZD RP?",
                  a: "Nie. System EZD RP wymaga drukarki termotransferowej, ponieważ wydruk musi być czytelny przez minimum 5 lat (wymóg Składu Chronologicznego). Zwykłe drukarki termiczne (paragonowe) generują wydruk, który blaknie po kilku miesiącach pod wpływem światła i wilgoci."
                },
                {
                  q: "Jakie etykiety pasują do drukarek Zebra ZD230t i ZD421t?",
                  a: "Oba modele obsługują etykiety o szerokości do 104mm. Najczęściej stosowane rozmiary w EZD RP to 50×30 mm (na paczki i przesyłki) oraz 80×50 mm (na teczki aktowe i segregatory). Etykiety muszą być papierowe termotransferowe — nie samoprzylepne termiczne."
                },
                {
                  q: "Co to jest system cartridge w Zebra ZD421t?",
                  a: "System cartridge to opatentowane przez Zebra rozwiązanie, w którym taśma barwiąca (ribbon) jest zamknięta w wymiennym wkładzie. Wymiana trwa około 30 sekund i nie wymaga nawijania taśmy na rdzeń — wystarczy wyjąć stary cartridge i włożyć nowy. Jest to szczególnie wygodne gdy drukarkę obsługuje wiele osób."
                },
                {
                  q: "Ile etykiet wydrukuje jedna taśma barwiąca?",
                  a: "Standardowa taśma wax-resin o długości 74m i szerokości 110mm wystarczy na ok. 1500-2500 etykiet w formacie 50×30 mm, w zależności od pokrycia nadrukiem. Do każdego zestawu EZD dołączamy 2 taśmy gratis na start."
                },
                {
                  q: "Czy drukarka EZD wymaga sterowników?",
                  a: "Drukarki Zebra ZD230t i ZD421t działają w trybie Plug & Play — po podłączeniu USB system Windows automatycznie wykrywa urządzenie. Opcjonalnie można zainstalować Zebra Setup Utilities do zaawansowanej konfiguracji (kalibracja czujnika, ustawienia prędkości)."
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

        {/* Cross-links */}
        <section className="py-10 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Skompletuj stanowisko EZD RP</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/ezd-rp/czytniki" className="bg-slate-50 rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Czytniki kodów do EZD</p>
                  <p className="text-sm text-slate-500 mt-1">Zebra DS2208 vs DS2278</p>
                </div>
                <ArrowRight className="w-5 h-5 text-violet-600 shrink-0" />
              </Link>
              <Link href="/ezd-rp/skanery" className="bg-slate-50 rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Skanery dokumentów do EZD</p>
                  <p className="text-sm text-slate-500 mt-1">Epson DS-730DN vs DS-790Wn</p>
                </div>
                <ArrowRight className="w-5 h-5 text-violet-600 shrink-0" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 lg:py-16 bg-violet-50 border-b border-violet-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Potrzebujesz drukarki do EZD RP?
            </h2>
            <p className="text-slate-600 mb-6 max-w-xl mx-auto">
              Zamów drukarkę osobno lub w kompletnym zestawie EZD ze skanerem i czytnikiem kodów. Faktura VAT z odroczonym terminem płatności.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/#warianty"
                className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-bold rounded-full hover:bg-violet-700 transition-colors"
              >
                Zobacz zestawy z drukarką <ArrowRight className="w-4 h-4" />
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
