import { getPanelUser } from "@/lib/panel-auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Download, FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function FakturyPage() {
  const user = await getPanelUser();
  if (!user) redirect("/panel/login");

  const invoices = await prisma.invoice.findMany({
    where: { order: { userId: user.id } },
    orderBy: { issueDate: "desc" },
    include: { order: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Faktury</h1>

      {invoices.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-400">Brak faktur</p>
          <p className="text-xs text-slate-400 mt-1">Faktury pojawią się tutaj po złożeniu zamówienia</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left py-3 px-5 font-medium text-slate-600">Nr faktury</th>
                <th className="text-left py-3 px-5 font-medium text-slate-600">Zamówienie</th>
                <th className="text-left py-3 px-5 font-medium text-slate-600">Data</th>
                <th className="text-right py-3 px-5 font-medium text-slate-600">Kwota brutto</th>
                <th className="text-center py-3 px-5 font-medium text-slate-600">Status</th>
                <th className="text-center py-3 px-5 font-medium text-slate-600">PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="py-3 px-5 font-medium text-slate-900">{inv.invoiceNumber}</td>
                  <td className="py-3 px-5 text-slate-600">{inv.order.orderNumber}</td>
                  <td className="py-3 px-5 text-slate-600">{new Date(inv.issueDate).toLocaleDateString("pl-PL")}</td>
                  <td className="py-3 px-5 text-right font-medium text-slate-900">{inv.grossAmount.toLocaleString("pl-PL")} zł</td>
                  <td className="py-3 px-5 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      inv.paymentStatus === "PAID" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {inv.paymentStatus === "PAID" ? "Opłacona" : "Nieopłacona"}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-center">
                    {inv.fileUrl ? (
                      <a href={inv.fileUrl} className="text-violet-600 hover:text-violet-700">
                        <Download className="w-4 h-4 inline" />
                      </a>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
