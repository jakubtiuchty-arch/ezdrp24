import { getPanelUser } from "@/lib/panel-auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Wrench, Truck } from "lucide-react";

export const dynamic = "force-dynamic";

const statusMap: Record<string, { label: string; className: string }> = {
  NEW: { label: "Nowe", className: "bg-blue-100 text-blue-700" },
  PICKUP_SCHEDULED: { label: "Kurier zamówiony", className: "bg-amber-100 text-amber-700" },
  IN_TRANSIT: { label: "W transporcie", className: "bg-indigo-100 text-indigo-700" },
  IN_SERVICE: { label: "W serwisie", className: "bg-violet-100 text-violet-700" },
  COMPLETED: { label: "Zakończone", className: "bg-emerald-100 text-emerald-700" },
  RETURNED: { label: "Zwrócone", className: "bg-slate-100 text-slate-700" },
};

export default async function SerwisPage() {
  const user = await getPanelUser();
  if (!user) redirect("/panel/login");

  const requests = await prisma.serviceRequest.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { device: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Zgłoszenia serwisowe</h1>

      {requests.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Wrench className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-400">Brak zgłoszeń serwisowych</p>
          <p className="text-xs text-slate-400 mt-1">
            Potrzebujesz serwisu? Zadzwoń: <a href="tel:+48601828711" className="text-violet-600 hover:underline">+48 601 828 711</a>
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => {
            const status = statusMap[req.status] || { label: req.status, className: "bg-slate-100 text-slate-600" };
            return (
              <div key={req.id} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-slate-900">{req.requestNumber}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${status.className}`}>
                        {status.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(req.createdAt).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
                      {req.device && ` · ${req.device.name}`}
                    </p>
                  </div>
                  {req.trackingNumber && (
                    <div className="flex items-center gap-1.5 text-sm text-violet-600">
                      <Truck className="w-4 h-4" />
                      <span className="font-mono">{req.trackingNumber}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3">
                  {req.problemDescription}
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Adres odbioru: {req.pickupStreet}, {req.pickupPostalCode} {req.pickupCity}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
