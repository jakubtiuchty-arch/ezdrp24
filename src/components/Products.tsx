import { Check, Bluetooth, Wifi, Maximize } from "lucide-react";

export function Products() {
  return (
    <section id="urzadzenia" className="py-8 lg:py-16 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 lg:mb-12 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Rekomendowane urządzenia i sprzęt EZD
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
            Dobieramy konfiguracje pod kątem wydajności, trwałości i zgodności z <strong>wymaganiami EZD RP</strong>. Poznaj nasze skanery i drukarki.
          </p>
        </div>

        {/* Czytniki */}
        <div className="mb-16">
          <h3 className="text-sm font-bold text-violet-700 uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="w-8 h-px bg-violet-300"></span> Czytniki Kodów do EZD
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <ProductCard
              title="Zebra DS2208"
              category="Skaner przewodowy"
              description="Niezawodny skaner biurkowy do szybkiej rejestracji wpływów w EZD. Odczytuje kody z kopert i naklejek."
              features={["Szybki odczyt kodów RPW", "Odporny na upadki", "Plug & Play (USB)"]}
              placeholderColor="bg-blue-50"
            />
            <ProductCard
              title="Zebra DS2278"
              category="Skaner bezprzewodowy"
              description="Mobilność w sekretariacie. Idealny czytnik EZD do skanowania dużych paczek i pracy przy oknie podawczym."
              features={["Zasięg Bluetooth do 10m", "Praca na baterii do 14h", "Stacja dokująca w zestawie"]}
              placeholderColor="bg-emerald-50"
            />
          </div>
        </div>

        {/* Drukarki */}
        <div className="mb-16">
          <h3 className="text-sm font-bold text-violet-700 uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="w-8 h-px bg-violet-300"></span> Drukarki Etykiet EZD
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <ProductCard
              title="Zebra ZD230t"
              category="Drukarka biurowa"
              description="Ekonomiczna drukarka EZD do podstawowych zastosowań. Idealna do etykietowania teczek aktowych."
              features={["Szerokość druku 104mm", "Zgodność z kodami kreskowymi", "Trwały druk termotransferowy"]}
              placeholderColor="bg-gray-50"
            />
            <ProductCard
              title="Zebra ZD421t"
              category="Drukarka Premium"
              description="Zaawansowana drukarka kodów do EZD dla większych wolumenów. Szybsza praca i opcjonalna obsługa sieci."
              features={["Wysoka prędkość druku", "Ruchomy czujnik etykiet", "Intuicyjna obsługa wkładów"]}
              placeholderColor="bg-indigo-50"
            />
          </div>
        </div>

        {/* Skanery */}
        <div>
          <h3 className="text-sm font-bold text-violet-700 uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="w-8 h-px bg-violet-300"></span> Skanery Dokumentów do EZD
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <ProductCard
              title="Epson DS-730DN"
              category="Skaner sieciowy"
              description="Wydajny skaner do EZD z podajnikiem ADF. Skanuje do PDF/A z OCR, niezbędny w procesie cyfryzacji akt."
              features={["40 stron / minutę", "Skanowanie dwustronne", "Zgodność z sterownikami EZD"]}
              placeholderColor="bg-slate-50"
            />
            <ProductCard
              title="Epson DS-790Wn"
              category="Skaner z ekranem"
              description="Samodzielny skaner EZD z dużym ekranem dotykowym. Idealny do pracy grupowej bez podłączania do PC."
              features={["Duży ekran dotykowy", "Skanowanie do folderu sieciowego", "Integracja z DocuScan"]}
              placeholderColor="bg-violet-50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ title, category, description, features, placeholderColor }: any) {
  return (
    <article className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col md:flex-row h-full">
      {/* Badge w prawym górnym rogu */}
      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 z-10">
        {category}
      </span>
      
      <div className={`w-full md:w-48 h-48 md:h-auto shrink-0 ${placeholderColor} flex items-center justify-center p-6`}>
        {/* Placeholder image */}
        <div className="text-center text-slate-400 text-xs">
          [FOTO: {title}]
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-xl font-bold text-slate-900 mb-2">{title}</h4>
        <p className="text-slate-600 text-base mb-4 flex-1 leading-relaxed">
          {description}
        </p>
        <ul className="space-y-2">
          {features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-center text-sm text-slate-700">
              <Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
