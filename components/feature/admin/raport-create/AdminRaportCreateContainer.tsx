"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowLeft } from "lucide-react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button, { buttonVariants } from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import { cn } from "@/libs/cn";
import { Aspect } from "@/types";
import { raportSchema, RaportFormValues } from "@/schemas/raportSchema";
import { useAdminReports } from "@/hooks/useAdminReports";
import RaportCreateBanners from "./RaportCreateBanners";
import FungsionarisSelectorCard from "./FungsionarisSelectorCard";
import AspectScoreInputsCard from "./AspectScoreInputsCard";

export default function AdminRaportCreateContainer() {
  const {
    users, aspects, reports, isLoading, isSubmitting, error,
    duplicateWarning, setDuplicateWarning, fetchFormPrerequisites, createReport,
  } = useAdminReports();

  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [submittedUserName, setSubmittedUserName] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<RaportFormValues>({
    resolver: zodResolver(raportSchema),
    defaultValues: { user_id: "", overall_evaluation: "", scores: [] },
  });

  useEffect(() => {
    fetchFormPrerequisites();
  }, [fetchFormPrerequisites]);

  const selectedUser = useMemo(
    () => users.find((u) => u.id === selectedUserId) || null,
    [users, selectedUserId]
  );

  const activeAspects: Aspect[] = useMemo(() => {
    if (!selectedUser) return [];
    return aspects.filter((a) => a.role_type === selectedUser.role);
  }, [aspects, selectedUser]);

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
    setIsSuccess(false);
    setDuplicateWarning(null);
    const user = users.find((u) => u.id === userId);
    if (!user) {
      reset({ user_id: "", overall_evaluation: "", scores: [] });
      return;
    }
    const userAspects = aspects.filter((a) => a.role_type === user.role);
    reset({
      user_id: user.id,
      overall_evaluation: "",
      scores: userAspects.map((aspect) => ({
        aspect_id: aspect.id,
        score: undefined as unknown as number,
        feedback: "",
      })),
    });
  };

  const onSubmit = async (data: RaportFormValues) => {
    setDuplicateWarning(null);
    setIsSuccess(false);
    try {
      const created = await createReport({
        user_id: data.user_id,
        overall_evaluation: data.overall_evaluation,
        scores: data.scores.map((sc) => {
          const trimmedFeedback = sc.feedback?.trim();
          return trimmedFeedback
            ? { aspect_id: sc.aspect_id, score: sc.score, feedback: trimmedFeedback }
            : { aspect_id: sc.aspect_id, score: sc.score };
        }),
      });
      setSubmittedUserName(created.name || selectedUser?.name || "Fungsionaris");
      setIsSuccess(true);
    } catch {
      // Jika terjadi duplikasi 409 atau error lainnya, input pengguna TIDAK di-reset
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-2 border-b border-neutral-200">
        <div className="flex items-center gap-2 mb-1">
          <Link
            href="/admin/raport"
            className="inline-flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-900 transition-colors duration-150 ease-out rounded-md px-1 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft size={13} />
            <span>Kembali ke Daftar Raport</span>
          </Link>
        </div>
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
          Form Input Raport Fungsionaris
        </h1>
        <p className="text-sm text-neutral-600 mt-1">
          Pilih fungsionaris, masukkan nilai seluruh aspek penilaian, dan tuliskan evaluasi menyeluruh.
        </p>
      </div>

      <RaportCreateBanners
        error={error} duplicateWarning={duplicateWarning} isSuccess={isSuccess} submittedUserName={submittedUserName}
        onRetry={fetchFormPrerequisites} onDismissDuplicate={() => setDuplicateWarning(null)}
        onResetForNext={() => { setIsSuccess(false); handleSelectUser(""); }}
      />

      <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FungsionarisSelectorCard
          users={users} reports={reports} selectedUserId={selectedUserId} selectedUser={selectedUser}
          activeAspectsCount={activeAspects.length} isLoading={isLoading} isSubmitting={isSubmitting}
          errorMessage={errors.user_id?.message} onSelectUser={handleSelectUser}
        />

        {selectedUser && (
          <AspectScoreInputsCard
            selectedUser={selectedUser} activeAspects={activeAspects} control={control}
            register={register} errors={errors} isSubmitting={isSubmitting}
          />
        )}

        {selectedUser && activeAspects.length > 0 && (
          <Card variant="default" padding="lg" className="border-neutral-200">
            <CardHeader bordered className="pb-3">
              <div>
                <CardTitle className="text-base sm:text-lg">3. Evaluasi Menyeluruh</CardTitle>
                <p className="text-xs text-neutral-500 mt-0.5">Ulasan naratif resmi mengenai performa kinerja fungsionaris</p>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <Textarea
                {...register("overall_evaluation")} disabled={isSubmitting} label="Catatan & Masukan Evaluator" rows={4}
                placeholder="Tuliskan evaluasi komprehensif terkait kinerja fungsionaris, kedisiplinan kerja, pencapaian program, serta saran perbaikan untuk periode mendatang..."
                error={errors.overall_evaluation?.message}
              />
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-surface border border-neutral-200">
          <div className="text-xs text-neutral-600">
            {selectedUser ? "Pastikan seluruh nilai dan evaluasi telah terverifikasi dengan benar." : "Pilih fungsionaris terlebih dahulu untuk mulai mengisi form."}
          </div>
          <div className="flex items-center justify-end gap-3">
            <Link
              href="/admin/raport" aria-disabled={isSubmitting}
              className={buttonVariants({ variant: "ghost", size: "sm", className: cn("border border-neutral-300", isSubmitting && "pointer-events-none opacity-50") })}
            >
              Batal
            </Link>
            <Button variant="primary" size="md" type="submit" disabled={isSubmitting || !selectedUser || activeAspects.length === 0} className="px-6">
              {isSubmitting ? <span className="flex items-center gap-1.5"><Loader2 className="w-4 h-4 animate-spin" />Menerbitkan Raport...</span> : "Simpan & Terbitkan Raport"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
