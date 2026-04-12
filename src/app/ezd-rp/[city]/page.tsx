import { notFound } from "next/navigation";
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
    }
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const cityData = cities.find((c) => c.slug === city);

  if (!cityData) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <Hero cityName={cityData.name} />
        <Features />
        <div className="bg-violet-50 border-y border-violet-100 py-4 text-center text-sm text-violet-800">
            Realizujemy zamówienia dla urzędów, szkół i jednostek publicznych w lokalizacji: <strong>{cityData.name}</strong> i całe woj. {cityData.voivodeship}.
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
