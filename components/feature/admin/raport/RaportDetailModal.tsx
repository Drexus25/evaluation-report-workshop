"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import RoleBadge from "@/components/ui/RoleBadge";
import Button from "@/components/ui/Button";
import { ReportListItem, RaportData } from "@/types";

interface RaportDetailModalProps {
  detailTarget: ReportListItem | null;
  selectedReport: RaportData | null;
  isDetailLoading: boolean;
  resolveAspectName: (aspectId: string, aspectName?: string, index?: number) => string;
  onClose: () => void;
}

export default function RaportDetailModal({
  detailTarget,
  selectedReport,
  isDetailLoading,
  resolveAspectName,
  onClose,
}: RaportDetailModalProps) {
  const shouldReduceMotion = useReducedMotion();

  const resolvedName =
    selectedReport?.name ||
    selectedReport?.user?.name ||
    detailTarget?.name ||
    detailTarget?.user?.name ||
    "Fungsionaris";

  const resolvedRole =
    (selectedReport?.role ||
      selectedReport?.user?.role ||
      detailTarget?.role ||
      detailTarget?.user?.role) === "bph"
      ? "bph"
      : "staff";

  const resolvedMeta = detailTarget
    ? [
        selectedReport?.position ||
          selectedReport?.user?.position ||
          detailTarget.position ||
          detailTarget.user?.position,
        selectedReport?.ministry ||
          selectedReport?.user?.ministry ||
          detailTarget.ministry ||
          detailTarget.user?.ministry,
        `ID: ${detailTarget.id.slice(0, 8)}...`,
      ]
        .filter(Boolean)
        .join(" • ")
    : "";

  return (
    <AnimatePresence>
      {detailTarget && (
        <div
          className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-detail-modal-title"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface rounded-2xl border border-neutral-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-xl"
          >
            <div className="flex items-start justify-between pb-4 border-b border-neutral-200">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    id="report-detail-modal-title"
                    className="font-headline text-xl font-bold text-neutral-900"
                  >
                    Detail Raport: {resolvedName}
                  </h3>
                  <RoleBadge variant={resolvedRole} size="sm">
                    {resolvedRole === "bph" ? "BPH" : "Staff"}
                  </RoleBadge>
                </div>
                <p className="text-xs text-neutral-600 mt-1">{resolvedMeta}</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup detail raport"
                className="text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 p-1.5 rounded-lg cursor-pointer transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X size={18} />
              </button>
            </div>

            {isDetailLoading || !selectedReport ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
                <p className="text-xs text-neutral-600 font-medium">
                  Memuat rincian skor dan evaluasi raport...
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                    <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider block">
                      Nilai Rata-Rata Akhir (BE Response)
                    </span>
                    <span className="font-headline text-3xl font-bold text-primary mt-1 block tabular-nums">
                      {(Number(selectedReport.average_score) || 0).toFixed(2)}
                      <span className="text-xs text-neutral-500 font-normal"> / 100</span>
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                    <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider block">
                      Cakupan Aspek
                    </span>
                    <span className="font-headline text-3xl font-bold text-neutral-900 mt-1 block tabular-nums">
                      {selectedReport.scores?.length || 0}
                      <span className="text-xs text-neutral-500 font-normal">
                        {" "}
                        Aspek Terpenuhi
                      </span>
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-headline text-sm font-bold text-neutral-900">
                    Rincian Skor per Aspek Penilaian
                  </h4>
                  <div className="divide-y divide-neutral-200 border border-neutral-200 rounded-xl overflow-hidden">
                    {selectedReport.scores?.map((sc, idx) => {
                      const feedbackText = sc.feedback || sc.notes;
                      return (
                        <div
                          key={sc.aspect_id}
                          className="p-3.5 bg-surface text-xs space-y-1.5"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded bg-neutral-100 text-neutral-700 font-bold flex items-center justify-center text-[10px] tabular-nums shrink-0">
                                {idx + 1}
                              </span>
                              <span className="font-semibold text-neutral-800">
                                {resolveAspectName(sc.aspect_id, sc.aspect_name, idx)}
                              </span>
                            </div>
                            <span className="font-headline font-bold text-neutral-900 text-sm tabular-nums shrink-0">
                              {sc.score} / 100
                            </span>
                          </div>
                          {feedbackText && (
                            <p className="text-xs text-neutral-600 pl-7 leading-relaxed">
                              {feedbackText}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-headline text-sm font-bold text-neutral-900">
                    Evaluasi Menyeluruh
                  </h4>
                  <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-xs text-neutral-700 leading-relaxed italic">
                    &ldquo;{selectedReport.overall_evaluation}&rdquo;
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-200 text-xs text-neutral-600">
                  <span>
                    Disahkan oleh: {selectedReport.created_by || "Administrator"}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="border border-neutral-300"
                  >
                    Tutup Panel
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
