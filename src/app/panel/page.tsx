import { getPanelUser } from "@/lib/panel-auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ShoppingCart, FileText, Monitor, Wrench } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PanelDashboard() {
  const user = await getPanelUser();
  if (!user) redirect("/panel/login");

  const [orderCount, invoiceCount, deviceCount, serviceCount] = await Promise.all([
    prisma.order.count({ where: { userId: user.id } }),
    prisma.invoice.count({ where: { order: { userId: user.id } } }),
    prisma.device.count({ where: { userId: user.id } }),
    prisma.serviceRequest.count({ where: { userId: user.id } }),
  ]);

  const recentOrders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { items: true },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Witaj, {user.contactPerson || user.organizationName}
        </h1>
        <p className="text-sm text-slate-500 mt-1">{user.organizationName}</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Zamówienia", value: orderCount, icon: ShoppingCart, href: "/panel/zamowienia", color: "bg-violet-100 text-violet-600" },
          { label: "Faktury", value: invoiceCount, icon: FileText, href: "/panel/faktury", color: "bg-blue-100 text-blue-600" },
          { label: "Urządzenia", value: deviceCount, icon: Monitor, href: "/panel/urzadzenia", color: "bg-emerald-100 text-emerald-600" },
          { label: "Zgłoszenia serwisowe", value: serviceCount, icon: Wrench, href: "/panel/serwis", color: "bg-amber-100 text-amber-600" },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
            </div>
            <p className="text-sm font-medium text-slate-600">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Ostatnie zamówienia */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">Ostatnie zamówienia</h2>
          <Link href="/panel/zamowienia" className="text-sm text-violet-600 hover:underline font-medium">
            Zobacz wszystkie
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">Brak zamówień</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-5 flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">{order.orderNumber}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {order.items.length} pozycji &middot; {new Date(order.createdAt).toLocaleDateString("pl-PL")}
                  </p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  order.status === "SHIPPED" ? "bg-blue-100 text-blue-700" :
                  order.status === "DELIVERED" ? "bg-emerald-100 text-emerald-700" :
                  order.status === "PENDING" ? "bg-amber-100 text-amber-700" :
                  "bg-slate-100 text-slate-600"
                }`}>
                  {order.status === "PENDING" && "Oczekujące"}
                  {order.status === "SHIPPED" && "Wysłane"}
                  {order.status === "DELIVERED" && "Dostarczone"}
                  {!["PENDING", "SHIPPED", "DELIVERED"].includes(order.status) && order.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
