import React from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface RaportEvaluationSectionProps {
  evaluation: string;
  createdBy?: string;
}

export default function RaportEvaluationSection({
  evaluation,
  createdBy = "Pengurus Inti & Administrator",
}: RaportEvaluationSectionProps) {
  return (
    <section className="mt-6">
      <Card variant="default" padding="lg" className="border-neutral-200">
        <CardHeader bordered className="pb-4">
          <div>
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <svg
                className="w-5 h-5 text-primary shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Evaluasi &amp; Catatan Menyeluruh
            </CardTitle>
            <p className="text-xs text-neutral-500 mt-0.5">
              Ulasan performa kualitatif resmi dari evaluator
            </p>
          </div>
        </CardHeader>

        <CardContent className="pt-4 space-y-4">
          <div className="bg-neutral-50 rounded-xl p-4 sm:p-5 border border-neutral-200/70">
            <p className="text-sm sm:text-base text-neutral-800 leading-relaxed italic">
              &ldquo;{evaluation}&rdquo;
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-500 pt-2 gap-2">
            <span>
              Disahkan oleh: <strong className="font-semibold text-neutral-700">{createdBy}</strong>
            </span>
            <span className="text-[11px] text-neutral-400 font-mono">
              Status: Evaluasi Telah Divalidasi
            </span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
