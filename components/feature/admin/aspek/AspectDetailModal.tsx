"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { Aspect } from "@/types";
import Button from "@/components/ui/Button";
import RoleBadge from "@/components/ui/RoleBadge";

interface AspectDetailModalProps {
  detailTarget: Aspect | null;
  selectedAspect: Aspect | null;
  isDetailLoading: boolean;
  onClose: () => void;
  onEdit: (aspect: Aspect) => void;
}

function formatTimestamp(value?: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function AspectDetailModal({
  detailTarget,
  selectedAspect,
  isDetailLoading,
  onClose,
  onEdit,
}: AspectDetailModalProps) {
  const shouldReduceMotion = useReducedMotion();

  const resolvedAspect = selectedAspect ?? detailTarget;
  const createdAtLabel = formatTimestamp(selectedAspect?.created_at);
  const updatedAtLabel = formatTimestamp(selectedAspect?.updated_at);

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
            aria-labelledby="aspect-detail-modal-title"
            initial={
              shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 10 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.95, y: 10 }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.18,
              ease: "easeOut",
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface rounded-2xl border border-neutral-200 max-w-lg w-full p-6 space-y-5 shadow-xl"
          >
            <div className="flex items-start justify-between pb-3 border-b border-neutral-200">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    id="aspect-detail-modal-title"
                    className="font-headline text-lg font-bold text-neutral-900"
                  >
                    {resolvedAspect?.name || "Detail Aspek Penilaian"}
                  </h3>
                  {resolvedAspect && (
                    <RoleBadge
                      variant={
                        resolvedAspect.role_type === "bph" ? "bph" : "staff"
                      }
                      size="sm"
                    >
                      {resolvedAspect.role_type === "bph"
                        ? "Khusus BPH"
                        : "Khusus Staff"}
                    </RoleBadge>
                  )}
                </div>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Rincian parameter rubrik evaluasi fungsionaris
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup detail aspek"
                className="text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 p-1.5 rounded-lg cursor-pointer transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {isDetailLoading || !selectedAspect ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
                <p className="text-xs text-neutral-600 font-medium">
                  Memuat detail aspek penilaian dari server...
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                      ID Referensi Aspek
                    </span>
                    <p className="font-mono text-xs text-neutral-800 break-all">
                      {selectedAspect.id}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-neutral-800 block">
                      Keterangan / Indikator Penilaian
                    </span>
                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-xs text-neutral-700 leading-relaxed">
                      {selectedAspect.description?.trim() ? (
                        selectedAspect.description
                      ) : (
                        <span className="italic text-neutral-500">
                          Tidak ada deskripsi tambahan.
                        </span>
                      )}
                    </div>
                  </div>

                  {(createdAtLabel || updatedAtLabel) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {createdAtLabel && (
                        <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
                          <span className="text-[11px] font-semibold text-neutral-500 block">
                            Dibuat Pada
                          </span>
                          <span className="font-medium text-neutral-800 tabular-nums">
                            {createdAtLabel}
                          </span>
                        </div>
                      )}
                      {updatedAtLabel && (
                        <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
                          <span className="text-[11px] font-semibold text-neutral-500 block">
                            Diperbarui Pada
                          </span>
                          <span className="font-medium text-neutral-800 tabular-nums">
                            {updatedAtLabel}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(selectedAspect)}
                    className="rounded-full"
                  >
                    Ubah Aspek
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="border border-neutral-300"
                  >
                    Tutup
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
