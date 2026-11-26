"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AlertCircle, RefreshCw, CheckCircle2, ArrowRight, X } from "lucide-react";

interface RaportCreateBannersProps {
  error: string | null;
  duplicateWarning: string | null;
  isSuccess: boolean;
  submittedUserName: string;
  onRetry: () => void;
  onDismissDuplicate: () => void;
  onResetForNext: () => void;
}

export default function RaportCreateBanners({
  error,
  duplicateWarning,
  isSuccess,
  submittedUserName,
  onRetry,
  onDismissDuplicate,
  onResetForNext,
}: RaportCreateBannersProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {error && !duplicateWarning && (
        <div
          role="alert"
          className="flex items-start justify-between gap-3 p-4 rounded-xl bg-status-destructive-bg/30 border border-status-destructive/30 text-status-destructive text-sm"
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-status-destructive" />
            <div>
              <p className="font-semibold text-status-destructive-text">
                Gagal Memuat Data Formulir
              </p>
              <p className="text-xs text-status-destructive-text mt-0.5 leading-relaxed">
                {error}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onRetry}
            className="text-neutral-700 hover:text-neutral-900 cursor-pointer text-xs font-semibold flex items-center gap-1 shrink-0 rounded-lg px-2 py-1 transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <RefreshCw size={13} />
            <span>Muat Ulang</span>
          </button>
        </div>
      )}

      <AnimatePresence>
        {duplicateWarning && (
          <motion.div
            role="alert"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
            className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start justify-between gap-3 shadow-sm"
          >
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs text-amber-950 uppercase tracking-wider">
                  Raport Duplikat Terdeteksi (HTTP 409)
                </p>
                <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                  {duplicateWarning}
                </p>
                <p className="text-[11px] text-amber-800 mt-1">
                  Catatan input Anda tetap tersimpan dan tidak dihapus secara otomatis.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onDismissDuplicate}
              aria-label="Tutup peringatan raport duplikat"
              className="text-amber-700 hover:text-amber-950 hover:bg-amber-100 p-1.5 rounded-lg cursor-pointer transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSuccess && (
          <motion.div
            role="status"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
            className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>
                Raport untuk <strong>{submittedUserName}</strong> berhasil diterbitkan ke sistem backend.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/raport"
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline flex items-center gap-1 rounded-md px-1 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span>Lihat Daftar Raport</span>
                <ArrowRight size={13} />
              </Link>
              <button
                type="button"
                onClick={onResetForNext}
                className="text-xs text-neutral-700 hover:text-neutral-900 cursor-pointer font-medium rounded-md px-2 py-1 transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Input Lain
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
