"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, ServerCog } from "lucide-react";
import clsx from "clsx";

export function TechFAQ() {
  const [isSectionOpen, setIsSectionOpen] = useState(false);

  const items = [
    {
      question: "Jakie są wymagania sprzętowe EZD RP dla czytników kodów?",
      answer: "Czytniki kodów muszą obsługiwać standardy 1D i 2D (w tym QR) używane na etykietach RPW. Nasze urządzenia EZD (Zebra DS2208/DS2278) są w pełni zgodne z tymi wymogami i integrują się z systemem bez dodatkowych sterowników."
    },
    {
      question: "Czy skaner EZD tworzy pliki PDF/A z warstwą tekstową?",
      answer: "Tak. Skanery Epson z naszej oferty posiadają sprzętowe wsparcie dla OCR i generowania plików PDF/A. Jest to kluczowy wymóg Instrukcji Kancelaryjnej dla systemu EZD RP."
    },
    {
      question: "Jaka drukarka etykiet do EZD jest wymagana do Składu Chronologicznego?",
      answer: "Do Składu Chronologicznego wymagana jest drukarka termotransferowa, która zapewnia trwałość wydruku powyżej 5 lat (wymóg archiwizacji). Drukarki termiczne (paragonowe) nie spełniają tego wymogu, ponieważ wydruk blaknie."
    },
    {
      question: "Czy zestawy EZD są zgodne z wytycznymi NASK?",
      answer: "Tak, konfiguracje sprzętowe zostały dobrane zgodnie z rekomendacjami NASK (operatora EZD RP) oraz PUW. Zestawy są gotowe do pracy w urzędach administracji publicznej."
    }
  ];

  return (
    <section className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => setIsSectionOpen(!isSectionOpen)}
          className="w-full py-4 flex items-center justify-center gap-3 text-slate-500 hover:text-violet-700 transition-colors group"
        >
            <ServerCog className="w-5 h-5" />
            <span className="font-medium text-sm uppercase tracking-wide">Pytania techniczne: Wymagania EZD RP i sprzęt</span>
            <ChevronDown className={clsx("w-5 h-5 transition-transform duration-300", isSectionOpen && "rotate-180")} />
        </button>

        <div className={clsx(
          "overflow-hidden transition-all duration-500 ease-in-out",
          isSectionOpen ? "max-h-[1200px] opacity-100 pb-12" : "max-h-0 opacity-0"
        )}>
            <div className="space-y-4">
            {items.map((item, idx) => (
                <FaqItem key={idx} question={item.question} answer={item.answer} />
            ))}
            </div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-violet-200 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
      >
        <span className="font-semibold text-slate-800 pr-8">{question}</span>
        <ChevronDown 
          className={clsx(
            "w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0",
            isOpen && "rotate-180 text-violet-600"
          )} 
        />
      </button>
      <div 
        className={clsx(
          "transition-all duration-300 ease-in-out overflow-hidden bg-slate-50/50",
          isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-5 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
          {answer}
        </div>
      </div>
    </div>
  );
}
