import { prisma } from "@/lib/prisma";
import { Mail, Phone, Building2, FileText, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Zapytania ofertowe</h1>
            <p className="text-sm text-slate-500 mt-1">{inquiries.length} zapytań łącznie</p>
          </div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Odśwież
          </Link>
        </div>

        {inquiries.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Brak zapytań</p>
          </div>
        )}

        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className={`bg-white rounded-xl border p-6 transition-shadow hover:shadow-md ${
                inq.read ? "border-slate-200" : "border-violet-300 shadow-sm"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-bold text-slate-900">
                      {inq.name || "Bez imienia"}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-700">
                      {inq.variant || "Brak wariantu"}
                    </span>
                    {inq.rfq && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                        RFQ
                      </span>
                    )}
                    {!inq.read && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Nowe
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    {inq.org && (
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        {inq.org}
                      </span>
                    )}
                    <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 text-violet-600 hover:underline">
                      <Mail className="w-4 h-4" />
                      {inq.email}
                    </a>
                    {inq.phone && (
                      <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 text-violet-600 hover:underline">
                        <Phone className="w-4 h-4" />
                        {inq.phone}
                      </a>
                    )}
                    {inq.voivodeship && (
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-slate-400" />
                        woj. {inq.voivodeship}
                      </span>
                    )}
                  </div>

                  {inq.notes && (
                    <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3 mt-2">
                      {inq.notes}
                    </p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(inq.createdAt).toLocaleString("pl-PL")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
