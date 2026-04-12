"use client";

import { useState } from "react";
import { Gift, ChevronDown, Check } from "lucide-react";
import clsx from "clsx";

export function GiftSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border-y-2 border-emerald-400 py-4 lg:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full shadow-md shadow-emerald-200 shrink-0">
            <Gift className="w-7 h-7 text-white" />
            </div>

            <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                Do każdego zestawu dodajemy <span className="text-emerald-600">GRATIS!</span>
                </h2>
                <p className="text-sm md:text-base text-slate-700 mt-1 max-w-lg mx-auto md:mx-0">
                Pakiet materiałów eksploatacyjnych warty <strong>ponad 200 zł</strong> na start.
                </p>
            </div>

            <button
            onClick={() => setIsOpen(!isOpen)}
            className={clsx(
                "inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all shadow-md whitespace-nowrap w-full md:w-auto justify-center",
                isOpen
                ? "bg-emerald-700 text-white hover:bg-emerald-800"
                : "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:scale-105"
            )}
            >
            {isOpen ? "Ukryj gratisy" : "Zobacz co dostaniesz"}
            <ChevronDown className={clsx("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
            </button>
        </div>

        <div
          className={clsx(
            "overflow-hidden transition-all duration-500 ease-in-out",
            isOpen ? "max-h-[1200px] opacity-100 mt-8" : "max-h-0 opacity-0 mt-0"
          )}
        >
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-emerald-100">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
              {[
                {
                  title: "Etykiety 80×50 mm",
                  desc: "Na teczki i segregatory",
                  items: ["1000 szt. na rolce", "Papier termotransferowy", "Wartość: ~80 zł"],
                },
                {
                  title: "Etykiety 50×30 mm",
                  desc: "Na paczki i przesyłki",
                  items: ["1000 szt. na rolce", "Papier termotransferowy", "Wartość: ~60 zł"],
                },
                {
                  title: "Taśma termotransferowa",
                  desc: "Premium wax-resin",
                  items: ["Szerokość 110 mm", "Długość 74 m", "Wartość: ~70 zł"],
                },
              ].map((gift, idx) => (
                <div key={idx} className="bg-emerald-50/50 rounded-lg p-4 border border-emerald-100">
                  <h4 className="text-base font-bold text-slate-900 mb-1">{gift.title}</h4>
                  <p className="text-xs text-slate-600 mb-3">{gift.desc}</p>
                  <ul className="space-y-1">
                    {gift.items.map((item, i) => (
                      <li key={i} className="flex items-center text-xs text-slate-700">
                        <Check className="w-3 h-3 text-emerald-500 mr-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-sm text-emerald-800 font-medium">
                Razem oszczędzasz ponad 200 zł netto przy zakupie dowolnego zestawu.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
