"use client";

import { useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2, Check, X, Loader2, Package } from "lucide-react";

const PRODUCTS = [
  {
    id: "etykiety-50x30",
    name: "Etykiety termotransferowe 50 mm × 30 mm",
    description: "1000 szt. na rolce. Papier termotransferowy do drukarek Zebra.",
    price: 39.00,
    unit: "rolka",
  },
  {
    id: "etykiety-70x40",
    name: "Etykiety termotransferowe 70 mm × 40 mm",
    description: "1000 szt. na rolce. Papier termotransferowy do drukarek Zebra.",
    price: 46.00,
    unit: "rolka",
  },
  {
    id: "tasma-110x74",
    name: "Taśma termotransferowa woskowo-żywiczna Zebra 110 mm × 74 m",
    description: "Taśma wax-resin do drukarek Zebra ZD230t / ZD421t. Trwały wydruk 5+ lat.",
    price: 14.99,
    unit: "rolka",
  },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function SklepPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const addToCart = (product: typeof PRODUCTS[0]) => {
    const qty = quantities[product.id] || 1;
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: qty }];
    });
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const submitOrder = async () => {
    if (cart.length === 0) return;
    setLoading(true);

    try {
      const res = await fetch("/api/panel/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          notes,
          delivery: JSON.parse(localStorage.getItem("ezdrp_delivery") || "null"),
        }),
      });
      const data = await res.json();

      if (data.success) {
        setOrderNumber(data.orderNumber);
        setShowModal(true);
        setCart([]);
        setNotes("");
      } else {
        alert(data.error || "Błąd składania zamówienia. Spróbuj ponownie.");
      }
    } catch {
      alert("Błąd połączenia. Spróbuj ponownie.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Materiały eksploatacyjne</h1>
      <p className="text-sm text-slate-500 mb-8">Etykiety i taśmy do drukarek EZD. Ceny netto.</p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Produkty */}
        <div className="lg:col-span-2 space-y-4">
          {PRODUCTS.map((product) => (
              <div key={product.id} className="bg-white rounded-xl border border-slate-200 p-5 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">{product.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{product.description}</p>
                  <p className="text-lg font-bold text-slate-900 mt-2">
                    {product.price.toFixed(2)} zł <span className="text-xs font-normal text-slate-500">netto / {product.unit}</span>
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <div className="flex items-center border border-slate-300 rounded-lg">
                    <button onClick={() => setQuantities(prev => ({ ...prev, [product.id]: Math.max(1, (prev[product.id] || 1) - 1) }))}
                      className="w-8 h-9 flex items-center justify-center hover:bg-slate-50 transition-colors rounded-l-lg">
                      <Minus className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={quantities[product.id] || 1}
                      onChange={(e) => setQuantities(prev => ({ ...prev, [product.id]: Math.max(1, parseInt(e.target.value) || 1) }))}
                      className="w-12 h-9 text-center text-sm font-bold text-slate-900 border-x border-slate-300 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button onClick={() => setQuantities(prev => ({ ...prev, [product.id]: (prev[product.id] || 1) + 1 }))}
                      className="w-8 h-9 flex items-center justify-center hover:bg-slate-50 transition-colors rounded-r-lg">
                      <Plus className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                  </div>
                  <button onClick={() => addToCart(product)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors">
                    <ShoppingCart className="w-4 h-4" /> Dodaj
                  </button>
                </div>
              </div>
          ))}
        </div>

        {/* Koszyk */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-8">
            <h2 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
              <ShoppingCart className="w-5 h-5 text-violet-600" />
              Koszyk
              {cart.length > 0 && (
                <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-700">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </h2>

            {cart.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">Koszyk jest pusty</p>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-800 text-xs leading-tight">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.quantity} × {item.price.toFixed(2)} zł</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-medium text-slate-900">{(item.price * item.quantity).toFixed(2)} zł</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-200 pt-3 mb-4">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>Razem netto:</span>
                    <span>{total.toFixed(2)} zł</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">+ VAT 23% = {(total * 1.23).toFixed(2)} zł brutto</p>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Uwagi do zamówienia</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="np. preferowany termin dostawy..."
                  />
                </div>

                <button
                  onClick={submitOrder}
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-violet-600 text-white font-bold text-sm hover:bg-violet-700 disabled:bg-violet-400 transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Składanie...</> : "Złóż zamówienie"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal potwierdzenia */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/75" onClick={() => setShowModal(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>

              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-emerald-600" strokeWidth={3} />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">Zamówienie złożone!</h3>
              <p className="text-slate-600 mb-4">
                Numer zamówienia: <strong className="font-mono">{orderNumber}</strong>
              </p>

              <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 text-left space-y-2 mb-6">
                <div className="flex items-start gap-2">
                  <Package className="w-4 h-4 text-violet-600 mt-0.5 shrink-0" />
                  <span>Przystępujemy do realizacji zamówienia. Otrzymasz potwierdzenie na email.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-violet-600 mt-0.5 shrink-0" />
                  <span>Faktura VAT zostanie wystawiona w <strong>KSeF</strong> i wysłana elektronicznie.</span>
                </div>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 rounded-lg bg-violet-600 text-white font-medium text-sm hover:bg-violet-700 transition-colors"
              >
                Zamknij
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
