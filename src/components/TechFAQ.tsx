"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, ServerCog } from "lucide-react";
import clsx from "clsx";

export function TechFAQ() {
  const [isSectionOpen, setIsSectionOpen] = useState(false);

  const items = [
    {
      question: "Czym jest system EZD RP i dlaczego urzędy go potrzebują?",
      answer: "EZD RP (Elektroniczne Zarządzanie Dokumentacją) to system wdrażany w polskiej administracji publicznej, umożliwiający cyfrowy obieg dokumentów. Urzędy potrzebują specjalistycznego sprzętu: skanerów z OCR do digitalizacji, drukarek etykiet do Składu Chronologicznego oraz czytników kodów do rejestracji wpływów (RPW). System jest rozwijany przez NASK."
    },
    {
      question: "Jakie są wymagania sprzętowe EZD RP dla czytników kodów?",
      answer: "Czytniki kodów muszą obsługiwać standardy 1D i 2D (w tym QR) używane na etykietach RPW. Nasze urządzenia EZD (Zebra DS2208/DS2278) są w pełni zgodne z tymi wymogami i integrują się z systemem bez dodatkowych sterowników. Każdy czytnik przechodzi weryfikację zgodności przed wysyłką."
    },
    {
      question: "Czy skaner EZD tworzy pliki PDF/A z warstwą tekstową?",
      answer: "Tak. Skanery Epson DS-730DN i DS-790Wn posiadają sprzętowe wsparcie dla OCR i generowania plików PDF/A. Format PDF/A zapewnia długoterminową archiwizację i pełną przeszukiwalność zeskanowanych dokumentów. Jest to kluczowy wymóg Instrukcji Kancelaryjnej dla systemu EZD RP."
    },
    {
      question: "Jaka drukarka etykiet do EZD jest wymagana do Składu Chronologicznego?",
      answer: "Do Składu Chronologicznego wymagana jest drukarka termotransferowa, która zapewnia trwałość wydruku powyżej 5 lat (wymóg archiwizacji). Drukarki termiczne (paragonowe) nie spełniają tego wymogu, ponieważ wydruk blaknie. Modele Zebra ZD230t i ZD421t z naszej oferty spełniają ten standard."
    },
    {
      question: "Czy zestawy EZD są zgodne z wytycznymi NASK?",
      answer: "Tak, konfiguracje sprzętowe zostały dobrane zgodnie z rekomendacjami NASK (operatora EZD RP) oraz PUW. Zestawy są gotowe do pracy w urzędach administracji publicznej i przechodzą weryfikację zgodności przed dostawą."
    },
    {
      question: "Czy potrzebuję wszystkich trzech urządzeń — skanera, drukarki i czytnika?",
      answer: "Zależy od potrzeb stanowiska. Minimalne stanowisko kancelaryjne wymaga czytnika kodów i drukarki etykiet (zestaw Mini od 2 299 zł netto). Pełne stanowisko EZD RP obejmuje dodatkowo skaner dokumentów z OCR — zestawy Standard, Plus i Pro od 3 199 zł netto."
    },
    {
      question: "Jaka jest różnica między Zebra DS2208 a DS2278?",
      answer: "Zebra DS2208 to czytnik przewodowy USB — niezawodny i ekonomiczny, idealny do stałego stanowiska. Zebra DS2278 to wersja bezprzewodowa Bluetooth z baterią na 14h pracy i zasięgiem 10m — lepsza dla okien podawczych i mobilnej rejestracji paczek. Oba modele obsługują te same formaty kodów."
    },
    {
      question: "Czym różni się Zebra ZD230t od ZD421t?",
      answer: "ZD230t to ekonomiczny model podstawowy — szerokość druku 104mm, druk termotransferowy. ZD421t to model premium z szybszym drukiem, ruchomym czujnikiem etykiet i systemem wymiany taśmy na cartridge (najwygodniejszy i najszybszy sposób wymiany). ZD421t jest zalecany przy większych wolumenach drukowania."
    },
    {
      question: "Jak długo trwa wdrożenie zestawu EZD na stanowisku?",
      answer: "Instalacja i konfiguracja zestawu EZD trwa ok. 15-30 minut na stanowisko. Urządzenia są typu Plug & Play — czytnik i drukarka działają po podłączeniu USB, skaner wymaga jednorazowej konfiguracji profilu skanowania. Do każdego zestawu dołączamy instrukcje po polsku."
    },
    {
      question: "Czy oferujecie faktury z odroczonym terminem płatności?",
      answer: "Tak. Dla jednostek administracji publicznej oferujemy faktury VAT z odroczonym terminem płatności do 30 dni. Realizujemy również zamówienia na podstawie zamówień publicznych i zapytań ofertowych zgodnie z ustawą PZP."
    },
    {
      question: "Jakie formaty kodów obsługują czytniki EZD?",
      answer: "Czytniki Zebra DS2208 i DS2278 obsługują wszystkie standardy kodów wymagane przez EZD RP: kody 1D (Code 128, EAN), kody 2D (Data Matrix, PDF417) oraz kody QR. Odczyt jest natychmiastowy — wystarczy jedno skanowanie bez konieczności celowania."
    },
    {
      question: "Czy potrzebne jest szkolenie pracowników z obsługi sprzętu EZD?",
      answer: "Sprzęt jest zaprojektowany do intuicyjnej obsługi i nie wymaga specjalistycznego szkolenia. Czytnik i drukarka działają od razu po podłączeniu. Do każdego zestawu dołączamy krótką instrukcję po polsku. W razie pytań nasz zespół wsparcia technicznego jest dostępny telefonicznie pod numerem +48 601 828 711."
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
          isSectionOpen ? "max-h-[4000px] opacity-100 pb-12" : "max-h-0 opacity-0"
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
