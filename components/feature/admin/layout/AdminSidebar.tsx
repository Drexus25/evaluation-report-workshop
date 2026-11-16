"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  FileSpreadsheet,
  FilePlus,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface NavLinkItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  exact?: boolean;
}

const navItems: NavLinkItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard size={18} />,
    exact: true,
  },
  {
    label: "Kelola Aspek",
    href: "/admin/aspek",
    icon: <Layers size={18} />,
  },
  {
    label: "Daftar Raport",
    href: "/admin/raport",
    icon: <FileSpreadsheet size={18} />,
    exact: true,
  },
  {
    label: "Input Raport Baru",
    href: "/admin/raport/create",
    icon: <FilePlus size={18} />,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLinkActive = (item: NavLinkItem) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between bg-surface">
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="inline-flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-surface shadow-xs">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 16v-4" />
                <path d="M12 16v-7" />
                <path d="M17 16v-2" />
              </svg>
            </div>
            <span className="text-xl font-bold text-primary tracking-tight font-headline">
              EvalOrg
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-3 block mb-2 font-mono">
            Menu Utama
          </span>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = isLinkActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    active
                      ? "bg-primary text-surface font-bold shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                  }`}
                >
                  <span className={active ? "text-surface" : "text-neutral-500"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-neutral-200">
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 text-xs font-semibold text-neutral-600 hover:text-status-destructive-text hover:bg-neutral-100 rounded-xl transition-colors"
        >
          <LogOut size={15} />
          Keluar
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <header className="lg:hidden bg-surface border-b border-neutral-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <Link href="/admin" className="inline-flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-surface shadow-xs">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 16v-4" />
              <path d="M12 16v-7" />
              <path d="M17 16v-2" />
            </svg>
          </div>
          <span className="font-headline font-bold text-primary text-lg">
            EvalOrg
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 cursor-pointer"
          aria-label="Buka menu admin"
        >
          <Menu size={22} />
        </button>
      </header>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="w-72 max-w-[80vw] h-full bg-surface shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {navContent}
          </div>
        </div>
      )}

      <aside className="hidden lg:flex w-64 h-screen sticky top-0 flex-col border-r border-neutral-200 bg-surface shrink-0 z-30">
        {navContent}
      </aside>
    </>
  );
}
