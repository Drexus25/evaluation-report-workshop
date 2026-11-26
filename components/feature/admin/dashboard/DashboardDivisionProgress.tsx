"use client";

import React from "react";
import { BarChart3 } from "lucide-react";
import { cn } from "@/libs/cn";
import { MinistryProgress } from "./dashboardHelpers";

interface DashboardDivisionProgressProps {
  items: MinistryProgress[];
}

export default function DashboardDivisionProgress({
  items,
}: DashboardDivisionProgressProps) {
  return (
    <div className="bg-surface border border-neutral-200 rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <BarChart3 size={18} aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-headline font-bold text-sm sm:text-base text-neutral-900">
              Progres Evaluasi per Kementerian &amp; Peran
            </h2>
            <p className="text-xs text-neutral-600 mt-0.5">
              Keterisian dan rata-rata nilai raport fungsionaris dari data backend
            </p>
            <div className="mt-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 text-neutral-700 tabular-nums">
                {items.length} Kelompok Aktif
              </span>
            </div>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="py-10 text-center text-xs text-neutral-500 italic border-t border-neutral-200 mt-2">
          Belum ada data fungsionaris untuk dihitung progresnya.
        </div>
      ) : (
        <div className="mt-4 space-y-5">
          {items.map((item) => {
            const badgeColor =
              item.percentage >= 80
                ? "bg-emerald-50 text-emerald-700"
                : item.percentage >= 50
                ? "bg-teal-50 text-teal-700"
                : "bg-amber-50 text-amber-800";

            return (
              <div key={item.name} className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-900">
                      {item.name}
                    </span>
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-[11px] font-bold tabular-nums",
                        badgeColor
                      )}
                    >
                      {item.percentage}%
                    </span>
                  </div>

                  <div className="flex items-center gap-3 tabular-nums">
                    <span className="text-neutral-600">
                      {item.completedCount}/{item.totalCount} Selesai
                    </span>
                    <span className="font-headline font-bold text-primary-900 text-sm">
                      {item.average ?? "-"}
                    </span>
                  </div>
                </div>

                <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-200 ease-out"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
