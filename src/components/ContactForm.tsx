"use client";

import { useState } from "react";
import { Loader2, Phone, Check, Home, ArrowRight, X } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Symulacja wysyłki
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/75 transition-opacity"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 text-center animate-in zoom-in-95 fade-in duration-300 max-h-[90vh] overflow-y-auto">
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Success Icon */}
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-emerald-600" strokeWidth={3} />
              </div>

              {/* Heading */}
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Dziękujemy za zapytanie!
              </h3>
              <p className="text-slate-600">
                Twoje zapytanie o <strong className="text-slate-900">zestaw EZD RP</strong> zostało pomyślnie wysłane.
              </p>

              {/* Co dalej? */}
              <div className="mt-5 bg-violet-50 rounded-xl p-4 border border-violet-100">
                <h4 className="font-bold text-slate-900 mb-3 text-sm">Co dalej?</h4>
                <ul className="space-y-2 text-left">
                  <li className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-violet-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 text-sm">
                      Skontaktujemy się <strong className="text-slate-900">w ciągu 24 godzin</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-violet-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 text-sm">
                      Przygotujemy <strong className="text-slate-900">indywidualną wycenę</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-violet-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 text-sm">
                      Pomożemy dobrać <strong className="text-slate-900">optymalny zestaw</strong>
                    </span>
                  </li>
                </ul>
              </div>

              {/* Kontakt */}
              <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-slate-600 text-sm mb-2">Pilna sprawa? Zadzwoń teraz:</p>
                <a 
                  href="tel:+48601828711" 
                  className="inline-flex items-center gap-2 text-xl font-bold text-violet-700 hover:text-violet-800 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  +48 601 828 711
                </a>
                <p className="mt-2 text-slate-600 text-sm">
                  lub napisz: <a href="mailto:biuro@scanter.pl" className="text-violet-700 hover:underline font-medium">biuro@scanter.pl</a>
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-5 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={closeModal}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-violet-700 text-white rounded-xl font-semibold hover:bg-violet-800 transition-colors text-sm"
                >
                  <Home className="w-4 h-4" />
                  Wróć na stronę główną
                </button>
                <a
                  href="#urzadzenia"
                  onClick={closeModal}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:border-slate-300 hover:bg-slate-50 transition-colors text-sm"
                >
                  Zobacz więcej produktów
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Section */}
      <section id="formularz" className="py-8 lg:py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Zapytaj o zestaw EZD RP - otrzymaj wycenę</h2>
            <p className="mt-4 text-lg text-slate-600">
              Wypełnij formularz – przygotujemy propozycję zestawu EZD RP i wycenę dopasowaną do potrzeb instytucji.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-1">Imię i nazwisko</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Jan Kowalski"
                  className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-violet-700 focus:ring-1 focus:ring-violet-700 transition-colors" 
                />
              </div>
              <div>
                <label htmlFor="org" className="block text-sm font-medium text-slate-900 mb-1">Instytucja</label>
                <input 
                  type="text" 
                  id="org" 
                  name="org" 
                  placeholder="Urząd Gminy / Szkoła / ..."
                  className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-violet-700 focus:ring-1 focus:ring-violet-700 transition-colors" 
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-1">E-mail <span className="text-red-700">*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  placeholder="urzad@example.gov.pl"
                  className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-violet-700 focus:ring-1 focus:ring-violet-700 transition-colors" 
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-900 mb-1">Telefon</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="+48 000 000 000"
                  className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-violet-700 focus:ring-1 focus:ring-violet-700 transition-colors" 
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
               <div>
                <label htmlFor="voivodeship" className="block text-sm font-medium text-slate-900 mb-1">Województwo</label>
                <select 
                  id="voivodeship" 
                  name="voivodeship" 
                  className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-violet-700 focus:ring-1 focus:ring-violet-700 transition-colors bg-white"
                >
                  <option value="">— wybierz —</option>
                  {["dolnośląskie", "kujawsko-pomorskie", "lubelskie", "lubuskie", "łódzkie", "małopolskie", "mazowieckie", "opolskie", "podkarpackie", "podlaskie", "pomorskie", "śląskie", "świętokrzyskie", "warmińsko-mazurskie", "wielkopolskie", "zachodniopomorskie"].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="variant" className="block text-sm font-medium text-slate-900 mb-1">Preferowany wariant</label>
                <select 
                  id="variant" 
                  name="variant" 
                  className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-violet-700 focus:ring-1 focus:ring-violet-700 transition-colors bg-white"
                >
                  <option value="Mini">Mini</option>
                  <option value="Standard">Standard</option>
                  <option value="Plus">Plus</option>
                  <option value="Pro">Pro</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-slate-900 mb-1">Uwagi</label>
              <textarea 
                id="notes" 
                name="notes" 
                rows={4} 
                className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-violet-700 focus:ring-1 focus:ring-violet-700 transition-colors" 
                placeholder="Liczba stanowisk, terminy, wymagania..."
              ></textarea>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  id="rodo" 
                  required 
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-violet-700 focus:ring-violet-700" 
                />
                <span className="text-sm text-slate-700">
                  Wyrażam zgodę na kontakt w celu przedstawienia oferty. Szczegóły w <a href="/polityka-prywatnosci" className="text-violet-700 hover:underline">Polityce prywatności</a>.
                </span>
              </label>
              
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  id="rfq" 
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-violet-700 focus:ring-violet-700" 
                />
                <span className="text-sm text-slate-700">
                  Chcę ofertę w trybie zapytania ofertowego (RFQ).
                </span>
              </label>
            </div>

            <div className="mt-2 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-5 py-3 rounded-md bg-violet-700 text-white hover:bg-violet-800 disabled:bg-violet-400 transition-colors font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Wysyłanie...
                  </>
                ) : (
                  "Wyślij zapytanie"
                )}
              </button>
              <a 
                  href="tel:+48601828711" 
                  className="inline-flex items-center px-5 py-3 rounded-md border border-slate-300 text-slate-900 hover:bg-slate-50 transition-colors font-medium"
              >
                  Infolinia: +48 601 828 711
              </a>
            </div>
          </form>
          
          <p className="mt-3 text-xs text-slate-600">
              Administratorem danych jest Scanter Sp. z o.o., ul. Poświęcka 1a, 51-128 Wrocław. Dane przetwarzamy w celu udzielenia odpowiedzi i przygotowania oferty. Masz prawo dostępu i żądania usunięcia danych. Kontakt: <a href="mailto:biuro@scanter.pl" className="text-violet-700 hover:underline">biuro@scanter.pl</a> lub <a href="tel:+48601828711" className="text-violet-700 hover:underline">+48 601 828 711</a>.
          </p>
        </div>
      </section>
    </>
  );
}
