import { getPanelUser } from "@/lib/panel-auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const statusMap: Record<string, { label: string; className: string }> = {
  PENDING: { label: "Oczekujące", className: "bg-amber-100 text-amber-700" },
  CONFIRMED: { label: "Potwierdzone", className: "bg-blue-100 text-blue-700" },
  SHIPPED: { label: "Wysłane", className: "bg-indigo-100 text-indigo-700" },
  DELIVERED: { label: "Dostarczone", className: "bg-emerald-100 text-emerald-700" },
  CANCELLED: { label: "Anulowane", className: "bg-red-100 text-red-700" },
};

export default async function ZamowieniaPage() {
  const user = await getPanelUser();
  if (!user) redirect("/panel/login");

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true, invoice: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Zamówienia</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400">
          Brak zamówień
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusMap[order.status] || { label: order.status, className: "bg-slate-100 text-slate-600" };
            const total = order.items.reduce((sum, item) => sum + (item.unitPrice || 0) * item.quantity, 0);

            return (
              <div key={order.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {/* Header */}
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="font-bold text-slate-900">{order.orderNumber}</h2>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${status.className}`}>
                        {status.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(order.createdAt).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
                      {order.deliveryCity && ` · Dostawa: ${order.deliveryCity}`}
                    </p>
                  </div>
                  {total > 0 && (
                    <p className="text-lg font-bold text-slate-900">{total.toLocaleString("pl-PL")} zł <span className="text-xs font-normal text-slate-500">netto</span></p>
                  )}
                </div>

                {/* Items */}
                <div className="divide-y divide-slate-50">
                  {order.items.map((item) => (
                    <div key={item.id} className="px-5 py-3 flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium text-slate-800">{item.productName}</p>
                        <p className="text-xs text-slate-400">SKU: {item.productSku}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-700">{item.quantity} {item.unit}</p>
                        {item.unitPrice && (
                          <p className="text-xs text-slate-400">{item.unitPrice.toLocaleString("pl-PL")} zł/szt.</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                {order.notes && (
                  <div className="px-5 py-3 border-t border-slate-100 bg-slate-50">
                    <p className="text-xs text-slate-500">Uwagi: {order.notes}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
