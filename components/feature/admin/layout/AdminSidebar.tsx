"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/libs/cn";
import {
  BarChart3,
  LayoutDashboard,
  Users,
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
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} aria-hidden="true" />, exact: true },
  { label: "Data Fungsionaris", href: "/admin/fungsionaris", icon: <Users size={18} aria-hidden="true" /> },
  { label: "Kelola Aspek", href: "/admin/aspek", icon: <Layers size={18} aria-hidden="true" /> },
  { label: "Daftar Raport", href: "/admin/raport", icon: <FileSpreadsheet size={18} aria-hidden="true" />, exact: true },
  { label: "Input Raport Baru", href: "/admin/raport/create", icon: <FilePlus size={18} aria-hidden="true" /> },
];

function SidebarBrand({ compact = false, onClick }: { compact?: boolean; onClick?: () => void }) {
  return (
    <Link
      href="/admin"
      onClick={onClick}
      className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div
        className={cn(
          "rounded-lg bg-primary flex items-center justify-center text-surface shadow-xs",
          compact ? "w-8 h-8" : "w-9 h-9"
        )}
      >
        <BarChart3 size={compact ? 18 : 20} aria-hidden="true" />
      </div>
      <span className={cn("font-headline font-bold text-primary tracking-tight", compact ? "text-lg" : "text-xl")}>
        EvalOrg
      </span>
    </Link>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const isLinkActive = (item: NavLinkItem) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const navContent = (
    <div className="flex flex-col h-full justify-between bg-surface">
      <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
        <SidebarBrand onClick={() => setMobileOpen(false)} />
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          aria-label="Tutup menu admin"
          className="lg:hidden text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 p-2 rounded-lg transition-colors duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 px-3 block mb-2 font-mono">
            Menu Utama
          </span>
          <nav aria-label="Navigasi Admin" className="space-y-1">
            {navItems.map((item) => {
              const active = isLinkActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    active ? "bg-primary text-surface font-bold shadow-xs" : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                  )}
                >
                  <span className={active ? "text-surface" : "text-neutral-500"}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-neutral-200 space-y-2">
        {user && (
          <div className="px-2.5 py-2 rounded-lg bg-neutral-50 border border-neutral-200/60">
            <p className="text-xs font-semibold text-neutral-900 truncate">{user.name}</p>
            <p className="text-[11px] text-neutral-500 truncate">{user.email}</p>
          </div>
        )}
        <button
          type="button"
          onClick={() => logout()}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 text-xs font-semibold text-neutral-600 hover:text-status-destructive-text hover:bg-neutral-100 rounded-xl transition-colors duration-150 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <LogOut size={15} aria-hidden="true" />
          Keluar (Logout)
        </button>
      </div>
    </div>
  );

  return (
    <>
      <header className="lg:hidden bg-surface border-b border-neutral-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <SidebarBrand compact />
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Buka menu admin"
          aria-expanded={mobileOpen}
        >
          <Menu size={22} aria-hidden="true" />
        </button>
      </header>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex"
          onClick={() => setMobileOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi admin"
            className="w-72 max-w-[80vw] h-[100dvh] bg-surface shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {navContent}
          </div>
        </div>
      )}

      <aside className="hidden lg:flex w-64 h-[100dvh] sticky top-0 flex-col border-r border-neutral-200 bg-surface shrink-0 z-30">
        {navContent}
      </aside>
    </>
  );
}
