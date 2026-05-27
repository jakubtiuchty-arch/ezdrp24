"use client";

import { useEffect, useState } from "react";
import { Truck, FileDown, Loader2, X, AlertCircle, ExternalLink, Trash2 } from "lucide-react";

type CarrierService = {
  id: number;
  name: string;
  label?: string;
  service?: string;
};

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
  const [services, setServices] = useState<CarrierService[]>([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [serviceName, setServiceName] = useState<string>("");
  const [weight, setWeight] = useState<number>(Math.max(2, itemsCount * 2));
  const [width, setWidth] = useState<number>(30);
  const [height, setHeight] = useState<number>(20);
  const [depth, setDepth] = useState<number>(15);

  useEffect(() => {
    if (!open || services.length > 0) return;
    setServicesLoading(true);
    setError(null);
    fetch("/api/admin/furgonetka/services")
      .then(async (res) => {
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};
        if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
        const list: CarrierService[] = data.services || [];
        setServices(list);
        if (list.length > 0) {
          setServiceId(list[0].id);
          setServiceName(list[0].name || list[0].label || list[0].service || `service ${list[0].id}`);
        }
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Błąd pobierania kurierów"))
      .finally(() => setServicesLoading(false));
  }, [open, services.length]);

  const parseResponse = async (res: Response): Promise<{ error?: string; success?: boolean }> => {
    const text = await res.text();
    if (!text) return {};
    try {
      return JSON.parse(text);
    } catch {
      return { error: text.slice(0, 200) };
    }
  };

  const submit = async () => {
    if (serviceId === null) {
      setError("Wybierz kuriera");
      return;
    }
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
      const data = await parseResponse(res);
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      window.location.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Błąd");
    } finally {
      setLoading(false);
    }
  };

  const cancel = async (force = false) => {
    const msg = force
      ? "Wyczyścić powiązanie z Furgonetką w naszej bazie (mimo błędu Furgonetki)?"
      : "Anulować przesyłkę w Furgonetce? Tej operacji nie można cofnąć.";
    if (!confirm(msg)) return;
    setLoading(true);
    setError(null);
    try {
      const url = force
        ? `/api/admin/orders/${orderId}/shipment?force=1`
        : `/api/admin/orders/${orderId}/shipment`;
      const res = await fetch(url, { method: "DELETE" });
      const data = await parseResponse(res);
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
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
              onClick={() => cancel(false)}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-rose-200 text-rose-700 text-xs font-medium hover:bg-rose-50 disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" /> Anuluj
            </button>
          </div>
        </div>
        {error && (
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <p className="text-xs text-rose-600">{error}</p>
            <button
              onClick={() => cancel(true)}
              disabled={loading}
              className="text-xs underline text-slate-600 hover:text-slate-900"
            >
              Wyczyść lokalnie mimo to
            </button>
          </div>
        )}
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
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Kurier {servicesLoading && <Loader2 className="inline w-3 h-3 animate-spin ml-1" />}
                  </label>
                  <select
                    value={serviceId ?? ""}
                    disabled={servicesLoading || services.length === 0}
                    onChange={(e) => {
                      const id = Number(e.target.value);
                      const s = services.find((x) => x.id === id);
                      setServiceId(id);
                      if (s) setServiceName(s.name || s.label || s.service || `service ${s.id}`);
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-slate-50"
                  >
                    {services.length === 0 && !servicesLoading && (
                      <option value="">Brak dostępnych kurierów</option>
                    )}
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name || s.label || s.service || `service ${s.id}`} (id: {s.id})
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
