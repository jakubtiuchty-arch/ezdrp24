import { getPanelUser } from "@/lib/panel-auth";
import { redirect } from "next/navigation";
import { Building2, Mail, Phone, MapPin, FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProfilPage() {
  const user = await getPanelUser();
  if (!user) redirect("/panel/login");

  const fields = [
    { icon: Building2, label: "Instytucja", value: user.organizationName },
    { icon: FileText, label: "NIP", value: user.nip },
    { icon: FileText, label: "REGON", value: user.regon },
    { icon: Mail, label: "Email", value: user.email },
    { icon: Phone, label: "Telefon", value: user.phone },
    { icon: MapPin, label: "Adres", value: [user.street, [user.postalCode, user.city].filter(Boolean).join(" ")].filter(Boolean).join(", ") },
    { icon: Building2, label: "Osoba kontaktowa", value: user.contactPerson },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Profil instytucji</h1>

      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
        {fields.map((field, i) => (
          <div key={i} className="px-6 py-4 flex items-center gap-4">
            <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
              <field.icon className="w-4 h-4 text-slate-500" />
            </div>
            <div>
              <p className="text-xs text-slate-400">{field.label}</p>
              <p className="text-sm font-medium text-slate-900">{field.value || "—"}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-4">
        Aby zaktualizować dane, skontaktuj się z nami: <a href="mailto:biuro@scanter.pl" className="text-violet-600 hover:underline">biuro@scanter.pl</a>
      </p>
    </div>
  );
}
