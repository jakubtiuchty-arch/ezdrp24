import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { cities } from "@/lib/cities";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Products } from "@/components/Products";
import { Supplies } from "@/components/Supplies";
import { TechFAQ } from "@/components/TechFAQ";
import { GiftSection } from "@/components/GiftSection";
import { Pricing } from "@/components/Pricing";
import { ContactForm } from "@/components/ContactForm";
import { StatsSection } from "@/components/StatsSection";
import { Footer } from "@/components/Footer";

// Generowanie statycznych ścieżek dla miast (SSG)
export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.slug,
  }));
}

type Props = {
  params: Promise<{ city: string }>;
};

// Generowanie dynamicznych meta tagów
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const cityData = cities.find((c) => c.slug === city);
  
  if (!cityData) {
    return {
      title: "Zestawy EZD RP",
    };
  }

  return {
    title: `Zestawy EZD RP ${cityData.name} - Sprzęt dla Urzędów i Jednostek`,
    description: `Kompletne zestawy EZD RP dla jednostek w mieście ${cityData.name} (woj. ${cityData.voivodeship}). Skanery, drukarki i czytniki zgodne z wymogami. Szybka dostawa i faktura z odroczonym terminem.`,
    keywords: [`EZD RP ${cityData.name}`, `zestawy ezd ${cityData.name}`, `sprzęt ezd ${cityData.name}`, "skanery dokumentów", "drukarki etykiet"],
    alternates: {
      canonical: `https://ezdrp24.com.pl/ezd-rp/${cityData.slug}`,
    },
    openGraph: {
      title: `Zestawy EZD RP ${cityData.name} — Sprzęt dla Urzędów`,
      description: `Dostarczamy sprzęt EZD RP do urzędów w mieście ${cityData.name} i woj. ${cityData.voivodeship}. Skanery, drukarki etykiet, czytniki kodów.`,
      url: `https://ezdrp24.com.pl/ezd-rp/${cityData.slug}`,
      images: [{ url: "https://ezdrp24.com.pl/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const cityData = cities.find((c) => c.slug === city);

  if (!cityData) {
    notFound();
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Strona główna",
        "item": "https://ezdrp24.com.pl"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `EZD RP ${cityData.name}`,
        "item": `https://ezdrp24.com.pl/ezd-rp/${cityData.slug}`
      }
    ]
  };

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Scanter Sp. z o.o.",
    "description": `Dostawca sprzętu EZD RP dla urzędów i jednostek publicznych w mieście ${cityData.name} i woj. ${cityData.voivodeship}.`,
    "url": `https://ezdrp24.com.pl/ezd-rp/${cityData.slug}`,
    "telephone": "+48-601-828-711",
    "email": "biuro@scanter.pl",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ul. Poświęcka 1a",
      "addressLocality": "Wrocław",
      "postalCode": "51-128",
      "addressCountry": "PL"
    },
    "areaServed": [
      { "@type": "City", "name": cityData.name },
      { "@type": "State", "name": `województwo ${cityData.voivodeship}` }
    ],
    "priceRange": "2299-5599 PLN netto"
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />
      <main className="flex-grow">
        <Hero cityName={cityData.name} />
        <Features />
        {/* Breadcrumb nawigacja */}
        <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center gap-2 text-xs text-slate-500">
              <li><Link href="/" className="hover:text-violet-600 transition-colors">Strona główna</Link></li>
              <li>/</li>
              <li className="text-slate-800 font-medium">EZD RP {cityData.name}</li>
            </ol>
          </div>
        </nav>

        {/* Unikalna treść per miasto */}
        <div className="bg-violet-50 border-b border-violet-100 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {cityData.intro}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Obsługujemy m.in.: {cityData.institutions}. Czas dostawy: <strong>{cityData.deliveryTime}</strong>.
            </p>
          </div>
        </div>
        <Products />
        <Pricing />
        <GiftSection />
        <Supplies /> {/* Przeniesione tutaj */}
        <ContactForm />
        <StatsSection />
        <TechFAQ />
      </main>
      <Footer />
    </div>
  );
}
