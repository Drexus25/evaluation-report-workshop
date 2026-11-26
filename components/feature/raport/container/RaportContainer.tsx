"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, RefreshCw, Loader2 } from "lucide-react";
import RaportHeaderSection from "../section/RaportHeaderSection";
import RaportScoreSection from "../section/RaportScoreSection";
import RaportEvaluationSection from "../section/RaportEvaluationSection";
import RaportEmptySection from "../section/RaportEmptySection";
import { usePersonalReport } from "@/hooks/usePersonalReport";
import Button from "@/components/ui/Button";

export default function RaportContainer() {
  const {
    user,
    report,
    isLoading,
    isNotFound,
    isNetworkError,
    error,
    refetch,
  } = usePersonalReport();

  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-[100dvh] bg-canvas flex flex-col pt-24 pb-16">
      <main className="flex-1 layout-container space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-neutral-200">
          <div>
            <h2 className="font-headline text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Raport Pribadi Fungsionaris
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Hasil evaluasi kinerja semester aktif berbasis rubrik objektif organisasi
            </p>
          </div>
        </div>

        {/* Status Loading */}
        {isLoading && (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-xs text-neutral-500 font-medium font-sans">
              Menghubungi API dan memuat transkrip raport pribadi...
            </p>
          </div>
        )}

        {/* Status Error Jaringan / Server Error (500) — BUKAN EMPTY STATE */}
        {!isLoading && error && !isNotFound && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
            className="p-6 rounded-2xl bg-red-50 border border-red-200 text-red-950 space-y-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-headline text-base font-bold text-red-900">
                  {isNetworkError
                    ? "Gagal Terhubung ke Server Backend (Network Error)"
                    : "Terjadi Kesalahan Saat Mengambil Data Raport"}
                </h3>
                <p className="text-xs text-red-700 mt-1 leading-relaxed">
                  {error}
                </p>
                <p className="text-[11px] text-red-600/80 mt-1">
                  Kegagalan komunikasi server tidak ditampilkan sebagai data kosong.
                  Silakan periksa koneksi atau jalankan backend Anda, lalu klik tombol muat ulang di bawah.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={refetch}
                className="rounded-full bg-red-600 hover:bg-red-700 text-white"
                leftIcon={<RefreshCw size={14} />}
              >
                Coba Muat Ulang
              </Button>
            </div>
          </motion.div>
        )}

        {/* Konten Utama Saat Selesai Memuat */}
        {!isLoading && (!error || isNotFound) && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
            className="space-y-6"
          >
            {user && (
              <RaportHeaderSection
                user={user}
                createdAt={report?.created_at}
                hasRaport={Boolean(report)}
              />
            )}

            {/* 1. Jika Raport Ditemukan (200 OK) */}
            {report && (
              <>
                <RaportScoreSection
                  scores={report.scores}
                  averageScore={report.average_score}
                />
                <RaportEvaluationSection
                  evaluation={report.overall_evaluation}
                  createdBy={report.created_by}
                />
              </>
            )}

            {/* 2. Jika 404 Raport Belum Tersedia */}
            {!report && isNotFound && (
              <RaportEmptySection onRefresh={refetch} />
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}
