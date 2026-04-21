"use client";

import { useState } from "react";
import { Send, Loader2, Check } from "lucide-react";

export function SendOfferButton({ inquiryId, variant, email }: { inquiryId: string; variant: string | null; email: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  if (!variant) return null;

  const send = async () => {
    setStatus("sending");
    const res = await fetch("/api/admin/send-offer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inquiryId }),
    });
    const data = await res.json();

    if (data.success) {
      setStatus("sent");
      setMessage(`Wysłano ${data.offerNumber} → ${email}`);
    } else {
      setStatus("error");
      setMessage(data.error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {status === "idle" && (
        <button
          onClick={send}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-medium hover:bg-violet-700 transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          Wyślij ofertę
        </button>
      )}
      {status === "sending" && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-100 text-violet-700 text-xs font-medium">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          Wysyłanie...
        </span>
      )}
      {status === "sent" && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-medium">
          <Check className="w-3.5 h-3.5" />
          {message}
        </span>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-red-600">{message}</span>
          <button
            onClick={() => { setStatus("idle"); setMessage(""); }}
            className="text-xs text-violet-600 hover:underline cursor-pointer"
          >
            Ponów
          </button>
        </div>
      )}
    </div>
  );
}
