import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ArrowRight } from "lucide-react";

interface HeroProps {
  cityName?: string;
}

export function Hero({ cityName }: HeroProps) {
  return (
    <section className="relative overflow-hidden min-h-[500px] lg:min-h-[600px]">
      {/* Background Image */}
      <Image
        src="/hero_ezd_1.webp"
        alt="Zestaw sprzętu EZD RP - skaner, drukarka etykiet, czytnik kodów"
        fill
        className="object-cover object-[75%_70%] lg:object-[center_70%]"
        priority
      />
      
      {/* Overlay for text readability - stronger on mobile */}
      <div className="absolute inset-0 bg-white/90 lg:bg-transparent lg:bg-gradient-to-r lg:from-white lg:from-25% lg:via-white/90 lg:via-35% lg:to-transparent lg:to-50%" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-20 lg:pb-24">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Text Content */}
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-950 leading-tight tracking-tight drop-shadow-sm">
            Kompletne <span className="text-violet-700 block sm:inline">Zestawy EZD RP</span> {cityName && <span className="block text-slate-800 mt-2">{cityName}</span>}
            {!cityName && <span className="block text-xl sm:text-2xl mt-3 font-normal text-slate-700">Sprzęt do EZD dla jednostek publicznych</span>}
          </h1>
          
          <p className="mt-4 text-base sm:text-lg text-slate-800 max-w-xl font-medium">
            {cityName 
              ? `Dostarczamy certyfikowany sprzęt EZD do urzędów i instytucji w mieście ${cityName} i okolicach. ` 
              : "Dostarczamy certyfikowany sprzęt do EZD RP: skanery dokumentów, drukarki etykiet i czytniki kodów kreskowych. "
            }
            Nasze urządzenia są w pełni zgodne z <strong className="font-bold text-slate-950">wymaganiami EZD RP</strong> w zakresie rejestracji wpływów i archiwizacji.
          </p>

          <ul className="mt-5 space-y-2 lg:space-y-3 text-slate-900">
            {[
              "Gotowe zestawy EZD do szybkiego wdrożenia w kancelarii.",
              "Skaner EZD z OCR (PDF/A) i drukarka kodów kreskowych.",
              "Pełna zgodność z wymaganiami Instrukcji Kancelaryjnej."
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-0.5 h-5 w-5 flex-none relative">
                   <CheckCircle className="w-5 h-5 text-emerald-600" strokeWidth={2} />
                </div>
                <span className="font-medium text-sm sm:text-base">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="#warianty"
              className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-200 bg-violet-600 rounded-full hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
            >
              <span>Zobacz zestawy</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 -z-10 rounded-full bg-violet-600 opacity-20 blur-lg transition-opacity duration-200 group-hover:opacity-40" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
