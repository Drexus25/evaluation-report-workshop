"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/context/ToastContext";

export default function AuthOnlyGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isInitializing } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isInitializing) return;

    if (!isAuthenticated) {
      toast.info(
        "Silakan masuk terlebih dahulu untuk melihat raport fungsionaris.",
        "Sesi Dibutuhkan"
      );
      router.replace("/login?from=/raport");
    }
  }, [isAuthenticated, isInitializing, router, toast]);

  if (isInitializing) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-canvas">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-neutral-500 font-medium font-sans">
            Memuat data sesi pengguna...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-canvas">
        <div className="text-center space-y-3 p-6 max-w-sm">
          <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center mx-auto">
            <User className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 className="font-headline text-lg font-bold text-neutral-900">
            Sesi Diperlukan
          </h2>
          <p className="text-xs text-neutral-500">
            Mengarahkan Anda ke halaman masuk...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
