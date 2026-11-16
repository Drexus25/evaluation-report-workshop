"use client";

import React from "react";
import { Plus, SlidersHorizontal, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const DashboardHeaderSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Row: Greeting & Semester Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left: Greeting */}
        <div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight">
            Halo, Sarah Adinda 👋
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Rekapitulasi berkala evaluasi kerja fungsionaris BPH &amp; Staff periode berjalan.
          </p>
        </div>

        {/* Right: Semester & Status Badge */}
        <div className="flex items-center gap-3 self-start sm:self-center">
          {/* Active Period Indicator */}
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-status-success shrink-0"
              aria-hidden="true"
            />
            <div className="text-xs font-semibold text-neutral-700 leading-tight">
              <div>Semester Genap</div>
              <div className="text-neutral-500 font-normal">2024/2025</div>
            </div>
          </div>

          {/* Status Badge */}
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary border border-primary-200/60 text-xs font-semibold shadow-xs select-none">
            Tahap Penilaian Aktif
          </span>
        </div>
      </div>

      {/* Bottom Row: Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        {/* + Input Raport */}
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          className="rounded-xl! shadow-xs"
        >
          Input Raport
        </Button>

        {/* Kelola Aspek */}
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<SlidersHorizontal className="w-4 h-4 text-neutral-600" />}
          className="rounded-xl! text-neutral-700 hover:text-neutral-900"
        >
          Kelola Aspek
        </Button>

        {/* Ekspor (.PDF) */}
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<FileText className="w-4 h-4 text-neutral-600" />}
          className="rounded-xl! text-neutral-700 hover:text-neutral-900"
        >
          Ekspor (.PDF)
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeaderSection;

