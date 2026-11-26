"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { Aspect } from "@/types";
import { aspectSchema, AspectFormValues } from "@/schemas/aspekSchema";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface AspectFormModalProps {
  isOpen: boolean;
  editingAspect: Aspect | null;
  isSubmitting: boolean;
  fieldErrors: Record<string, string>;
  onClose: () => void;
  onSubmit: (data: AspectFormValues) => Promise<void>;
}

export default function AspectFormModal({
  isOpen,
  editingAspect,
  isSubmitting,
  fieldErrors,
  onClose,
  onSubmit,
}: AspectFormModalProps) {
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AspectFormValues>({
    resolver: zodResolver(aspectSchema),
    defaultValues: {
      name: "",
      description: "",
      role_type: "bph",
    },
  });

  useEffect(() => {
    if (!isOpen) return;
    reset({
      name: editingAspect?.name ?? "",
      description: editingAspect?.description ?? "",
      role_type: editingAspect?.role_type ?? "bph",
    });
  }, [isOpen, editingAspect, reset]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => !isSubmitting && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="aspect-form-modal-title"
            initial={
              shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 10 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.95, y: 10 }
            }
            transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface rounded-2xl border border-neutral-200 max-w-lg w-full p-6 space-y-5 shadow-xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <h3
                id="aspect-form-modal-title"
                className="font-headline text-lg font-bold text-neutral-900"
              >
                {editingAspect ? "Ubah Aspek Penilaian" : "Tambah Aspek Baru"}
              </h3>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                aria-label="Tutup modal aspek"
                className="text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 p-1.5 rounded-lg cursor-pointer transition-colors duration-150 ease-out disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                {...register("name")}
                label="Nama Aspek Penilaian"
                placeholder="Contoh: Integritas & Akuntabilitas"
                error={errors.name?.message || fieldErrors.name}
                disabled={isSubmitting}
              />

              <div className="flex flex-col gap-1.5 font-sans">
                <label
                  htmlFor="aspect-role-type"
                  className="text-xs font-bold text-neutral-800"
                >
                  Role Target Berlaku
                </label>
                <select
                  id="aspect-role-type"
                  {...register("role_type")}
                  disabled={isSubmitting}
                  className="w-full bg-neutral-100 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary focus:bg-surface cursor-pointer transition-colors duration-150 ease-out"
                >
                  <option value="bph">Khusus BPH</option>
                  <option value="staff">Khusus Staff</option>
                </select>
                {(errors.role_type?.message || fieldErrors.role_type) && (
                  <p className="text-[11px] text-status-destructive-text font-medium">
                    {errors.role_type?.message || fieldErrors.role_type}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5 font-sans">
                <label
                  htmlFor="aspect-description"
                  className="text-xs font-bold text-neutral-800"
                >
                  Keterangan / Indikator (Opsional)
                </label>
                <textarea
                  id="aspect-description"
                  {...register("description")}
                  disabled={isSubmitting}
                  rows={3}
                  placeholder="Tuliskan panduan atau indikator pencapaian aspek ini..."
                  className="w-full bg-neutral-100 border border-neutral-200 rounded-xl p-3 text-xs text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary focus:bg-surface resize-none transition-colors duration-150 ease-out"
                />
                {(errors.description?.message || fieldErrors.description) && (
                  <p className="text-[11px] text-status-destructive-text font-medium">
                    {errors.description?.message || fieldErrors.description}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="rounded-full border-neutral-300 text-neutral-700"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={isSubmitting}
                  className="rounded-full"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Menyimpan...
                    </span>
                  ) : editingAspect ? (
                    "Simpan Perubahan"
                  ) : (
                    "Tambah Aspek"
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
