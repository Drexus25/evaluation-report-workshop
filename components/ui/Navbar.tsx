"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";

// Sub-komponen NavLink
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

function NavLink({
  href,
  children,
  isActive,
  onClick,
  className = "",
}: NavLinkProps) {
  const pathname = usePathname();
  const active = isActive !== undefined ? isActive : pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-base font-semibold transition-colors duration-200 ${
        active
          ? "text-primary font-bold"
          : "text-neutral-700 hover:text-primary font-medium"
      } ${className}`}
    >
      {children}
    </Link>
  );
}

// Sub-komponen Logo EvalOrg
function Logo({
  href = "/",
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 group transition-opacity hover:opacity-90 ${className}`}
    >
      {/* Icon Kotak Rounded Teal dengan Grafik Chart */}
      <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-surface shadow-xs transition-transform group-hover:scale-105">
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

      {/* Teks Brand */}
      <span className="text-xl font-bold text-primary tracking-tight font-headline">
        EvalOrg
      </span>
    </Link>
  );
}

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-neutral-200 shadow-xs transition-all ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Kiri: Brand Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Tengah: Menu Navigasi (Desktop) */}
        <nav className="hidden md:flex items-center gap-10">
          <NavLink href="/">Beranda</NavLink>
          <NavLink href="/report">Fitur Raport</NavLink>
          <NavLink href="/panduan">Panduan</NavLink>
        </nav>

        {/* Kanan: Actions (Login Button & User Profile Icon) */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/login">
            <Button variant="primary" size="md">
              Login
            </Button>
          </Link>

          <Link
            href="/login"
            aria-label="User profile"
            className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-surface hover:bg-primary-700 active:scale-95 transition-all shadow-sm"
          >
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
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        </div>

        {/* Tombol Hamburger & Profile untuk Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/login"
            aria-label="User profile"
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-surface hover:bg-primary-700 transition-colors shadow-sm"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-neutral-200 px-6 py-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3">
            <NavLink href="/" onClick={() => setMobileMenuOpen(false)}>
              Beranda
            </NavLink>
            <NavLink href="/report" onClick={() => setMobileMenuOpen(false)}>
              Fitur Raport
            </NavLink>
            <NavLink href="/panduan" onClick={() => setMobileMenuOpen(false)}>
              Panduan
            </NavLink>
          </nav>
          <div className="pt-2 border-t border-neutral-200">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="sm" className="w-full">
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
