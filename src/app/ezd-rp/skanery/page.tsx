import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { Check, ArrowRight, Scan, Star, Monitor, Network } from "lucide-react";

export const metadata: Metadata = {
  title: "Skanery dokumentów do EZD RP — Epson DS-730DN vs DS-790Wn | Porównanie",
  description: "Który skaner dokumentów do EZD RP wybrać? Porównanie Epson DS-730DN (40 stron/min) i DS-790Wn (z ekranem dotykowym). OCR, PDF/A, skanowanie dwustronne. Zgodność z NASK.",
  keywords: ["EZD skaner", "skaner dokumentów EZD", "skaner do EZD RP", "Epson DS-730DN", "Epson DS-790Wn", "skaner OCR EZD", "skaner PDF/A", "skaner ADF EZD"],
  alternates: {
    canonical: "https://ezdrp24.com.pl/ezd-rp/skanery",
  },
  openGraph: {
    title: "Skanery dokumentów do EZD RP — Epson DS-730DN vs DS-790Wn",
    description: "Porównanie skanerów do systemu EZD RP. OCR, PDF/A, skanowanie dwustronne, podajnik ADF. Zgodność z NASK.",
    url: "https://ezdrp24.com.pl/ezd-rp/skanery",
  },
};

export default function SkaneryPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://ezdrp24.com.pl" },
      { "@type": "ListItem", "position": 2, "name": "Skanery dokumentów do EZD", "item": "https://ezdrp24.com.pl/ezd-rp/skanery" }
    ]
  };

  const productLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Epson DS-730DN — skaner dokumentów do EZD RP",
      "description": "Wydajny skaner dokumentów z podajnikiem ADF do systemu EZD RP. 40 stron/minutę, skanowanie dwustronne, OCR z warstwą tekstową, format PDF/A. Interfejs USB + Ethernet.",
      "brand": { "@type": "Brand", "name": "Epson" },
      "sku": "DS-730DN",
      "image": "https://www.ezdrp24.com.pl/ds730_1.webp",
      "dateModified": new Date().toISOString().slice(0, 10),
      "offers": {
        "@type": "Offer",
        "price": "1649",
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
      "name": "Epson DS-790Wn — skaner dokumentów z ekranem do EZD RP",
      "description": "Samodzielny skaner EZD z dużym ekranem dotykowym. Skanowanie bezpośrednio do folderu sieciowego bez podłączania do PC. Integracja z DocuScan, Wi-Fi + Ethernet.",
      "brand": { "@type": "Brand", "name": "Epson" },
      "sku": "DS-790Wn",
      "image": "https://www.ezdrp24.com.pl/ds790_1.webp",
      "dateModified": new Date().toISOString().slice(0, 10),
      "offers": {
        "@type": "Offer",
        "price": "2750",
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
      { "@type": "Question", "name": "Czy zwykły skaner biurkowy (flatbed) wystarczy do EZD RP?", "acceptedAnswer": { "@type": "Answer", "text": "Technicznie tak, ale jest to bardzo niepraktyczne. Skaner flatbed wymaga ręcznego podawania każdej kartki. Skanery z podajnikiem ADF (jak Epson DS-730DN i DS-790Wn) automatycznie pobierają kolejne strony i skanują obie strony jednocześnie — przy 40-45 stronach na minutę różnica jest ogromna." }},
      { "@type": "Question", "name": "Co to jest PDF/A i dlaczego EZD RP wymaga tego formatu?", "acceptedAnswer": { "@type": "Answer", "text": "PDF/A (ISO 19005) to wersja PDF zaprojektowana do długoterminowej archiwizacji. W odróżnieniu od zwykłego PDF, zawiera wszystkie fonty i zasoby w pliku — dokument wygląda identycznie na każdym urządzeniu, nawet za 20 lat. EZD RP wymaga PDF/A ponieważ dokumenty muszą być archiwizowane zgodnie z Instrukcją Kancelaryjną." }},
      { "@type": "Question", "name": "Czym jest DocuScan w Epson DS-790Wn?", "acceptedAnswer": { "@type": "Answer", "text": "DocuScan to oprogramowanie Epson umożliwiające skanowanie bezpośrednio do systemu EZD RP bez podłączania do komputera. Na ekranie dotykowym skanera wybierasz profil, kładziesz dokumenty w podajniku i naciskasz start. Skan trafia automatycznie do wskazanego folderu sieciowego." }},
      { "@type": "Question", "name": "Ile dokumentów dziennie obsługują te skanery?", "acceptedAnswer": { "@type": "Answer", "text": "DS-730DN skanuje 40 stron/min (80 obrazów w trybie duplex). DS-790Wn jest szybszy: 45 stron/min. W praktyce typowe stanowisko EZD w urzędzie gminy skanuje 50-200 dokumentów dziennie — oba modele obsłużą to bez problemu. Zalecany cykl pracy to do 6000 stron dziennie." }},
      { "@type": "Question", "name": "Czy skanery Epson współpracują z oprogramowaniem EZD RP od NASK?", "acceptedAnswer": { "@type": "Answer", "text": "Tak. Oba skanery obsługują standardowe interfejsy TWAIN i ISIS, z którymi integruje się system EZD RP. DS-730DN wymaga sterownika na PC. DS-790Wn może dodatkowo skanować bezpośrednio do folderu sieciowego (standalone)." }}
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
              <li className="text-slate-800 font-medium">Skanery dokumentów do EZD</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative bg-white border-b border-slate-200 py-12 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 hidden lg:block">
            <Image
              src="/skanery_ezd_hero.webp"
              alt="Skaner dokumentów Epson na stanowisku EZD RP"
              fill
              className="object-contain object-right"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white from-40% via-white/90 via-55% to-transparent to-70%" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                Skanery dokumentów do <span className="text-violet-700">EZD RP</span>
              </h1>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl">
                Skaner dokumentów jest kluczowym urządzeniem na stanowisku EZD RP — tworzy <strong>cyfrowy obraz dokumentu z warstwą tekstową (OCR)</strong> i zapisuje go w formacie <strong>PDF/A</strong> zgodnie z wymaganiami Instrukcji Kancelaryjnej. Oferujemy dwa skanery Epson z podajnikiem ADF i skanowaniem dwustronnym.
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

        {/* Dlaczego skaner z OCR */}
        <section className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
              Dlaczego skaner do EZD musi mieć OCR i PDF/A?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">OCR — warstwa tekstowa</h3>
                <p className="text-sm text-slate-600">Instrukcja Kancelaryjna wymaga, aby zeskanowane dokumenty posiadały warstwę tekstową umożliwiającą wyszukiwanie. OCR (Optical Character Recognition) automatycznie rozpoznaje tekst na skanie i dodaje go jako przeszukiwalną warstwę.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">PDF/A — format archiwizacyjny</h3>
                <p className="text-sm text-slate-600">PDF/A to standard ISO do długoterminowej archiwizacji dokumentów cyfrowych. W odróżnieniu od zwykłego PDF, gwarantuje że dokument będzie czytelny niezależnie od oprogramowania — nawet za 10 czy 20 lat. EZD RP wymaga tego formatu.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">ADF — podajnik automatyczny</h3>
                <p className="text-sm text-slate-600">Podajnik ADF (Automatic Document Feeder) umożliwia skanowanie wielu stron bez ręcznego podawania. Oba skanery Epson obsługują skanowanie dwustronne (duplex) — dokument przechodzi raz przez podajnik, a skaner rejestruje obie strony jednocześnie.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Porównanie */}
        <section id="porownanie" className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Epson DS-730DN vs DS-790Wn — który skaner wybrać?
            </h2>
            <p className="text-slate-600 mb-10 max-w-2xl">
              Oba skanery tworzą pliki PDF/A z OCR i obsługują skanowanie dwustronne. Kluczowa różnica: DS-730DN wymaga PC, <strong>DS-790Wn działa samodzielnie</strong> dzięki ekranowi dotykowemu.
            </p>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* DS-730DN */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                <div className="relative h-64 bg-white flex items-center justify-center">
                  <Image
                    src="/ds730_1.webp"
                    alt="Epson DS-730DN skaner dokumentów do EZD - widok główny"
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Network className="w-5 h-5 text-slate-500" />
                      Epson DS-730DN
                    </h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-700">Sieciowy</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">Wydajny skaner sieciowy do stanowiska EZD podłączonego do PC. Szybki, cichy, idealny do kancelarii z jednym lub dwoma stanowiskami obsługiwanymi z komputera.</p>
                  <ul className="space-y-2">
                    {[
                      "Prędkość: 40 stron / minutę (80 obrazów z dupleksem)",
                      "Skanowanie dwustronne (duplex) w jednym przebiegu",
                      "OCR z warstwą tekstową",
                      "Format wyjściowy: PDF/A, PDF, JPEG, TIFF",
                      "Podajnik ADF: do 100 arkuszy",
                      "Interfejs: USB 3.0 + Ethernet (RJ-45)",
                      "Rozdzielczość: do 600 × 600 dpi"
                    ].map((spec, i) => (
                      <li key={i} className="flex items-center text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* DS-790Wn */}
              <div className="bg-violet-50 rounded-2xl border-2 border-violet-300 overflow-hidden relative">
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-violet-600 rounded-full text-white text-xs font-bold">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    Samodzielny
                  </div>
                </div>
                <div className="relative h-64 bg-white flex items-center justify-center">
                  <Image
                    src="/ds790_1.webp"
                    alt="Epson DS-790Wn skaner dokumentów z ekranem dotykowym do EZD - widok główny"
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Monitor className="w-5 h-5 text-violet-500" />
                      Epson DS-790Wn
                    </h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-violet-200 text-violet-700">Z ekranem</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">Skaner z dużym ekranem dotykowym — skanuj bezpośrednio do folderu sieciowego bez komputera. Idealny do pracy grupowej, gdzie wiele osób korzysta z jednego skanera.</p>
                  <ul className="space-y-2">
                    {[
                      "Prędkość: 45 stron / minutę (90 obrazów z dupleksem)",
                      "Duży ekran dotykowy 4.3\" — obsługa bez PC",
                      "Skanowanie do folderu sieciowego / email / chmury",
                      "OCR z warstwą tekstową + DocuScan",
                      "Format wyjściowy: PDF/A, PDF, JPEG, TIFF",
                      "Podajnik ADF: do 100 arkuszy",
                      "Interfejs: USB 3.0 + Ethernet + Wi-Fi",
                      "Rozdzielczość: do 600 × 600 dpi"
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
              <table className="w-full text-sm border-collapse" aria-label="Porównanie skanerów dokumentów Epson DS-730DN vs DS-790Wn do EZD RP">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th scope="col" className="text-left py-3 px-4 font-bold text-slate-900">Parametr</th>
                    <th scope="col" className="text-center py-3 px-4 font-bold text-slate-900">DS-730DN</th>
                    <th scope="col" className="text-center py-3 px-4 font-bold text-violet-700 bg-violet-50">DS-790Wn</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Prędkość (simplex)", "40 stron/min", "45 stron/min"],
                    ["Prędkość (duplex)", "80 obrazów/min", "90 obrazów/min"],
                    ["Ekran dotykowy", "Nie", "Tak (4.3\")"],
                    ["Praca bez komputera", "Nie", "Tak — skanowanie standalone"],
                    ["Skan do folderu sieciowego", "Przez oprogramowanie PC", "Bezpośrednio ze skanera"],
                    ["OCR + PDF/A", "Tak", "Tak"],
                    ["Skanowanie dwustronne", "Tak (jednoprzebiegowe)", "Tak (jednoprzebiegowe)"],
                    ["Podajnik ADF", "100 arkuszy", "100 arkuszy"],
                    ["Rozdzielczość", "600 × 600 dpi", "600 × 600 dpi"],
                    ["USB 3.0", "Tak", "Tak"],
                    ["Ethernet (RJ-45)", "Tak", "Tak"],
                    ["Wi-Fi", "Nie", "Tak"],
                    ["DocuScan", "Nie", "Tak"],
                    ["Integracja z EZD RP", "Przez sterownik TWAIN/ISIS", "Przez sterownik + standalone"],
                    ["Segment", "Stanowisko z PC", "Praca grupowa / bez PC"],
                    ["Dla kogo?", "1-2 stanowiska, obsługa z komputera", "3+ osób, wspólny skaner, mobilność"],
                  ].map(([param, ds730, ds790], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                      <td className="py-3 px-4 font-medium text-slate-700">{param}</td>
                      <td className="py-3 px-4 text-center text-slate-600">{ds730}</td>
                      <td className="py-3 px-4 text-center text-slate-900 font-medium bg-violet-50/50">{ds790}</td>
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
              Który skaner EZD wybrać?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Network className="w-5 h-5 text-slate-500" />
                  Wybierz DS-730DN jeśli:
                </h3>
                <ul className="space-y-2">
                  {[
                    "Skaner będzie podłączony do jednego komputera (USB lub Ethernet)",
                    "Skanowanie obsługuje jedna lub dwie osoby z poziomu PC",
                    "Wystarczy Ci 40 stron/minutę",
                    "Nie potrzebujesz Wi-Fi — masz kabel Ethernet lub USB",
                    "Szukasz sprawdzonego, wydajnego skanera w niższej cenie"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-600">
                      <Check className="w-4 h-4 text-slate-400 mr-2 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-500">
                  DS-730DN znajdziesz w zestawach: <Link href="/#warianty" className="text-violet-600 hover:underline font-medium">Standard i Plus</Link>
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-violet-300">
                <h3 className="text-lg font-bold text-violet-700 mb-3 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-violet-500" />
                  Wybierz DS-790Wn jeśli:
                </h3>
                <ul className="space-y-2">
                  {[
                    "Skaner ma być współdzielony przez 3+ osób w sekretariacie",
                    "Chcesz skanować bez włączania komputera (ekran dotykowy)",
                    "Potrzebujesz skanowania do folderu sieciowego bezpośrednio ze skanera",
                    "Chcesz Wi-Fi — skaner może stać w dowolnym miejscu w biurze",
                    "Potrzebujesz wyższej prędkości (45 stron/min)",
                    "Chcesz integrację z DocuScan do automatyzacji przepływu dokumentów"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-600">
                      <Check className="w-4 h-4 text-violet-500 mr-2 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-500">
                  DS-790Wn znajdziesz w zestawie: <Link href="/#warianty" className="text-violet-600 hover:underline font-medium">Pro</Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
              Najczęstsze pytania o skanery do EZD
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "Czy zwykły skaner biurkowy (flatbed) wystarczy do EZD RP?",
                  a: "Technicznie tak, ale jest to bardzo niepraktyczne. Skaner flatbed wymaga ręcznego podawania każdej kartki — przy dużej liczbie dokumentów to strata czasu. Skanery z podajnikiem ADF (jak Epson DS-730DN i DS-790Wn) automatycznie pobierają kolejne strony i skanują obie strony jednocześnie. Przy 40-45 stronach na minutę różnica jest ogromna."
                },
                {
                  q: "Co to jest PDF/A i dlaczego EZD RP wymaga tego formatu?",
                  a: "PDF/A (ISO 19005) to wersja PDF zaprojektowana do długoterminowej archiwizacji. W odróżnieniu od zwykłego PDF, zawiera wszystkie fonty i zasoby w pliku — dokument wygląda identycznie na każdym urządzeniu, nawet za 20 lat. EZD RP wymaga PDF/A ponieważ dokumenty w systemie muszą być archiwizowane zgodnie z Instrukcją Kancelaryjną."
                },
                {
                  q: "Czym jest DocuScan w Epson DS-790Wn?",
                  a: "DocuScan to oprogramowanie Epson umożliwiające skanowanie bezpośrednio do systemu EZD RP bez pośrednictwa komputera. Na ekranie dotykowym skanera wybierasz profil (np. \"Do EZD - PDF/A\"), kładziesz dokumenty w podajniku i naciskasz start. Skan trafia automatycznie do wskazanego folderu sieciowego, skąd system EZD go pobiera."
                },
                {
                  q: "Ile dokumentów dziennie obsługują te skanery?",
                  a: "DS-730DN skanuje 40 stron/min (80 obrazów w trybie duplex) — przy 8-godzinnej pracy to teoretycznie 19 200 stron. DS-790Wn jest jeszcze szybszy: 45 stron/min. W praktyce typowe stanowisko EZD w urzędzie gminy skanuje 50-200 dokumentów dziennie — oba modele obsłużą to bez problemu. Zalecany cykl pracy to do 6000 stron dziennie."
                },
                {
                  q: "Czy skanery Epson współpracują z oprogramowaniem EZD RP od NASK?",
                  a: "Tak. Oba skanery obsługują standardowe interfejsy TWAIN i ISIS, z którymi integruje się system EZD RP. DS-730DN wymaga sterownika na PC. DS-790Wn może dodatkowo skanować bezpośrednio do folderu sieciowego (standalone) — EZD RP automatycznie importuje dokumenty z tego folderu."
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
              <Link href="/ezd-rp/drukarki" className="bg-slate-50 rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Drukarki etykiet do EZD</p>
                  <p className="text-sm text-slate-500 mt-1">Zebra ZD230t vs ZD421t</p>
                </div>
                <ArrowRight className="w-5 h-5 text-violet-600 shrink-0" />
              </Link>
              <Link href="/ezd-rp/czytniki" className="bg-slate-50 rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Czytniki kodów do EZD</p>
                  <p className="text-sm text-slate-500 mt-1">Zebra DS2208 vs DS2278</p>
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
              Potrzebujesz skanera dokumentów do EZD RP?
            </h2>
            <p className="text-slate-600 mb-6 max-w-xl mx-auto">
              Zamów skaner osobno lub w kompletnym zestawie EZD z drukarką etykiet i czytnikiem kodów. Faktura VAT z odroczonym terminem płatności.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/#warianty"
                className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-bold rounded-full hover:bg-violet-700 transition-colors"
              >
                Zobacz zestawy ze skanerem <ArrowRight className="w-4 h-4" />
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
