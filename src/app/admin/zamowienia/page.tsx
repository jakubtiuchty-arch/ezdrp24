"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Building2, Mail, Phone, Package, CheckCircle2 } from "lucide-react";

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number | null;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  notes: string | null;
  deliveryCity: string | null;
  createdAt: string;
  user: {
    organizationName: string;
    contactPerson: string | null;
    email: string;
    phone: string | null;
    nip: string | null;
  };
  items: OrderItem[];
}

export default function AdminZamowieniaPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const toggleStatus = async (orderId: string, currentStatus: string) => {
    const newStatus = currentStatus === "DELIVERED" ? "PENDING" : "DELIVERED";
    await fetch("/api/admin/order-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status: newStatus }),
    });
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
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
        </div>

        {loading ? (
          <div className="text-center py-16 text-slate-400">Ładowanie...</div>
        ) : orders.length === 0 ? (
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
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          isDone ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                        }`}>
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

                    {/* Checkbox zrealizowane */}
                    <button
                      onClick={() => toggleStatus(order.id, order.status)}
                      className={`shrink-0 w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer ${
                        isDone
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "border-slate-300 hover:border-violet-400 text-transparent hover:text-violet-300"
                      }`}
                      title={isDone ? "Oznacz jako niezrealizowane" : "Oznacz jako zrealizowane"}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Pozycje */}
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
