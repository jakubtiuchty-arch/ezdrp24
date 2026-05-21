"use client";

import { useState } from "react";
import { Truck, FileDown, Loader2, X, AlertCircle, ExternalLink, Trash2 } from "lucide-react";

// Najczęstsze service_id Furgonetki — uzupełnimy po pierwszym strzale z /services
// Lista dostępnych serwisów może być inna na koncie - dropdown jest swobodny.
const SERVICE_PRESETS = [
  { id: 9, name: "DPD" },
  { id: 10, name: "DHL" },
  { id: 12, name: "UPS" },
  { id: 14, name: "GLS" },
  { id: 1, name: "InPost Kurier" },
];

type Props = {
  orderId: string;
  orderNumber: string;
  itemsCount: number;
  shipment: {
    packageId: string | null;
    trackingNumber: string | null;
    trackingUrl: string | null;
    labelUrl: string | null;
    carrierService: string | null;
    shipmentStatus: string | null;
    shipmentCreatedAt: Date | null;
  };
};

export function ShipmentPanel({ orderId, orderNumber, itemsCount, shipment }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<number>(9);
  const [serviceName, setServiceName] = useState<string>("DPD");
  const [weight, setWeight] = useState<number>(Math.max(2, itemsCount * 2));
  const [width, setWidth] = useState<number>(30);
  const [height, setHeight] = useState<number>(20);
  const [depth, setDepth] = useState<number>(15);

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/shipment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          serviceName,
          parcels: [
            {
              width,
              height,
              depth,
              weight,
              description: `Zamówienie ${orderNumber}`,
            },
          ],
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Błąd tworzenia przesyłki");
      window.location.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Błąd");
    } finally {
      setLoading(false);
    }
  };

  const cancel = async () => {
    if (!confirm("Anulować przesyłkę w Furgonetce? Tej operacji nie można cofnąć.")) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/shipment`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Błąd anulowania");
      window.location.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Błąd");
    } finally {
      setLoading(false);
    }
  };

  // Istniejąca przesyłka
  if (shipment.packageId) {
    return (
      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-slate-900">Przesyłka {shipment.carrierService}</span>
              {shipment.shipmentStatus && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-700">
                  {shipment.shipmentStatus}
                </span>
              )}
            </div>
            {shipment.trackingNumber && (
              <p className="text-xs text-slate-600 font-mono">{shipment.trackingNumber}</p>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={`/api/admin/orders/${orderId}/shipment/label`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-medium hover:bg-violet-700"
            >
              <FileDown className="w-3.5 h-3.5" /> Etykieta PDF
            </a>
            {shipment.trackingUrl && (
              <a
                href={shipment.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Śledź
              </a>
            )}
            <button
              onClick={cancel}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-rose-200 text-rose-700 text-xs font-medium hover:bg-rose-50 disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" /> Anuluj
            </button>
          </div>
        </div>
        {error && <p className="text-xs text-rose-600 mt-2">{error}</p>}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-4 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-700"
      >
        <Truck className="w-4 h-4" /> Utwórz list przewozowy
      </button>

      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/75" onClick={() => !loading && setOpen(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <button
                onClick={() => !loading && setOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-slate-900 mb-1">Utwórz list przewozowy</h3>
              <p className="text-sm text-slate-500 mb-5">Zamówienie {orderNumber}</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Kurier</label>
                  <select
                    value={serviceId}
                    onChange={(e) => {
                      const s = SERVICE_PRESETS.find((x) => x.id === Number(e.target.value));
                      setServiceId(Number(e.target.value));
                      if (s) setServiceName(s.name);
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    {SERVICE_PRESETS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} (service_id: {s.id})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Waga (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    min={0.1}
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Szer. (cm)</label>
                    <input
                      type="number"
                      min={1}
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Wys. (cm)</label>
                    <input
                      type="number"
                      min={1}
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Głęb. (cm)</label>
                    <input
                      type="number"
                      min={1}
                      value={depth}
                      onChange={(e) => setDepth(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                    <p className="text-xs text-rose-700">{error}</p>
                  </div>
                )}

                <button
                  onClick={submit}
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg bg-violet-600 text-white font-medium text-sm hover:bg-violet-700 disabled:bg-violet-400 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Tworzenie...
                    </>
                  ) : (
                    <>
                      <Truck className="w-4 h-4" />
                      Utwórz przesyłkę
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
