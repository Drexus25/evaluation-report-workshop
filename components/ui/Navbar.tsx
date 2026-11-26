"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/libs/cn";
import { buttonVariants } from "./Button";
import RoleBadge from "./RoleBadge";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

function NavLink({ href, children, isActive, onClick, className }: NavLinkProps) {
  const pathname = usePathname();
  const active = isActive !== undefined ? isActive : pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-base transition-colors duration-150 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        active ? "text-primary font-bold" : "text-neutral-700 hover:text-primary font-medium",
        className
      )}
    >
      {children}
    </Link>
  );
}

function Logo({ href = "/", className }: { href?: string; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 group transition-opacity hover:opacity-90 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
    >
      <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-surface shadow-xs transition-transform duration-150 group-hover:scale-105">
        <BarChart3 size={20} aria-hidden="true" />
      </div>
      <span className="text-xl font-bold text-primary tracking-tight font-headline">
        EvalOrg
      </span>
    </Link>
  );
}

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    { href: "/", label: "Beranda", visible: true },
    { href: "/raport", label: "Raport Saya", visible: isAuthenticated },
    { href: "/admin", label: "Panel Admin", visible: isAuthenticated && user?.role === "admin" },
  ].filter((item) => item.visible);

  const roleBadgeVariant =
    user?.role === "admin" ? "admin" : user?.role === "bph" ? "bph" : "staff";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-neutral-200 shadow-xs transition-all duration-150",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <div className="flex-shrink-0">
          <Logo />
        </div>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-xs font-bold text-neutral-900 leading-tight">{user.name}</p>
                  <p className="text-[11px] text-neutral-500">{user.position || user.email}</p>
                </div>
                <RoleBadge variant={roleBadgeVariant} size="sm">
                  {user.role.toUpperCase()}
                </RoleBadge>
              </div>
              <button
                type="button"
                onClick={() => logout()}
                className="p-2 rounded-xl text-neutral-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                title="Keluar dari akun"
                aria-label="Keluar dari akun"
              >
                <LogOut size={18} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <Link href="/login" className={buttonVariants({ variant: "primary", size: "md" })}>
              Masuk
            </Link>
          )}
        </div>

        <div className="flex md:hidden items-center gap-2">
          {isAuthenticated && user ? (
            <button
              type="button"
              onClick={() => logout()}
              className="p-2 rounded-lg text-neutral-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              title="Keluar dari akun"
              aria-label="Keluar dari akun"
            >
              <LogOut size={18} aria-hidden="true" />
            </button>
          ) : (
            <Link href="/login" className={buttonVariants({ variant: "primary", size: "sm" })}>
              Masuk
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-neutral-200 px-6 py-4 flex flex-col gap-4 shadow-lg">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="pt-2 border-t border-neutral-200">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full py-2 px-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <LogOut size={16} aria-hidden="true" />
                Keluar dari Akun ({user?.name})
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className={buttonVariants({ variant: "primary", size: "sm", className: "w-full" })}
              >
                Masuk ke Akun
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
