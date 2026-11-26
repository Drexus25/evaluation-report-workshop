"use client";

import React, { useEffect, useMemo } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import RoleBadge from "@/components/ui/RoleBadge";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import { cn } from "@/libs/cn";
import { ReportListItem, RaportData, UpdateReportPayload } from "@/types";
import { updateReportSchema, UpdateReportFormValues } from "@/schemas/raportSchema";

interface RaportEditModalProps {
  editingTarget: ReportListItem | null;
  editingDetail: RaportData | null;
  isDetailLoading: boolean;
  isSubmitting: boolean;
  resolveAspectName: (aspectId: string, aspectName?: string, index?: number) => string;
  onClose: () => void;
  onSave: (reportId: string, payload: UpdateReportPayload) => Promise<void>;
}

export default function RaportEditModal({
  editingTarget,
  editingDetail,
  isDetailLoading,
  isSubmitting,
  resolveAspectName,
  onClose,
  onSave,
}: RaportEditModalProps) {
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdateReportFormValues>({
    resolver: zodResolver(updateReportSchema),
    defaultValues: {
      overall_evaluation: "",
      scores: [],
    },
  });

  useEffect(() => {
    if (!editingTarget || !editingDetail) {
      reset({
        overall_evaluation: "",
        scores: [],
      });
      return;
    }

    reset({
      overall_evaluation: editingDetail.overall_evaluation || "",
      scores: (editingDetail.scores || []).map((sc) => ({
        aspect_id: sc.aspect_id,
        score: sc.score,
        feedback: sc.feedback ?? sc.notes ?? "",
      })),
    });
  }, [editingTarget, editingDetail, reset]);

  const watchedEditScores = useWatch({
    control,
    name: "scores",
  });

  const editAveragePreview = useMemo(() => {
    if (!watchedEditScores || watchedEditScores.length === 0) return null;
    const valid = watchedEditScores
      .map((s) => s?.score)
      .filter((val) => typeof val === "number" && !isNaN(val) && val >= 0 && val <= 100);
    if (valid.length === 0) return null;
    const sum = valid.reduce((acc, val) => acc + val, 0);
    return (sum / valid.length).toFixed(2);
  }, [watchedEditScores]);

  const onEditSubmit = async (data: UpdateReportFormValues) => {
    if (!editingTarget) return;
    await onSave(editingTarget.id, {
      overall_evaluation: data.overall_evaluation,
      scores: data.scores.map((sc) => {
        const trimmedFeedback = sc.feedback?.trim();
        return trimmedFeedback
          ? {
              aspect_id: sc.aspect_id,
              score: sc.score,
              feedback: trimmedFeedback,
            }
          : {
              aspect_id: sc.aspect_id,
              score: sc.score,
            };
      }),
    });
  };

  const resolvedName =
    editingDetail?.name ||
    editingDetail?.user?.name ||
    editingTarget?.name ||
    editingTarget?.user?.name ||
    "Fungsionaris";

  const resolvedRole =
    (editingDetail?.role ||
      editingDetail?.user?.role ||
      editingTarget?.role ||
      editingTarget?.user?.role) === "bph"
      ? "bph"
      : "staff";

  return (
    <AnimatePresence>
      {editingTarget && (
        <div
          className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-edit-modal-title"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface rounded-2xl border border-neutral-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-xl"
          >
            <div className="flex items-start justify-between pb-4 border-b border-neutral-200">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    id="report-edit-modal-title"
                    className="font-headline text-xl font-bold text-neutral-900"
                  >
                    Ubah Raport: {resolvedName}
                  </h3>
                  <RoleBadge variant={resolvedRole} size="sm">
                    {resolvedRole === "bph" ? "BPH" : "Staff"}
                  </RoleBadge>
                </div>
                <p className="text-xs text-neutral-600 mt-1">
                  Perbarui nilai aspek, catatan per aspek, dan evaluasi menyeluruh fungsionaris.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                aria-label="Tutup modal ubah raport"
                className="text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 p-1.5 rounded-lg cursor-pointer transition-colors duration-150 ease-out disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X size={18} />
              </button>
            </div>

            {isDetailLoading || !editingDetail ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
                <p className="text-xs text-neutral-600 font-medium">
                  Mengambil data raport untuk disunting...
                </p>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit(onEditSubmit)}
                className="space-y-5"
              >
                <div className="flex items-center justify-between bg-neutral-50 px-4 py-2.5 rounded-xl border border-neutral-200 text-xs">
                  <span className="text-neutral-600 font-medium">
                    Preview Rata-Rata Baru
                  </span>
                  <span className="font-headline font-bold text-neutral-900 text-sm tabular-nums">
                    {editAveragePreview !== null ? `${editAveragePreview} / 100` : "-"}
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="font-headline text-sm font-bold text-neutral-900">
                    Nilai &amp; Catatan per Aspek
                  </h4>
                  <div className="divide-y divide-neutral-200 border border-neutral-200 rounded-xl overflow-hidden">
                    {(editingDetail.scores || []).map((sc, index) => {
                      const label = resolveAspectName(sc.aspect_id, sc.aspect_name, index);
                      const scoreId = `edit-aspect-score-${sc.aspect_id}`;
                      const feedbackId = `edit-aspect-feedback-${sc.aspect_id}`;

                      return (
                        <div key={sc.aspect_id} className="p-4 space-y-2.5 bg-surface">
                          <input
                            type="hidden"
                            {...register(`scores.${index}.aspect_id`)}
                            value={sc.aspect_id}
                          />
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded bg-neutral-100 text-neutral-700 font-bold flex items-center justify-center text-[10px] tabular-nums shrink-0">
                                {index + 1}
                              </span>
                              <label
                                htmlFor={scoreId}
                                className="text-xs font-semibold text-neutral-900 cursor-pointer"
                              >
                                {label}
                              </label>
                            </div>

                            <Controller
                              control={control}
                              name={`scores.${index}.score`}
                              render={({ field, fieldState }) => (
                                <div className="flex flex-col items-end">
                                  <div className="flex items-center gap-1.5">
                                    <input
                                      id={scoreId}
                                      type="number"
                                      min={0}
                                      max={100}
                                      step={1}
                                      disabled={isSubmitting}
                                      aria-label={`Nilai untuk aspek ${label}`}
                                      value={
                                        field.value === undefined || isNaN(field.value)
                                          ? ""
                                          : field.value
                                      }
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        if (val === "") {
                                          field.onChange(undefined as unknown as number);
                                        } else {
                                          field.onChange(Number(val));
                                        }
                                      }}
                                      className={cn(
                                        "w-24 text-right bg-neutral-100 border rounded-xl py-1.5 px-3 text-xs font-semibold text-neutral-900 tabular-nums focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                        fieldState.error
                                          ? "border-status-destructive ring-1 ring-status-destructive/20 bg-status-destructive-bg/10"
                                          : "border-transparent focus:border-primary focus:bg-surface"
                                      )}
                                    />
                                    <span className="text-xs text-neutral-500 font-medium tabular-nums">
                                      / 100
                                    </span>
                                  </div>
                                  {fieldState.error && (
                                    <p className="text-[11px] text-status-destructive-text mt-1 text-right font-medium">
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </div>

                          <div>
                            <label htmlFor={feedbackId} className="sr-only">
                              Feedback untuk aspek {label}
                            </label>
                            <input
                              id={feedbackId}
                              type="text"
                              {...register(`scores.${index}.feedback`)}
                              disabled={isSubmitting}
                              aria-label={`Feedback untuk aspek ${label}`}
                              placeholder="Catatan / feedback aspek (opsional)..."
                              className="w-full bg-neutral-100 border border-transparent rounded-xl py-2 px-3 text-xs text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary focus:bg-surface"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.scores && !Array.isArray(errors.scores) && (
                    <p className="text-xs text-status-destructive-text font-medium">
                      {(errors.scores as { message?: string })?.message}
                    </p>
                  )}
                </div>

                <Textarea
                  {...register("overall_evaluation")}
                  disabled={isSubmitting}
                  label="Evaluasi Menyeluruh"
                  placeholder="Tuliskan evaluasi menyeluruh fungsionaris..."
                  rows={4}
                  error={errors.overall_evaluation?.message}
                />

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isSubmitting}
                    onClick={onClose}
                    className="border border-neutral-300"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-1.5">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Menyimpan...
                      </span>
                    ) : (
                      "Simpan Perubahan"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
