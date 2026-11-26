"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { ReportListItem } from "@/types";

interface RaportDeleteModalProps {
  deleteTarget: ReportListItem | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function RaportDeleteModal({
  deleteTarget,
  isDeleting,
  onClose,
  onConfirm,
}: RaportDeleteModalProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-delete-modal-title"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface rounded-2xl border border-neutral-200 max-w-sm w-full p-6 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between gap-3">
              <h3
                id="report-delete-modal-title"
                className="font-headline text-lg font-bold text-neutral-900"
              >
                Hapus Raport Fungsionaris
              </h3>
              <button
                type="button"
                onClick={onClose}
                disabled={isDeleting}
                aria-label="Tutup konfirmasi hapus raport"
                className="text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 p-1.5 rounded-lg cursor-pointer transition-colors duration-150 ease-out disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Apakah Anda yakin ingin menghapus transkrip raport untuk{" "}
              <strong>
                &ldquo;
                {deleteTarget.name ||
                  deleteTarget.user?.name ||
                  "fungsionaris ini"}
                &rdquo;
              </strong>
              ? Fungsionaris bersangkutan akan kembali ke status &ldquo;Menunggu
              Penilaian&rdquo;.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="ghost"
                size="sm"
                disabled={isDeleting}
                onClick={onClose}
                className="border border-neutral-300"
              >
                Batal
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={isDeleting}
                onClick={onConfirm}
                className="bg-status-destructive hover:bg-status-destructive-text text-white"
              >
                {isDeleting ? (
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Menghapus...
                  </span>
                ) : (
                  "Hapus Raport"
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
