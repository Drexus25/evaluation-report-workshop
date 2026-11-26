"use client";

import React from "react";
import { Users, FileCheck, TrendingUp, Sliders } from "lucide-react";
import { cn } from "@/libs/cn";
import { getScorePredicate } from "./dashboardHelpers";

interface DashboardKpiGridProps {
  totalFunctionaries: number;
  staffUserCount: number;
  bphUserCount: number;
  totalReports: number;
  completionPercentage: number;
  pendingReportCount: number;
  overallAverageScore: number | null;
  totalAspects: number;
  bphAspectCount: number;
  staffAspectCount: number;
}

export default function DashboardKpiGrid({
  totalFunctionaries,
  staffUserCount,
  bphUserCount,
  totalReports,
  completionPercentage,
  pendingReportCount,
  overallAverageScore,
  totalAspects,
  bphAspectCount,
  staffAspectCount,
}: DashboardKpiGridProps) {
  const overallPredicate =
    overallAverageScore !== null ? getScorePredicate(overallAverageScore) : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-surface border border-neutral-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
              TOTAL FUNGSIONARIS
            </span>
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <Users size={15} aria-hidden="true" />
            </div>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-headline text-2xl font-bold text-neutral-900 tabular-nums">
              {totalFunctionaries}
            </span>
            <span className="text-xs text-neutral-600 font-medium ml-1">
              Orang
            </span>
          </div>
        </div>
        <p className="text-[11px] text-neutral-600 font-medium mt-3 tabular-nums">
          {staffUserCount} Staff • {bphUserCount} BPH
        </p>
      </div>

      <div className="bg-surface border border-neutral-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
              RAPORT TERBIT
            </span>
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <FileCheck size={15} aria-hidden="true" />
            </div>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-headline text-2xl font-bold text-neutral-900 tabular-nums">
              {totalReports}
            </span>
            <span className="text-xs text-neutral-600 font-medium tabular-nums">
              / {totalFunctionaries}
            </span>
          </div>
        </div>
        <p className="text-[11px] text-neutral-600 font-medium mt-3 tabular-nums">
          <span className="text-teal-700 font-semibold">
            {completionPercentage}% Selesai
          </span>{" "}
          • {pendingReportCount} Belum Dinilai
        </p>
      </div>

      <div className="bg-surface border border-neutral-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
              RATA-RATA SKOR (BE)
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp size={15} aria-hidden="true" />
            </div>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-headline text-2xl font-bold text-neutral-900 tabular-nums">
              {overallAverageScore !== null
                ? overallAverageScore.toFixed(2)
                : "-"}
            </span>
            {overallAverageScore !== null && (
              <span className="text-xs text-neutral-600 font-medium tabular-nums">
                / 100
              </span>
            )}
          </div>
        </div>
        <div className="mt-3">
          {overallPredicate ? (
            <span
              className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border",
                overallPredicate.className
              )}
            >
              {overallPredicate.label}
            </span>
          ) : (
            <span className="text-[11px] text-neutral-500">
              Belum ada raport terbit
            </span>
          )}
        </div>
      </div>

      <div className="bg-surface border border-neutral-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
              RUBRIK PENILAIAN
            </span>
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <Sliders size={15} aria-hidden="true" />
            </div>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-headline text-2xl font-bold text-neutral-900 tabular-nums">
              {totalAspects}
            </span>
            <span className="text-xs text-neutral-600 font-medium ml-1">
              Aspek
            </span>
          </div>
        </div>
        <p className="text-[11px] text-neutral-600 font-medium mt-3 tabular-nums">
          {bphAspectCount} BPH • {staffAspectCount} Staff • 0 - 100
        </p>
      </div>
    </div>
  );
}
