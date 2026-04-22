"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/ezd-rp/czytniki", label: "Czytniki do EZD" },
    { href: "/ezd-rp/drukarki", label: "Drukarki do EZD" },
    { href: "/ezd-rp/skanery", label: "Skanery do EZD" },
    { href: "#warianty", label: "Zestawy EZD RP" },
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
