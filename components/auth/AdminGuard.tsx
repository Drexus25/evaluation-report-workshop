"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/context/ToastContext";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAuthenticated, isInitializing } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isInitializing) return;

    if (!isAuthenticated) {
      toast.warning(
        "Silakan masuk terlebih dahulu untuk mengakses panel administrator.",
        "Akses Terbatas"
      );
      router.replace("/login?from=/admin");
      return;
    }

    if (user && user.role !== "admin") {
      toast.error(
        "Akses Ditolak (403): Hanya akun Administrator yang memiliki wewenang pada halaman ini.",
        "Akses Dilarang"
      );
      router.replace("/raport");
    }
  }, [isAuthenticated, user, isInitializing, router, toast]);

  if (isInitializing) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-canvas">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-neutral-500 font-medium font-sans">
            Memverifikasi hak akses administrator...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || (user && user.role !== "admin")) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-canvas">
        <div className="text-center space-y-3 p-6 max-w-sm">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 className="font-headline text-lg font-bold text-neutral-900">
            Akses Dibatasi
          </h2>
          <p className="text-xs text-neutral-500">
            Mengarahkan ke halaman yang sesuai dengan akun Anda...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
