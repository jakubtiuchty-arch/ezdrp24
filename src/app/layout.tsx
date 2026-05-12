import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ezdrp24.com.pl'),
  alternates: {
    canonical: '/',
  },
  title: "Sprzęt EZD RP — Skanery, Drukarki, Czytniki dla Urzędów",
  description: "Kompletne stanowiska pracy dla systemu EZD RP. Skanery OCR (PDF/A), drukarki etykiet do składu chronologicznego, czytniki do RPW. Zgodność z NASK. Sprawdź ofertę dla urzędów.",
  keywords: ["EZD RP", "system EZD RP", "skaner do EZD", "drukarka etykiet EZD", "czytnik kodów kreskowych", "skład chronologiczny", "RPW", "NASK", "cyfryzacja urzędu", "zestaw ezd"],
  authors: [{ name: "Scanter Sp. z o.o." }],
  openGraph: {
    title: "Zestawy sprzętowe do systemu EZD RP",
    description: "Skanery, drukarki i czytniki zgodne z wymogami EZD RP. Wyposażenie punktów kancelaryjnych i sekretariatów.",
    url: "https://www.ezdrp24.com.pl",
    siteName: "EZD RP Zestawy",
    locale: "pl_PL",
    type: "website",
    images: [{
      url: "https://www.ezdrp24.com.pl/og-image.png",
      width: 1200,
      height: 630,
      alt: "Zestawy sprzętowe EZD RP — skanery, drukarki etykiet, czytniki kodów",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sprzęt do EZD RP — Zestawy dla Urzędów",
    description: "Kompletne stanowiska pracy EZD RP: skanery OCR, drukarki etykiet, czytniki kodów. Zgodność z NASK.",
    images: ["https://www.ezdrp24.com.pl/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Struktura JSON-LD dla Organizacji
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Scanter Sp. z o.o.",
    "url": "https://www.ezdrp24.com.pl",
    "logo": "https://www.ezdrp24.com.pl/ezdrp_logo.png",
    "email": "biuro@scanter.pl",
    "description": "Dostawca sprzętu do Elektronicznego Zarządzania Dokumentacją (EZD RP) dla administracji publicznej.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+48-601-828-711",
      "contactType": "sales",
      "areaServed": "PL",
      "availableLanguage": "Polish"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ul. Poświęcka 1a",
      "addressLocality": "Wrocław",
      "postalCode": "51-128",
      "addressCountry": "PL"
    }
  };

  // Struktura JSON-LD dla Produktów (Zestawy) - Agregacja
  // To sprawi, że Google może wyświetlić: "Cena: od 2199 zł" w wynikach
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Zestawy sprzętowe do EZD RP",
    "description": "Kompletne zestawy sprzętu do EZD RP (skaner, drukarka, czytnik) zgodne z wymogami systemu EZD RP i rekomendacjami NASK.",
    "dateModified": new Date().toISOString().slice(0, 10),
    "brand": {
      "@type": "Brand",
      "name": "Scanter"
    },
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "2299",
      "highPrice": "5599",
      "priceCurrency": "PLN",
      "offerCount": "4",
      "availability": "https://schema.org/InStock",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "21.94",
          "currency": "PLN"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "PL"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 2, "unitCode": "DAY" },
          "transitTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 3, "unitCode": "DAY" }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "PL",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 14,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    }
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Jakie są wymagania sprzętowe EZD RP dla czytników kodów?",
        "acceptedAnswer": { "@type": "Answer", "text": "Czytniki kodów muszą obsługiwać standardy 1D i 2D (w tym QR) używane na etykietach RPW. Urządzenia Zebra DS2208 i DS2278 są w pełni zgodne z tymi wymogami i integrują się z systemem EZD RP bez dodatkowych sterowników. Każdy czytnik przechodzi weryfikację zgodności przed wysyłką." }
      },
      {
        "@type": "Question",
        "name": "Czy skaner EZD tworzy pliki PDF/A z warstwą tekstową?",
        "acceptedAnswer": { "@type": "Answer", "text": "Tak. Skanery Epson DS-730DN i DS-790Wn posiadają sprzętowe wsparcie OCR i generują pliki PDF/A zgodne z Instrukcją Kancelaryjną. Format PDF/A zapewnia długoterminową archiwizację i pełną przeszukiwalność zeskanowanych dokumentów w systemie EZD RP." }
      },
      {
        "@type": "Question",
        "name": "Jaka drukarka etykiet do EZD jest wymagana do Składu Chronologicznego?",
        "acceptedAnswer": { "@type": "Answer", "text": "Do Składu Chronologicznego wymagana jest drukarka termotransferowa, która zapewnia trwałość wydruku powyżej 5 lat (wymóg archiwizacji). Drukarki termiczne (paragonowe) nie spełniają tego wymogu — wydruk blaknie. Modele Zebra ZD230t i ZD421t spełniają ten standard." }
      },
      {
        "@type": "Question",
        "name": "Czy zestawy EZD są zgodne z wytycznymi NASK?",
        "acceptedAnswer": { "@type": "Answer", "text": "Tak, konfiguracje sprzętowe zostały dobrane zgodnie z rekomendacjami NASK (operatora EZD RP) oraz PUW. Zestawy są gotowe do pracy w urzędach administracji publicznej i przechodzą weryfikację zgodności przed dostawą." }
      },
      {
        "@type": "Question",
        "name": "Czym jest system EZD RP i dlaczego urzędy go potrzebują?",
        "acceptedAnswer": { "@type": "Answer", "text": "EZD RP (Elektroniczne Zarządzanie Dokumentacją) to system wdrażany w polskiej administracji publicznej, umożliwiający cyfrowy obieg dokumentów. Urzędy potrzebują specjalistycznego sprzętu: skanerów z OCR do digitalizacji, drukarek etykiet do Składu Chronologicznego oraz czytników kodów do rejestracji wpływów (RPW)." }
      },
      {
        "@type": "Question",
        "name": "Czy potrzebuję wszystkich trzech urządzeń — skanera, drukarki i czytnika?",
        "acceptedAnswer": { "@type": "Answer", "text": "Zależy od potrzeb stanowiska. Minimalne stanowisko kancelaryjne wymaga czytnika kodów i drukarki etykiet. Pełne stanowisko EZD RP obejmuje dodatkowo skaner dokumentów z OCR. Oferujemy zestawy Mini (2 urządzenia) od 2 299 zł netto oraz zestawy Standard/Plus/Pro (3 urządzenia) od 3 199 zł netto." }
      },
      {
        "@type": "Question",
        "name": "Jak długo trwa wdrożenie zestawu EZD na stanowisku?",
        "acceptedAnswer": { "@type": "Answer", "text": "Instalacja i konfiguracja zestawu EZD trwa ok. 15-30 minut na stanowisko. Urządzenia są typu Plug & Play — czytnik i drukarka działają po podłączeniu USB, skaner wymaga jednorazowej konfiguracji profilu skanowania. Dostarczamy instrukcje krok po kroku." }
      },
      {
        "@type": "Question",
        "name": "Jakie formaty kodów obsługują czytniki EZD?",
        "acceptedAnswer": { "@type": "Answer", "text": "Czytniki Zebra DS2208 i DS2278 obsługują wszystkie standardy kodów wymagane przez EZD RP: kody 1D (Code 128, EAN), kody 2D (Data Matrix, PDF417) oraz kody QR. Odczyt jest natychmiastowy — wystarczy jedno skanowanie bez konieczności celowania." }
      },
      {
        "@type": "Question",
        "name": "Czy oferujecie faktury z odroczonym terminem płatności?",
        "acceptedAnswer": { "@type": "Answer", "text": "Tak. Dla jednostek administracji publicznej oferujemy faktury VAT z odroczonym terminem płatności do 30 dni. Realizujemy również zamówienia na podstawie zamówień publicznych i zapytań ofertowych zgodnie z ustawą PZP." }
      },
      {
        "@type": "Question",
        "name": "Jaka jest różnica między Zebra DS2208 a DS2278?",
        "acceptedAnswer": { "@type": "Answer", "text": "Zebra DS2208 to czytnik przewodowy USB — niezawodny i ekonomiczny, idealny do stałego stanowiska. Zebra DS2278 to wersja bezprzewodowa Bluetooth z baterią na 14h pracy i zasięgiem 10m — lepsza dla okien podawczych i mobilnej rejestracji paczek. Oba modele obsługują te same formaty kodów." }
      },
      {
        "@type": "Question",
        "name": "Czym różni się Zebra ZD230t od ZD421t?",
        "acceptedAnswer": { "@type": "Answer", "text": "ZD230t to ekonomiczny model podstawowy — szerokość druku 104mm, druk termotransferowy. ZD421t to model premium z szybszym drukiem, ruchomym czujnikiem etykiet i systemem wymiany taśmy na cartridge (najwygodniejszy sposób wymiany). ZD421t jest zalecany przy większych wolumenach drukowania." }
      },
      {
        "@type": "Question",
        "name": "Czy potrzebne jest szkolenie pracowników z obsługi sprzętu EZD?",
        "acceptedAnswer": { "@type": "Answer", "text": "Sprzęt jest zaprojektowany do intuicyjnej obsługi i nie wymaga specjalistycznego szkolenia. Czytnik i drukarka działają od razu po podłączeniu. Do każdego zestawu dołączamy krótką instrukcję po polsku. W razie pytań nasz zespół wsparcia technicznego jest dostępny telefonicznie." }
      }
    ]
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Jak działa sprzęt w systemie EZD RP — obieg dokumentów",
    "description": "Cztery etapy pracy z urządzeniami EZD RP: od rejestracji wpływu po archiwizację cyfrową.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Rejestracja w EZD RP",
        "text": "Skanowanie kodu z koperty czytnikiem EZD. Automatyczny zapis w rejestrze wpływów (RPW) zgodnie z procedurą."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Skanowanie do EZD",
        "text": "Skaner EZD tworzy cyfrowy obraz pisma z warstwą tekstową (OCR) i zapisuje jako PDF/A, gotowy do dekretacji."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Wydruk etykiet EZD",
        "text": "Drukarka EZD generuje trwałe kody kreskowe na teczki aktowe, segregatory i spisy spraw dla Składu Chronologicznego."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Archiwizacja cyfrowa",
        "text": "Dokumenty trafiają do repozytorium systemu. Sprzęt EZD gwarantuje czytelność i zgodność metadanych."
      }
    ]
  };

  const breadcrumbHomeLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Strona główna",
        "item": "https://www.ezdrp24.com.pl"
      }
    ]
  };

  return (
    <html lang="pl" className="scroll-smooth">
      <head>
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="+I313YAPVkKbg+vmJb3jRQ" async />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbHomeLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
        />
      </head>
      <body className={`${urbanist.className} bg-slate-50 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
