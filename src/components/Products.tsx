"use client";

import { Check, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
              images={["/ds2208_1.png", "/ds2208_2.png", "/ds2208_3.png"]}
              placeholderColor="bg-blue-50"
            />
            <ProductCard
              title="Zebra DS2278"
              category="Skaner bezprzewodowy"
              description="Mobilność w sekretariacie. Idealny czytnik EZD do skanowania dużych paczek i pracy przy oknie podawczym."
              features={["Zasięg Bluetooth do 10m", "Praca na baterii do 14h", "Stacja dokująca w zestawie"]}
              images={["/ds2278_1.png", "/ds2278_2.png", "/ds2278_3.png", "/ds2278_4.png"]}
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
              images={["/zd230_1.png", "/zd230_2.png", "/zd230_3.png"]}
              placeholderColor="bg-gray-50"
            />
            <ProductCard
              title="Zebra ZD421t"
              category="Drukarka Premium"
              description="Zaawansowana drukarka kodów do EZD dla większych wolumenów. Szybsza praca i opcjonalna obsługa sieci."
              features={["Wysoka prędkość druku", "Ruchomy czujnik etykiet", "Intuicyjna obsługa wkładów"]}
              images={["/zd421_1.png", "/zd421_2.png", "/zd421_3.png"]}
              placeholderColor="bg-indigo-50"
              badge={{
                text: "Najwygodniejsza wymiana taśmy — system cartridge",
                videoUrl: "https://www.youtube.com/embed/YxiUVvp2-WY?autoplay=1&mute=1&start=10&end=24",
                start: 10,
                end: 24
              }}
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
              images={["/ds730_1.png", "/ds730_2.png"]}
              placeholderColor="bg-slate-50"
            />
            <ProductCard
              title="Epson DS-790Wn"
              category="Skaner z ekranem"
              description="Samodzielny skaner EZD z dużym ekranem dotykowym. Idealny do pracy grupowej bez podłączania do PC."
              features={[
                "Duży ekran dotykowy",
                "Skanowanie do folderu sieciowego",
                { text: "Integracja z DocuScan", tooltip: "DocuScan to oprogramowanie Epson umożliwiające skanowanie bezpośrednio do systemu EZD RP — bez pośrednictwa komputera." }
              ]}
              images={["/ds790_1.png", "/ds790_2.png"]}
              placeholderColor="bg-violet-50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ title, category, description, features, images, placeholderColor, badge }: any) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const videoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (showVideo && badge) {
      const duration = ((badge.end || 24) - (badge.start || 10)) * 1000 + 500;
      videoTimer.current = setTimeout(() => setShowVideo(false), duration);
    }
    return () => {
      if (videoTimer.current) clearTimeout(videoTimer.current);
    };
  }, [showVideo, badge]);

  return (
    <article className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col md:flex-row h-full">
      {/* Badge w prawym górnym rogu */}
      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 z-10">
        {category}
      </span>

      <div className={`w-full md:w-56 h-56 md:h-auto shrink-0 ${placeholderColor} relative overflow-hidden`}>
        {images ? (
          <>
            {images.map((src: string, idx: number) => (
              <Image
                key={src}
                src={src}
                alt={`${title} - zdjęcie ${idx + 1}`}
                fill
                className={`object-contain p-2 transition-opacity duration-700 ${
                  idx === currentImage ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 768px) 100vw, 192px"
              />
            ))}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                {images.map((_: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    aria-label={`Zdjęcie ${idx + 1}`}
                    className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 cursor-pointer ${
                      idx === currentImage ? "bg-violet-600" : "bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full p-6">
            <div className="text-center text-slate-400 text-xs">
              [FOTO: {title}]
            </div>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-xl font-bold text-slate-900 mb-2">{title}</h4>
        <p className="text-slate-600 text-base mb-4 leading-relaxed">
          {description}
        </p>
        <ul className="space-y-2">
          {features.map((feature: string | { text: string; tooltip: string }, idx: number) => {
            const text = typeof feature === "string" ? feature : feature.text;
            const tooltip = typeof feature === "string" ? null : feature.tooltip;
            return (
              <li key={idx} className="flex items-center text-sm text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                {text}
                {tooltip && (
                  <span className="relative group ml-1.5">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold cursor-help shrink-0">?</span>
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 rounded-lg bg-slate-800 text-white text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-lg">
                      {tooltip}
                    </span>
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        {badge && (
          <div className="mt-4 space-y-4 text-center">
            <p className="text-xs font-medium text-slate-600">
              {badge.text}
            </p>
            <button
              onClick={() => setShowVideo(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-900 text-xs font-bold cursor-pointer hover:brightness-95 transition-all"
              style={{ backgroundColor: "#A8F000" }}
            >
              <Play className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
              Zobacz jak to działa
            </button>
          </div>
        )}
      </div>

      {showVideo && badge && (
        <div className="absolute inset-0 z-20 bg-black rounded-2xl overflow-hidden flex items-center justify-center">
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-3 right-3 z-30 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-slate-700 hover:bg-white cursor-pointer text-sm font-bold"
          >
            ✕
          </button>
          <iframe
            width="100%"
            height="100%"
            src={badge.videoUrl}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="block"
          />
        </div>
      )}
    </article>
  );
}
