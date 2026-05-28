import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Clock, Building2, Mail, Phone, Package, Wallet, TrendingUp, CheckCircle2 } from "lucide-react";
import { OrderCheckbox } from "./OrderCheckbox";
import { ShipmentPanel } from "./ShipmentPanel";

export const dynamic = "force-dynamic";

const PLN = (v: number) =>
  v.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default async function AdminZamowieniaPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: true,
      user: {
        select: {
          organizationName: true,
          contactPerson: true,
          email: true,
          phone: true,
          nip: true,
        },
      },
    },
  });

  const orderTotal = (o: (typeof orders)[number]) =>
    o.items.reduce((sum, i) => sum + (i.unitPrice || 0) * i.quantity, 0);

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const totalNet = orders.reduce((sum, o) => sum + orderTotal(o), 0);
  const monthNet = orders
    .filter((o) => new Date(o.createdAt) >= monthStart)
    .reduce((sum, o) => sum + orderTotal(o), 0);

  const delivered = orders.filter((o) => o.status === "DELIVERED");
  const pending = orders.filter((o) => o.status !== "DELIVERED");
  const deliveredNet = delivered.reduce((sum, o) => sum + orderTotal(o), 0);
  const pendingNet = pending.reduce((sum, o) => sum + orderTotal(o), 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-1 mb-8 border-b border-slate-200">
          <Link href="/admin" className="px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-700">
            Zapytania
          </Link>
          <Link href="/admin/zamowienia" className="px-4 py-2.5 text-sm font-medium text-violet-700 border-b-2 border-violet-600">
            Zamówienia
          </Link>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Zamówienia</h1>
            <p className="text-sm text-slate-500 mt-1">{orders.length} zamówień łącznie</p>
          </div>
          <Link href="/admin/zamowienia" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Odśwież
          </Link>
        </div>

        {/* Podsumowanie obrotów */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <Wallet className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Obrót łączny</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{PLN(totalNet)} zł</p>
            <p className="text-xs text-slate-400 mt-1">netto · {PLN(totalNet * 1.23)} zł brutto</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wider">W tym miesiącu</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{PLN(monthNet)} zł</p>
            <p className="text-xs text-slate-400 mt-1">
              netto · {now.toLocaleDateString("pl-PL", { month: "long", year: "numeric" })}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Zrealizowane</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{PLN(deliveredNet)} zł</p>
            <p className="text-xs text-slate-400 mt-1">netto · {delivered.length} zamówień</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Do realizacji</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{PLN(pendingNet)} zł</p>
            <p className="text-xs text-slate-400 mt-1">netto · {pending.length} zamówień</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Brak zamówień</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const total = order.items.reduce((sum, i) => sum + (i.unitPrice || 0) * i.quantity, 0);
              const isDone = order.status === "DELIVERED";

              return (
                <div key={order.id} className={`bg-white rounded-xl border p-6 transition-all ${isDone ? "border-slate-200 opacity-75" : "border-violet-300 shadow-sm"}`}>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className={`text-lg font-bold ${isDone ? "text-slate-500 line-through" : "text-slate-900"}`}>
                          {order.orderNumber}
                        </h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${isDone ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                          {isDone ? "Zrealizowane" : "Do realizacji"}
                        </span>
                        {total > 0 && (
                          <span className="text-sm font-bold text-slate-700">{total.toFixed(2)} zł netto</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500 mt-2">
                        <span className="flex items-center gap-1.5">
                          <Building2 className="w-4 h-4" />
                          {order.user.organizationName}
                          {order.user.contactPerson && ` (${order.user.contactPerson})`}
                        </span>
                        <a href={`mailto:${order.user.email}`} className="flex items-center gap-1.5 text-violet-600 hover:underline">
                          <Mail className="w-4 h-4" />{order.user.email}
                        </a>
                        {order.user.phone && (
                          <a href={`tel:${order.user.phone}`} className="flex items-center gap-1.5 text-violet-600 hover:underline">
                            <Phone className="w-4 h-4" />{order.user.phone}
                          </a>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {new Date(order.createdAt).toLocaleString("pl-PL")}
                        </span>
                      </div>
                    </div>

                    <OrderCheckbox orderId={order.id} initialStatus={order.status} />
                  </div>

                  <div className="bg-slate-50 rounded-lg divide-y divide-slate-100">
                    {order.items.map((item) => (
                      <div key={item.id} className="px-4 py-2.5 flex items-center justify-between text-sm">
                        <span className="text-slate-700">{item.productName}</span>
                        <span className="text-slate-500">
                          {item.quantity} szt.
                          {item.unitPrice ? ` × ${item.unitPrice.toFixed(2)} zł = ${(item.unitPrice * item.quantity).toFixed(2)} zł` : ""}
                        </span>
                      </div>
                    ))}
                  </div>

                  {order.notes && (
                    <p className="text-xs text-slate-500 mt-3">Uwagi: {order.notes}</p>
                  )}

                  <ShipmentPanel
                    orderId={order.id}
                    orderNumber={order.orderNumber}
                    itemsCount={order.items.reduce((s, i) => s + i.quantity, 0)}
                    shipment={{
                      packageId: order.furgonetkaPackageId,
                      trackingNumber: order.trackingNumber,
                      trackingUrl: order.trackingUrl,
                      labelUrl: order.labelUrl,
                      carrierService: order.carrierService,
                      shipmentStatus: order.shipmentStatus,
                      shipmentCreatedAt: order.shipmentCreatedAt,
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
