"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingCart, FileText, User, LogOut } from "lucide-react";

const navItems = [
  { href: "/panel", label: "Dashboard", icon: LayoutDashboard },
  { href: "/panel/sklep", label: "Sklep", icon: ShoppingCart },
  { href: "/panel/zamowienia", label: "Zamówienia", icon: FileText },
  { href: "/panel/profil", label: "Profil", icon: User },
];

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuth = pathname === "/panel/login" || pathname === "/panel/rejestracja";

  if (isAuth) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-200">
          <Link href="/" className="text-lg font-bold text-slate-900">
            EZD RP <span className="text-violet-600">Panel</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-violet-50 text-violet-700"
                  : "text-slate-600 hover:bg-violet-50 hover:text-violet-700"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Wyloguj się
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
