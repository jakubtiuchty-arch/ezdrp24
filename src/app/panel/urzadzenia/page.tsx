import { getPanelUser } from "@/lib/panel-auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Monitor, Shield } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function UrzadzeniaPage() {
  const user = await getPanelUser();
  if (!user) redirect("/panel/login");

  const devices = await prisma.device.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Urządzenia</h1>

      {devices.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Monitor className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-400">Brak zarejestrowanych urządzeń</p>
          <p className="text-xs text-slate-400 mt-1">Po zakupie zestawu EZD urządzenia pojawią się tutaj z numerami seryjnymi i informacją o gwarancji</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {devices.map((device) => {
            const warrantyActive = device.warrantyUntil && new Date(device.warrantyUntil) > new Date();
            return (
              <div key={device.id} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-slate-900">{device.name}</h3>
                    <p className="text-xs text-slate-500">{device.type}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    device.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                  }`}>
                    {device.isActive ? "Aktywne" : "Nieaktywne"}
                  </span>
                </div>
                {device.serialNumber && (
                  <p className="text-xs text-slate-500 mb-1">S/N: <span className="font-mono">{device.serialNumber}</span></p>
                )}
                {device.warrantyUntil && (
                  <p className="text-xs flex items-center gap-1 mt-2">
                    <Shield className={`w-3.5 h-3.5 ${warrantyActive ? "text-emerald-500" : "text-slate-400"}`} />
                    <span className={warrantyActive ? "text-emerald-700" : "text-slate-400"}>
                      Gwarancja do {new Date(device.warrantyUntil).toLocaleDateString("pl-PL")}
                    </span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
