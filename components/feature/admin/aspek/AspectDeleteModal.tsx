"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { Aspect } from "@/types";
import Button from "@/components/ui/Button";

interface AspectDeleteModalProps {
  isOpen: boolean;
  targetAspect: Aspect | null;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function AspectDeleteModal({
  isOpen,
  targetAspect,
  isSubmitting,
  onClose,
  onConfirm,
}: AspectDeleteModalProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="aspect-delete-modal-title"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface rounded-2xl border border-neutral-200 max-w-sm w-full p-6 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between gap-3">
              <h3
                id="aspect-delete-modal-title"
                className="font-headline text-lg font-bold text-neutral-900"
              >
                Konfirmasi Hapus Aspek
              </h3>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                aria-label="Tutup konfirmasi hapus aspek"
                className="text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 p-1.5 rounded-lg cursor-pointer transition-colors duration-150 ease-out disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Apakah Anda yakin ingin menghapus aspek penilaian{" "}
              <strong>&ldquo;{targetAspect?.name || "ini"}&rdquo;</strong>?
              Aspek yang telah terikat pada raport fungsionaris aktif tidak
              dapat dihapus.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                disabled={isSubmitting}
                onClick={onClose}
                className="rounded-full border-neutral-300 text-neutral-700"
              >
                Batal
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={isSubmitting}
                onClick={onConfirm}
                className="rounded-full bg-status-destructive hover:bg-status-destructive-text text-white"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Menghapus...
                  </span>
                ) : (
                  "Hapus Aspek"
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
