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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
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
