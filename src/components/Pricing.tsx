"use client";

import Link from "next/link";
import { Check, Star } from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";

export function Pricing() {
  const plans = [
    {
      name: "Mini",
      description: "Dla jednostek posiadających już skaner.",
      price: "2 299",
      features: ["Zebra DS2208 (Skaner kodów)", "Zebra ZD421t (Drukarka etykiet)"],
      isPopular: false,
    },
    {
      name: "Standard",
      description: "Podstawowy zestaw do sekretariatu.",
      price: "3 199",
      features: ["Zebra DS2208 (Skaner kodów)", "Zebra ZD230t (Drukarka etykiet)", "Epson DS-730DN (Skaner dok.)"],
      isPopular: false,
    },
    {
      name: "Plus",
      description: "Najlepszy stosunek ceny do możliwości.",
      price: "3 699",
      features: ["Zebra DS2208 (Skaner kodów)", "Zebra ZD421t (Drukarka etykiet)", "Epson DS-730DN (Skaner dok.)"],
      isPopular: true,
    },
    {
      name: "Pro",
      description: "Maksymalna wydajność i mobilność.",
      price: "5 599",
      features: ["Zebra DS2278 (Bezprzewodowy)", "Zebra ZD421t (Drukarka etykiet)", "Epson DS-790Wn (Sieciowy)"],
      isPopular: false,
    },
  ];

  return (
    <section id="warianty" className="py-8 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Wybierz zestaw EZD dopasowany do Twojej jednostki
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Oferujemy kompletne <strong>stanowiska pracy EZD RP</strong>. Możliwość zakupu z odroczonym terminem płatności.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={clsx(
                "relative flex flex-col p-6 rounded-2xl border transition-all duration-300",
                plan.isPopular
                  ? "border-violet-500 bg-white shadow-xl scale-105 z-10 hover:shadow-2xl hover:-translate-y-1"
                  : "border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-violet-300"
              )}
            >
              {/* One-time glow animation on scroll */}
              {plan.isPopular && (
                <>
                  <motion.div
                    className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-violet-500 via-indigo-500 to-violet-500 blur-[4px] -z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: [0, 0.8, 0] }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-white -z-[5]"></div>
                </>
              )}
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-max max-w-full">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-30"></div>
                    <div className="relative flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full text-white text-[10px] font-bold uppercase tracking-wider shadow-sm whitespace-nowrap">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      Najczęściej wybierany
                    </div>
                  </div>
                </div>
              )}
              
              <h3 className={clsx("text-xl font-bold", plan.isPopular ? "text-violet-700 mt-2" : "text-slate-900")}>
                {plan.name}
              </h3>
              <p className="text-sm text-slate-500 mt-2 h-10">{plan.description}</p>
              
              <div className="my-6">
                <span className="text-3xl font-bold text-slate-900">
                  {plan.price} zł
                </span>
                <span className="text-slate-500 ml-2">netto</span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-700">
                    <span className={clsx(
                      "w-1.5 h-1.5 rounded-full mr-3 mt-2 shrink-0",
                      plan.isPopular ? "bg-emerald-500" : "bg-slate-300"
                    )}></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="#formularz"
                className={clsx(
                  "w-full text-center py-3 rounded-xl font-bold transition-all transform hover:-translate-y-0.5",
                  plan.isPopular
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-200 hover:shadow-violet-300"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                )}
              >
                Wybierz {plan.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
