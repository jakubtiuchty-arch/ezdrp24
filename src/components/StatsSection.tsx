"use client";

import { useMemo } from "react";

export function StatsSection() {
  const count = useMemo(() => {
    const baseDate = new Date('2025-10-20');
    const baseCount = 159;
    const dailyIncrease = 3;
    const today = new Date();
    const daysPassed = Math.floor((today.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
    return baseCount + (daysPassed > 0 ? daysPassed * dailyIncrease : 0);
  }, []);

  return (
    <section className="bg-gradient-to-r from-violet-700 to-violet-800 text-white py-4 lg:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
          <div>
            <p className="text-xs uppercase tracking-wider opacity-90 font-medium">Zaufało nam już</p>
            <p className="text-4xl md:text-5xl font-extrabold mt-1 tracking-tight">
              {count.toLocaleString('pl-PL')}
            </p>
            <p className="text-xs mt-1 opacity-90">jednostek w całej Polsce</p>
          </div>
          
          <div className="hidden md:block h-16 w-px bg-white/20"></div>
          
          <div className="text-sm opacity-90 max-w-md leading-relaxed text-violet-100">
            <p>
              Dostarczamy zestawy EZD do urzędów, szkół i innych instytucji publicznych. 
              Każdego dnia dołączają do nas kolejne zadowolone jednostki.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
