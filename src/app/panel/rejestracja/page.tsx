"use client";

import { useState } from "react";
import { UserPlus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", organizationName: "", nip: "",
    street: "", postalCode: "", city: "", phone: "", email: "", password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/panel/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (data.success) {
      router.push("/panel/sklep");
    } else {
      setError(data.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="text-center mb-6">
            <div className="mx-auto w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center mb-4">
              <UserPlus className="w-7 h-7 text-violet-600" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Załóż konto klienta</h1>
            <p className="text-sm text-slate-500 mt-1">Zamawiaj materiały eksploatacyjne do EZD</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Imię *</label>
                <input required value={form.firstName} onChange={e => update("firstName", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Jan" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nazwisko *</label>
                <input required value={form.lastName} onChange={e => update("lastName", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Kowalski" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nazwa jednostki / firmy *</label>
              <input required value={form.organizationName} onChange={e => update("organizationName", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Urząd Gminy / Szkoła / ..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">NIP</label>
                <input value={form.nip} onChange={e => update("nip", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="000-000-00-00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Telefon</label>
                <input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="+48 000 000 000" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Adres (ulica)</label>
              <input value={form.street} onChange={e => update("street", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="ul. Przykładowa 1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Kod pocztowy</label>
                <input value={form.postalCode} onChange={e => update("postalCode", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="00-000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Miasto</label>
                <input value={form.city} onChange={e => update("city", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Wrocław" />
              </div>
            </div>

            <hr className="border-slate-200" />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
              <input required type="email" value={form.email} onChange={e => update("email", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="email@instytucja.gov.pl" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Hasło *</label>
              <input required type="password" minLength={6} value={form.password} onChange={e => update("password", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="min. 6 znaków" />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm text-red-700">{error}</div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-2.5 rounded-lg bg-violet-600 text-white font-medium text-sm hover:bg-violet-700 disabled:bg-violet-400 transition-colors flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Rejestracja...</> : "Załóż konto"}
            </button>

            <p className="text-center text-sm text-slate-500">
              Masz już konto? <Link href="/panel/login" className="text-violet-600 hover:underline font-medium">Zaloguj się</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
