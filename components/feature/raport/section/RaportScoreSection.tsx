import React from "react";
import { AspectScore } from "@/types";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface RaportScoreSectionProps {
  scores: AspectScore[];
  averageScore: number;
}

export default function RaportScoreSection({
  scores,
  averageScore,
}: RaportScoreSectionProps) {
  const getGradePredicate = (avg: number) => {
    if (avg >= 90) return { label: "Sangat Baik (A)", tone: "text-status-success", bg: "bg-status-success-bg" };
    if (avg >= 80) return { label: "Baik (B)", tone: "text-primary", bg: "bg-primary-50" };
    if (avg >= 70) return { label: "Cukup (C)", tone: "text-status-warning-text", bg: "bg-status-warning-bg" };
    return { label: "Perlu Evaluasi (D)", tone: "text-status-destructive", bg: "bg-status-destructive-bg" };
  };

  const predicate = getGradePredicate(averageScore);

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="default" padding="md" className="border-neutral-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
            Nilai Rata-Rata Akhir
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-3xl sm:text-4xl font-bold text-neutral-900">
              {averageScore.toFixed(2)}
            </span>
            <span className="text-sm text-neutral-400 font-medium">/ 100</span>
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            Formula rata-rata tanpa bobot dari backend
          </p>
        </Card>

        <Card variant="default" padding="md" className="border-neutral-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
            Predikat Kinerja
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${predicate.bg} ${predicate.tone}`}
            >
              {predicate.label}
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-3">
            Berdasarkan ambang batas standar organisasi
          </p>
        </Card>

        <Card variant="default" padding="md" className="border-neutral-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
            Cakupan Penilaian
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-3xl sm:text-4xl font-bold text-neutral-900">
              {scores.length}
            </span>
            <span className="text-sm text-neutral-600 font-medium">
              Aspek Lengkap
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            Seluruh aspek wajib terpenuhi 100%
          </p>
        </Card>
      </div>

      <Card variant="default" padding="none" className="border-neutral-200 overflow-hidden">
        <CardHeader bordered className="px-6 py-4 bg-surface">
          <div>
            <CardTitle className="text-base sm:text-lg">
              Rincian Nilai per Aspek Penilaian
            </CardTitle>
            <p className="text-xs text-neutral-500 mt-0.5">
              Skala penilaian standar 0 sampai 100 sesuai peran fungsionaris
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-0 space-y-0 divide-y divide-neutral-200">
          {scores.map((item, index) => {
            return (
              <div
                key={item.aspect_id}
                className="p-5 sm:p-6 hover:bg-neutral-50/70 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-neutral-100 text-neutral-600 text-xs font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <h3 className="font-headline text-sm sm:text-base font-semibold text-neutral-900">
                      {item.aspect_name}
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-1 shrink-0 self-end sm:self-auto">
                    <span className="text-xl sm:text-2xl font-bold font-headline text-primary">
                      {item.score}
                    </span>
                    <span className="text-xs text-neutral-400 font-medium">/ 100</span>
                  </div>
                </div>

                <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden mb-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(Math.max(item.score, 0), 100)}%` }}
                  />
                </div>

                {item.notes && (
                  <p className="text-xs text-neutral-500 leading-relaxed pl-9">
                    <span className="font-medium text-neutral-700">Catatan:</span> {item.notes}
                  </p>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </section>
  );
}
