import React from "react";
import Link from "next/link";
import { FileText, RefreshCw } from "lucide-react";
import Card from "@/components/ui/Card";
import Button, { buttonVariants } from "@/components/ui/Button";

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
          <FileText className="w-8 h-8" strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200">
            Raport Belum Tersedia
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
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Perbarui Status
            </Button>
          )}

          <Link
            href="/"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "border border-neutral-300 text-neutral-700",
            })}
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </Card>
  );
}
