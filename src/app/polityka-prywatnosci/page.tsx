import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";
import { Shield, UserCheck, Lock, Eye, FileText, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Polityka Prywatności | Scanter Sp. z o.o.",
  description: "Zasady przetwarzania danych osobowych i polityka cookies.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <Header />
      
      {/* Header Sekcji */}
      <div className="bg-white border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-100 text-violet-600 rounded-2xl mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Polityka Prywatności</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Dbamy o Twoje dane. Poniżej znajdziesz przejrzyste informacje o tym, kto jest ich administratorem, w jakim celu je przetwarzamy i jakie masz prawa.
          </p>
        </div>
      </div>

      <main className="flex-grow py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Sekcja 1: Administrator */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">1. Administrator Danych</h2>
                <p className="text-slate-600 leading-relaxed">
                  Administratorem Twoich danych osobowych jest:<br/>
                  <strong>Scanter Sp. z o.o.</strong><br/>
                  ul. Poświęcka 1a, 51-128 Wrocław<br/>
                  NIP: 8952040169<br/>
                  KRS: 0000568800
                </p>
                <p className="text-slate-600 mt-2">
                  Możesz skontaktować się z nami w sprawach ochrony danych pod adresem: <a href="mailto:biuro@scanter.pl" className="text-violet-600 hover:underline font-medium">biuro@scanter.pl</a>
                </p>
              </div>
            </div>
          </section>

          {/* Sekcja 2: Cele */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-4">2. Dlaczego przetwarzamy Twoje dane?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-900 mb-2">Realizacja zamówień</h3>
                    <p className="text-sm text-slate-600">Niezbędne do wykonania umowy sprzedaży, wystawienia faktury i dostarczenia sprzętu.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-900 mb-2">Kontakt i wyceny</h3>
                    <p className="text-sm text-slate-600">Udzielanie odpowiedzi na Twoje zapytania z formularza oraz przygotowanie ofert handlowych.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-900 mb-2">Obsługa posprzedażowa</h3>
                    <p className="text-sm text-slate-600">Rozpatrywanie reklamacji, obsługa gwarancyjna oraz wsparcie techniczne.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-900 mb-2">Wymogi prawne</h3>
                    <p className="text-sm text-slate-600">Prowadzenie księgowości i spełnianie obowiązków podatkowych.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sekcja 3: Prawa */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-violet-50 text-violet-600 rounded-xl shrink-0">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">3. Twoje prawa</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Dostępu do swoich danych",
                    "Sprostowania danych",
                    "Usunięcia danych (prawo do bycia zapomnianym)",
                    "Ograniczenia przetwarzania",
                    "Przenoszenia danych",
                    "Wniesienia sprzeciwu",
                    "Cofnięcia zgody"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                      <span className="w-1.5 h-1.5 bg-violet-500 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Sekcja 4: Cookies */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">4. Pliki Cookies</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Nasza strona używa plików cookies ("ciasteczka") w celu zapewnienia poprawnego działania serwisu oraz w celach statystycznych (Google Analytics). Nie wykorzystujemy cookies do śledzenia Twojej aktywności poza naszą witryną w celach reklamowych (remarketing).
                </p>
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-sm text-amber-900">
                  Możesz w każdej chwili zmienić ustawienia dotyczące cookies w swojej przeglądarce internetowej.
                </div>
              </div>
            </div>
          </section>

          <p className="text-center text-sm text-slate-400 pt-8">
            Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
          </p>

        </div>
      </main>
      <Footer />
    </div>
  );
}
