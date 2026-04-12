import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://ezdrp24.com.pl'),
  alternates: {
    canonical: '/',
  },
  title: "Sprzęt do EZD RP - Zestawy: Skanery, Drukarki Etykiet, Czytniki Kodów",
  description: "Kompletne stanowiska pracy dla systemu EZD RP. Skanery OCR (PDF/A), drukarki etykiet do składu chronologicznego, czytniki do RPW. Zgodność z NASK. Sprawdź ofertę dla urzędów.",
  keywords: ["EZD RP", "system EZD RP", "skaner do EZD", "drukarka etykiet EZD", "czytnik kodów kreskowych", "skład chronologiczny", "RPW", "NASK", "cyfryzacja urzędu", "zestaw ezd"],
  authors: [{ name: "Scanter Sp. z o.o." }],
  openGraph: {
    title: "Zestawy sprzętowe do systemu EZD RP",
    description: "Skanery, drukarki i czytniki zgodne z wymogami EZD RP. Wyposażenie punktów kancelaryjnych i sekretariatów.",
    url: "https://ezdrp24.com.pl",
    siteName: "EZD RP Zestawy",
    locale: "pl_PL",
    type: "website",
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
    "url": "https://ezdrp24.com.pl",
    "logo": "https://ezdrp24.com.pl/logo.png",
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
    "description": "Kompletne stanowiska pracy (skaner, drukarka, czytnik) zgodne z wymogami systemu EZD RP.",
    "brand": {
      "@type": "Brand",
      "name": "Scanter"
    },
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "2199",
      "highPrice": "5499",
      "priceCurrency": "PLN",
      "offerCount": "4",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <html lang="pl" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
        />
      </head>
      <body className={`${urbanist.className} bg-slate-50 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
