"use client";

import { Scan, FileCheck, Printer, Archive } from "lucide-react";
import { motion } from "framer-motion";

export function Features() {
  const steps = [
    {
      id: "01",
      title: "Rejestracja w EZD RP",
      description: "Skanowanie kodu z koperty czytnikiem EZD. Automatyczny zapis w rejestrze wpływów (RPW) zgodnie z procedurą.",
      icon: <Scan className="w-6 h-6 text-violet-600" />,
    },
    {
      id: "02",
      title: "Skanowanie do EZD",
      description: "Skaner EZD tworzy cyfrowy obraz pisma z warstwą tekstową (OCR) i zapisuje jako PDF/A, gotowy do dekretacji.",
      icon: <FileCheck className="w-6 h-6 text-violet-600" />,
    },
    {
      id: "03",
      title: "Wydruk etykiet EZD",
      description: "Drukarka EZD generuje trwałe kody kreskowe na teczki aktowe, segregatory i spisy spraw dla Składu Chronologicznego.",
      icon: <Printer className="w-6 h-6 text-violet-600" />,
    },
    {
      id: "04",
      title: "Archiwizacja cyfrowa",
      description: "Dokumenty trafiają do repozytorium systemu. Nasz sprzęt EZD gwarantuje czytelność i zgodność metadanych.",
      icon: <Archive className="w-6 h-6 text-violet-600" />,
    },
  ];

  return (
    <section id="jak-to-dziala" className="py-8 lg:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Jak działa sprzęt w systemie EZD RP?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Elektroniczne Zarządzanie Dokumentacją wymaga niezawodnych urządzeń. 
            Nasze <strong>zestawy EZD</strong> wspierają każdy etap obiegu – od wpływu po archiwizację.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 relative">
          {/* Linia łącząca (tylko desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-violet-100 to-transparent -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.4 }}
              className="relative group text-center"
            >
              {/* Ikona w kółku */}
              <div className="relative inline-flex items-center justify-center w-24 h-24 bg-white rounded-full border-4 border-violet-50 mb-6 group-hover:border-violet-100 group-hover:scale-110 transition-all duration-300">
                <div className="w-16 h-16 bg-violet-50 rounded-full flex items-center justify-center group-hover:bg-violet-100 transition-colors">
                  {step.icon}
                </div>
                {/* Numer jako badge */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md border-2 border-white">
                  {step.id}
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed text-base px-2">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
