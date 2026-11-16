"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import RoleBadge from "@/components/ui/RoleBadge";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import { Aspect } from "@/types";
import { raportSchema, RaportFormValues } from "@/schemas/raportSchema";
import {
  dummyAdminUsersList,
  dummyAllAspects,
  dummyInitialReports,
} from "@/data/dummyRaport";

export default function AdminRaportCreateContainer() {
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "duplicate"
  >("idle");
  const [submittedUserName, setSubmittedUserName] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RaportFormValues>({
    resolver: zodResolver(raportSchema),
    defaultValues: {
      user_id: "",
      overall_evaluation: "",
      scores: [],
    },
  });

  const selectedUser = useMemo(
    () => dummyAdminUsersList.find((u) => u.id === selectedUserId) || null,
    [selectedUserId]
  );

  const activeAspects: Aspect[] = useMemo(() => {
    if (!selectedUser) return [];
    return dummyAllAspects.filter(
      (a) => a.role_type === selectedUser.role || a.role_type === "both"
    );
  }, [selectedUser]);

  useEffect(() => {
    setSubmitStatus("idle");

    if (selectedUser && activeAspects.length > 0) {
      reset({
        user_id: selectedUser.id,
        overall_evaluation: "",
        scores: activeAspects.map((aspect) => ({
          aspect_id: aspect.id,
          score: undefined as unknown as number,
        })),
      });
    } else {
      reset({
        user_id: "",
        overall_evaluation: "",
        scores: [],
      });
    }
  }, [selectedUserId, selectedUser, activeAspects, reset]);

  const watchedScores = watch("scores");
  const validScores = watchedScores
    ? watchedScores
    .map((s) => s?.score)
    .filter(
      (val) => typeof val === "number" && !isNaN(val) && val >= 0 && val <= 100
    )
    : [];

  const averagePreview =
    validScores.length > 0
      ? (
          validScores.reduce((acc, curr) => acc + curr, 0) / validScores.length
        ).toFixed(2)
      : null;

  const onSubmit = (data: RaportFormValues) => {
    setSubmitStatus("idle");

    const alreadyHasReport = dummyInitialReports.some(
      (r) => r.user_id === data.user_id
    );

    if (alreadyHasReport) {
      setSubmitStatus("duplicate");
      return;
    }

    setSubmittedUserName(selectedUser?.name || "Fungsionaris");
    setSubmitStatus("success");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-2 border-b border-neutral-200">
        <div className="flex items-center gap-2 mb-1">
          <Link
            href="/admin/raport"
            className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            ← Kembali ke Daftar Raport
          </Link>
        </div>
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
          Form Input Raport Fungsionaris
        </h1>
        <p className="text-sm text-neutral-600 mt-1">
          Pilih fungsionaris, masukkan nilai seluruh aspek penilaian, dan tuliskan evaluasi menyeluruh.
        </p>
      </div>

      {submitStatus === "duplicate" && (
        <div className="p-4 rounded-xl bg-status-destructive-bg/30 border border-status-destructive/30 text-status-destructive-text text-sm flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              Fungsionaris <strong>{selectedUser?.name}</strong> sudah memiliki raport aktif. Silakan lakukan pembaruan data pada daftar raport.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSubmitStatus("idle")}
            className="text-neutral-400 hover:text-neutral-700 cursor-pointer font-bold text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {submitStatus === "success" && (
        <div className="p-4 rounded-xl bg-status-success-bg/50 border border-status-success/30 text-status-success-text text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>
              Raport untuk <strong>{submittedUserName}</strong> berhasil disimpan.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/raport"
              className="text-xs font-bold underline hover:opacity-80"
            >
              Lihat Daftar Raport →
            </Link>
            <button
              type="button"
              onClick={() => {
                setSubmitStatus("idle");
                setSelectedUserId("");
              }}
              className="text-xs text-neutral-600 hover:text-neutral-900 cursor-pointer font-medium"
            >
              Input Lain
            </button>
          </div>
        </div>
      )}

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <Card variant="default" padding="lg" className="border-neutral-200">
          <CardHeader bordered className="pb-3">
            <div>
              <CardTitle className="text-base sm:text-lg">
                1. Pilih Fungsionaris
              </CardTitle>
              <p className="text-xs text-neutral-500 mt-0.5">
                Pilih anggota fungsionaris yang akan diberikan evaluasi
              </p>
            </div>
          </CardHeader>

          <CardContent className="pt-4 space-y-4">
            <div className="w-full flex flex-col font-sans">
              <label
                htmlFor="user-select"
                className="text-sm font-bold text-neutral-900 mb-2 select-none"
              >
                Nama Fungsionaris <span className="text-status-destructive">*</span>
              </label>

              <select
                id="user-select"
                value={selectedUserId}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedUserId(val);
                  setValue("user_id", val, { shouldValidate: true });
                }}
                className={`w-full rounded-xl bg-neutral-100 border py-3 px-4 text-sm text-neutral-900 focus:outline-none ${
                  errors.user_id
                    ? "border-status-destructive ring-1 ring-status-destructive/20"
                    : "border-transparent focus:border-primary focus:bg-surface"
                }`}
              >
                <option value="">-- Pilih Akun Fungsionaris (BPH / Staff) --</option>
                {dummyAdminUsersList.map((user) => {
                  const hasRpt = dummyInitialReports.some(
                    (r) => r.user_id === user.id
                  );
                  return (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.role.toUpperCase()}) - {user.position} [
                      {hasRpt ? "Raport Sudah Ada" : "Belum Dinilai"}]
                    </option>
                  );
                })}
              </select>

              {errors.user_id && (
                <p className="text-xs text-status-destructive mt-1.5 font-medium">
                  {errors.user_id.message}
                </p>
              )}
            </div>

            {selectedUser && (
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 border border-primary-200/60 text-primary flex items-center justify-center font-bold font-headline text-sm">
                    {selectedUser.name
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-neutral-900 text-sm">
                        {selectedUser.name}
                      </span>
                      <RoleBadge
                        variant={selectedUser.role === "bph" ? "bph" : "staff"}
                        size="sm"
                      >
                        {selectedUser.role === "bph" ? "BPH" : "Staff"}
                      </RoleBadge>
                    </div>
                    <p className="text-xs text-neutral-500">
                      {selectedUser.position} • {selectedUser.ministry} • {selectedUser.email}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-semibold text-neutral-400 block uppercase">
                    Aspek Berlaku
                  </span>
                  <span className="text-xs font-semibold text-neutral-700">
                    {activeAspects.length} Aspek Penilaian
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {selectedUser && activeAspects.length > 0 && (
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
                  Rata-Rata:{" "}
                  <strong className="text-neutral-900 font-headline font-bold text-sm">
                    {averagePreview !== null ? `${averagePreview} / 100` : "-"}
                  </strong>
                </span>
              </div>
            </CardHeader>

            <CardContent className="pt-4 space-y-4">
              <div className="divide-y divide-neutral-200 border border-neutral-200 rounded-xl overflow-hidden">
                {activeAspects.map((aspect, index) => {
                  return (
                    <div
                      key={aspect.id}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface hover:bg-neutral-50/50 transition-colors"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-neutral-100 text-neutral-600 font-bold flex items-center justify-center text-xs">
                            {index + 1}
                          </span>
                          <h4 className="font-headline font-semibold text-neutral-900 text-sm">
                            {aspect.name}
                          </h4>
                          {aspect.role_type === "both" && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 font-medium">
                              Umum
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500 pl-7 leading-relaxed">
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
                                    type="number"
                                    placeholder="0 - 100"
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
                                    className={`w-28 text-right bg-neutral-100 border rounded-xl py-2 px-3 text-sm font-semibold text-neutral-900 focus:outline-none ${
                                      fieldState.error
                                        ? "border-status-destructive ring-1 ring-status-destructive/20 bg-status-destructive-bg/10"
                                        : "border-transparent focus:border-primary focus:bg-surface"
                                    }`}
                                  />
                                  <span className="text-xs text-neutral-400 font-medium">
                                    / 100
                                  </span>
                                </div>
                                {fieldState.error && (
                                  <p className="text-[11px] text-status-destructive mt-1 text-right font-medium">
                                    {fieldState.error.message}
                                  </p>
                                )}
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {errors.scores && !Array.isArray(errors.scores) && (
                <p className="text-xs text-status-destructive mt-1.5 font-medium">
                  {(errors.scores as { message?: string })?.message}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {selectedUser && (
          <Card variant="default" padding="lg" className="border-neutral-200">
            <CardHeader bordered className="pb-3">
              <div>
                <CardTitle className="text-base sm:text-lg">
                  3. Evaluasi Menyeluruh
                </CardTitle>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Ulasan naratif resmi mengenai performa kinerja fungsionaris
                </p>
              </div>
            </CardHeader>

            <CardContent className="pt-4 space-y-4">
              <Textarea
                {...register("overall_evaluation")}
                label="Catatan & Masukan Evaluator"
                placeholder="Tuliskan evaluasi komprehensif terkait kinerja fungsionaris, kedisiplinan kerja, pencapaian program, serta saran perbaikan untuk periode mendatang..."
                rows={4}
                error={errors.overall_evaluation?.message}
              />
            </CardContent>
          </Card>
        )}

        <div className="flex items-center justify-between p-4 rounded-2xl bg-surface border border-neutral-200">
          <div className="text-xs text-neutral-500">
            {selectedUser
              ? "Pastikan seluruh nilai dan evaluasi telah terverifikasi dengan benar."
              : "Pilih fungsionaris terlebih dahulu untuk mulai mengisi form."}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/raport">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-neutral-300 text-neutral-700!"
              >
                Batal
              </Button>
            </Link>
            <Button
              variant="primary"
              size="md"
              type="submit"
              disabled={isSubmitting}
              className="rounded-full px-6"
            >
              Simpan Raport
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
