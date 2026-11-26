"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Control, Controller, FieldErrors, UseFormRegister, useWatch } from "react-hook-form";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/libs/cn";
import { Aspect, User } from "@/types";
import { RaportFormValues } from "@/schemas/raportSchema";

interface AspectScoreInputsCardProps {
  selectedUser: User;
  activeAspects: Aspect[];
  control: Control<RaportFormValues>;
  register: UseFormRegister<RaportFormValues>;
  errors: FieldErrors<RaportFormValues>;
  isSubmitting: boolean;
}

export default function AspectScoreInputsCard({
  selectedUser,
  activeAspects,
  control,
  register,
  errors,
  isSubmitting,
}: AspectScoreInputsCardProps) {
  const watchedScores = useWatch({
    control,
    name: "scores",
  });

  const averagePreview = useMemo(() => {
    if (!watchedScores || !Array.isArray(watchedScores)) return null;
    const valid = watchedScores
      .map((s) => s?.score)
      .filter((val) => typeof val === "number" && !isNaN(val) && val >= 0 && val <= 100);
    if (valid.length === 0) return null;
    const sum = valid.reduce((acc, curr) => acc + curr, 0);
    return (sum / valid.length).toFixed(2);
  }, [watchedScores]);

  if (activeAspects.length === 0) {
    return (
      <Card variant="default" padding="lg" className="border-neutral-200">
        <CardContent className="pt-0 text-center py-6 space-y-2">
          <p className="text-sm font-semibold text-neutral-800">
            Belum ada aspek penilaian untuk role{" "}
            {selectedUser.role === "bph" ? "BPH" : "Staff"}.
          </p>
          <p className="text-xs text-neutral-600">
            Tambahkan aspek penilaian terlebih dahulu di halaman Kelola Aspek sebelum menerbitkan raport.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/aspek"
              className={buttonVariants({ variant: "primary", size: "sm" })}
            >
              Kelola Aspek Penilaian
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="default" padding="lg" className="border-neutral-200">
      <CardHeader bordered className="pb-3 flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <CardTitle className="text-base sm:text-lg">
            2. Nilai Aspek Penilaian
          </CardTitle>
          <p className="text-xs text-neutral-500 mt-0.5">
            Setiap aspek diisi nilai bilangan bulat rentang 0 sampai 100
          </p>
        </div>

        <div className="flex items-center gap-2 bg-neutral-50 px-3 py-1.5 rounded-xl border border-neutral-200 shrink-0">
          <span className="text-xs text-neutral-600 font-medium">
            Preview Rata-Rata:{" "}
            <strong className="text-neutral-900 font-headline font-bold text-sm tabular-nums">
              {averagePreview !== null ? `${averagePreview} / 100` : "-"}
            </strong>
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        <div className="divide-y divide-neutral-200 border border-neutral-200 rounded-xl overflow-hidden">
          {activeAspects.map((aspect, index) => {
            const scoreInputId = `aspect-score-${aspect.id}`;
            const feedbackInputId = `aspect-feedback-${aspect.id}`;

            return (
              <div
                key={aspect.id}
                className="p-4 sm:p-5 space-y-3 bg-surface hover:bg-neutral-50/50 transition-colors duration-150 ease-out"
              >
                <input
                  type="hidden"
                  {...register(`scores.${index}.aspect_id`)}
                  value={aspect.id}
                />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-neutral-100 text-neutral-700 font-bold flex items-center justify-center text-xs tabular-nums">
                        {index + 1}
                      </span>
                      <label
                        htmlFor={scoreInputId}
                        className="font-headline font-semibold text-neutral-900 text-sm cursor-pointer"
                      >
                        {aspect.name}
                      </label>
                    </div>
                    <p className="text-xs text-neutral-600 pl-7 leading-relaxed">
                      {aspect.description || "Tidak ada deskripsi"}
                    </p>
                  </div>

                  <div className="w-full sm:w-48 flex flex-col items-start sm:items-end">
                    <div className="flex items-center gap-2 w-full justify-end">
                      <Controller
                        control={control}
                        name={`scores.${index}.score`}
                        render={({ field, fieldState }) => (
                          <div className="flex flex-col items-end w-full">
                            <div className="flex items-center gap-1.5">
                              <input
                                id={scoreInputId}
                                type="number"
                                min={0}
                                max={100}
                                step={1}
                                aria-label={`Nilai untuk aspek ${aspect.name}`}
                                placeholder="0 - 100"
                                disabled={isSubmitting}
                                value={
                                  field.value === undefined || isNaN(field.value)
                                    ? ""
                                    : field.value
                                }
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (val === "") {
                                    field.onChange(undefined);
                                  } else {
                                    field.onChange(Number(val));
                                  }
                                }}
                                className={cn(
                                  "w-28 text-right bg-neutral-100 border rounded-xl py-2 px-3 text-sm font-semibold text-neutral-900 placeholder:text-neutral-500 tabular-nums focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
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
                  </div>
                </div>

                <div className="pl-0 sm:pl-7">
                  <label htmlFor={feedbackInputId} className="sr-only">
                    Catatan atau feedback untuk aspek {aspect.name}
                  </label>
                  <input
                    id={feedbackInputId}
                    type="text"
                    {...register(`scores.${index}.feedback`)}
                    disabled={isSubmitting}
                    aria-label={`Feedback untuk aspek ${aspect.name}`}
                    placeholder="Catatan / feedback aspek (opsional)..."
                    className="w-full bg-neutral-100 border border-transparent rounded-xl py-2 px-3 text-xs text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary focus:bg-surface"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {errors.scores && !Array.isArray(errors.scores) && (
          <p className="text-xs text-status-destructive-text mt-1.5 font-medium">
            {(errors.scores as { message?: string })?.message}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
