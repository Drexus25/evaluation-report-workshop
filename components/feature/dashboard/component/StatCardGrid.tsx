"use client";

import React from "react";
import { Users, ClipboardCheck, TrendingUp, SlidersHorizontal, Star } from "lucide-react";
import Card from "@/components/ui/Card";

export const StatCardGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {/* 1. TOTAL FUNGSIOMARIS */}
      <Card
        variant="default"
        padding="none"
        className="p-5 bg-surface rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            Total Fungsionaris
          </span>
          <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="pt-3 pb-2 flex items-baseline">
          <span className="text-3xl font-extrabold font-headline text-neutral-900 tracking-tight">
            48
          </span>
          <span className="text-xs text-neutral-500 font-normal ml-1.5">
            Orang
          </span>
        </div>

        <div className="text-xs text-neutral-500 font-medium">
          36 Staff <span className="mx-1 text-neutral-300">•</span> 12 BPH
        </div>
      </Card>

      {/* 2. RAPORT TERISI */}
      <Card
        variant="default"
        padding="none"
        className="p-5 bg-surface rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            Raport Terisi
          </span>
          <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="pt-3 pb-2 flex items-baseline">
          <span className="text-3xl font-extrabold font-headline text-neutral-900 tracking-tight">
            38
          </span>
          <span className="text-xs text-neutral-400 font-medium ml-1">
            / 48
          </span>
        </div>

        <div className="text-xs text-neutral-500 font-medium flex items-center">
          <span>79.2% Selesai</span>
          <span className="mx-1 text-neutral-300">•</span>
          <span className="text-status-warning font-semibold">10 Draft</span>
        </div>
      </Card>

      {/* 3. INDEKS KINERJA */}
      <Card
        variant="default"
        padding="none"
        className="p-5 bg-surface rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            Indeks Kinerja
          </span>
          <div className="w-8 h-8 rounded-lg bg-primary-50 text-status-success flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        <div className="pt-3 pb-2 flex items-baseline">
          <span className="text-3xl font-extrabold font-headline text-neutral-900 tracking-tight">
            84.75
          </span>
          <span className="text-xs text-neutral-400 font-medium ml-1">
            / 100
          </span>
        </div>

        <div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-primary-50 px-2.5 py-0.5 rounded-full border border-primary-100">
            <Star className="w-3 h-3 fill-current" />
            <span>Sangat Baik</span>
          </span>
        </div>
      </Card>

      {/* 4. RUBRIK PENILAIAN */}
      <Card
        variant="default"
        padding="none"
        className="p-5 bg-surface rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            Rubrik Penilaian
          </span>
          <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center shrink-0">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
        </div>

        <div className="pt-3 pb-2 flex items-baseline">
          <span className="text-3xl font-extrabold font-headline text-neutral-900 tracking-tight">
            10
          </span>
          <span className="text-xs text-neutral-500 font-normal ml-1.5">
            Aspek
          </span>
        </div>

        <div className="text-xs text-neutral-500 font-medium">
          5 BPH <span className="mx-1 text-neutral-300">•</span> 5 Staff{" "}
          <span className="mx-1 text-neutral-300">•</span> 0 - 100
        </div>
      </Card>
    </div>
  );
};

export default StatCardGrid;

