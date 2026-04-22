"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import clsx from "clsx";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#jak-to-dziala", label: "Jak to działa" },
    { href: "#urzadzenia", label: "Urządzenia" },
    { href: "#warianty", label: "Warianty" },
    { href: "#materialy", label: "Materiały eksploatacyjne" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      {/* Top Bar */}
      <div className="bg-violet-700 text-white text-xs md:text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-center md:text-left">
            <span className="hidden sm:inline">🏛️</span>
            <span>Obsługujemy instytucje publiczne w całej Polsce • Dostawa z fakturą z odroczonym terminem płatności • Wsparcie we wdrożeniu EZD</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:biuro@scanter.pl" className="hover:text-violet-200 underline transition-colors">
              biuro@scanter.pl
            </a>
            <a href="tel:+48601828711" className="hover:text-violet-200 underline transition-colors">
              +48 601 828 711
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center py-3">
          {/* Logo usunięte - pusta przestrzeń po lewej (flex justify-end przesuwa nav w prawo, lub justify-between z pustym div) */}
          <div aria-hidden="true" className="mr-auto"></div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-700 hover:text-slate-900 transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            {/* Sprzęt dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-slate-700 hover:text-slate-900 transition-colors text-sm font-medium">
                Sprzęt <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-lg shadow-lg border border-slate-200 py-2 min-w-[200px]">
                  <Link href="/ezd-rp/czytniki" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors">
                    Czytniki kodów do EZD
                  </Link>
                  <Link href="/ezd-rp/drukarki" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors">
                    Drukarki etykiet do EZD
                  </Link>
                  <Link href="/ezd-rp/skanery" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors">
                    Skanery dokumentów do EZD
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href="#formularz"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-violet-700 text-white hover:bg-violet-800 text-sm font-medium transition-colors"
            >
              Poproś o wycenę
            </Link>
            <Link
              href="/panel/login"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-medium transition-colors"
            >
              Panel klienta
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-slate-300 text-slate-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={clsx(
          "md:hidden border-t border-slate-200 bg-white overflow-hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 text-slate-700 font-medium block"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-slate-100 pt-2">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Sprzęt do EZD</p>
            {[
              { href: "/ezd-rp/czytniki", label: "Czytniki kodów" },
              { href: "/ezd-rp/drukarki", label: "Drukarki etykiet" },
              { href: "/ezd-rp/skanery", label: "Skanery dokumentów" },
            ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 pl-3 text-slate-600 font-medium block"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          </div>
          <Link
            href="#formularz"
            className="inline-flex justify-center px-4 py-2 rounded-md bg-violet-700 text-white hover:bg-violet-800 font-medium transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Poproś o wycenę
          </Link>
          <Link
            href="/panel/login"
            className="inline-flex justify-center px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Panel klienta
          </Link>
        </div>
      </div>
    </header>
  );
}
