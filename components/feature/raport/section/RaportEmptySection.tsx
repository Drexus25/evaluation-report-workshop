import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

interface RaportEmptySectionProps {
  onRefresh?: () => void;
}

export default function RaportEmptySection({ onRefresh }: RaportEmptySectionProps) {
  return (
    <Card
      variant="default"
      padding="lg"
      className="border-neutral-200 text-center py-12 sm:py-16"
    >
      <div className="max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-neutral-100 border border-neutral-200 text-neutral-400 flex items-center justify-center mx-auto">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200">
            HTTP 404 • Raport Belum Tersedia
          </span>
          <h2 className="font-headline text-xl sm:text-2xl font-bold text-neutral-900">
            Raport Evaluasi Belum Diterbitkan
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Data penilaian fungsionaris untuk periode ini belum diinput atau masih dalam proses rekapitulasi oleh pengurus/admin. Silakan lakukan pengecekan secara berkala.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          {onRefresh && (
            <Button
              variant="primary"
              size="sm"
              onClick={onRefresh}
              className="rounded-full"
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
            >
              Perbarui Status
            </Button>
          )}

          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-neutral-300 text-neutral-700!"
            >
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
