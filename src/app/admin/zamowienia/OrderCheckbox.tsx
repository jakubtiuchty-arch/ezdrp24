"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export function OrderCheckbox({ orderId, initialStatus }: { orderId: string; initialStatus: string }) {
  const [isDone, setIsDone] = useState(initialStatus === "DELIVERED");

  const toggle = async () => {
    const newStatus = isDone ? "PENDING" : "DELIVERED";
    setIsDone(!isDone);
    await fetch("/api/admin/order-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status: newStatus }),
    });
  };

  return (
    <button
      onClick={toggle}
      className={`shrink-0 w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer ${
        isDone
          ? "bg-emerald-500 border-emerald-500 text-white"
          : "border-slate-300 hover:border-violet-400 text-transparent hover:text-violet-300"
      }`}
      title={isDone ? "Oznacz jako niezrealizowane" : "Oznacz jako zrealizowane"}
    >
      <CheckCircle2 className="w-5 h-5" />
    </button>
  );
}
