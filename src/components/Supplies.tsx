import Link from "next/link";
import { StickyNote, ScrollText, Settings, Phone } from "lucide-react";

export function Supplies() {
  return (
    <section id="materialy" className="py-8 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Materiały eksploatacyjne do EZD
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Zapewniamy ciągłość pracy Twoich urządzeń. Oferujemy oryginalne materiały eksploatacyjne dostosowane do wymogów archiwizacji EZD RP.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {/* Etykiety */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-slate-100">
              <StickyNote className="w-7 h-7 text-violet-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Etykiety</h3>
            <ul className="space-y-3 mb-6 text-slate-600 text-base">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2.5 shrink-0"></span>
                Różne rozmiary (50×30, 80×50 mm)
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2 shrink-0"></span>
                Papier termiczny i termotransferowy
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2 shrink-0"></span>
                Rolki 1000-2000 etykiet
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2 shrink-0"></span>
                Trwałe, zgodne z wymogami archiwum
              </li>
            </ul>
            <Link 
              href="https://scanter.pl/do-ezd/" 
              target="_blank" 
              className="text-violet-700 font-semibold text-sm hover:underline inline-flex items-center"
            >
              Zobacz etykiety →
            </Link>
          </div>

          {/* Taśmy */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-slate-100">
              <ScrollText className="w-7 h-7 text-violet-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Taśmy barwiące</h3>
            <ul className="space-y-3 mb-6 text-slate-600 text-base">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2.5 shrink-0"></span>
                Woskowe, woskowo-żywiczne, żywiczne
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2 shrink-0"></span>
                Szerokości 110 mm (standard Zebra)
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2 shrink-0"></span>
                Długości 74m oraz 300m
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2 shrink-0"></span>
                Gwarancja czytelności wydruku
              </li>
            </ul>
            <Link 
              href="https://scanter.pl/131-do-ezd/" 
              target="_blank" 
              className="text-violet-700 font-semibold text-sm hover:underline inline-flex items-center"
            >
              Zobacz taśmy →
            </Link>
          </div>

          {/* Serwis */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-slate-100">
              <Settings className="w-7 h-7 text-violet-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Serwis i wsparcie</h3>
            <ul className="space-y-3 mb-6 text-slate-600 text-base">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2.5 shrink-0"></span>
                Wsparcie techniczne i merytoryczne
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2 shrink-0"></span>
                Konfiguracja urządzeń pod EZD
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2 shrink-0"></span>
                Pomoc w doborze materiałów
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2 shrink-0"></span>
                Szybka dostawa (zwykle 24h)
              </li>
            </ul>
            <Link 
              href="https://scanter.pl/kontakt" 
              target="_blank" 
              className="text-violet-700 font-semibold text-sm hover:underline inline-flex items-center"
            >
              Skontaktuj się →
            </Link>
          </div>
        </div>

        <div className="mt-12 bg-violet-50 border border-violet-100 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-full text-violet-600 shadow-sm shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-violet-900 text-lg">Potrzebujesz pomocy w doborze materiałów?</h4>
              <p className="text-violet-700 mt-1 text-sm">
                Skontaktuj się z nami – pomożemy dobrać odpowiednie etykiety i taśmy oraz oszacujemy zużycie.
              </p>
            </div>
          </div>
          <a 
            href="tel:+48601828711" 
            className="whitespace-nowrap px-6 py-3 bg-white text-violet-700 font-semibold rounded-xl border border-violet-200 hover:bg-violet-50 transition-colors shadow-sm"
          >
            Zadzwoń: +48 601 828 711
          </a>
        </div>
      </div>
    </section>
  );
}

