"use client";

import React from "react";
import { Loader2, X } from "lucide-react";
import { RaportData, ReportListItem } from "@/types";
import { cn } from "@/libs/cn";
import Button from "@/components/ui/Button";
import RoleBadge from "@/components/ui/RoleBadge";
import { getScorePredicate } from "./dashboardHelpers";

interface DashboardReportDetailModalProps {
  detailTarget: ReportListItem | null;
  selectedReport: RaportData | null;
  isDetailLoading: boolean;
  aspectNameMap: Map<string, string>;
  onClose: () => void;
}

export default function DashboardReportDetailModal({
  detailTarget,
  selectedReport,
  isDetailLoading,
  aspectNameMap,
  onClose,
}: DashboardReportDetailModalProps) {
  if (!detailTarget) return null;

  const displayRole =
    selectedReport?.role ||
    selectedReport?.user?.role ||
    detailTarget.role ||
    detailTarget.user?.role;

  const displayName =
    selectedReport?.name ||
    selectedReport?.user?.name ||
    detailTarget.name ||
    detailTarget.user?.name ||
    "Fungsionaris";

  const displaySubtitle =
    [
      selectedReport?.position ||
        selectedReport?.user?.position ||
        detailTarget.position ||
        detailTarget.user?.position,
      selectedReport?.ministry ||
        selectedReport?.user?.ministry ||
        detailTarget.ministry ||
        detailTarget.user?.ministry,
    ]
      .filter(Boolean)
      .join(" • ") || "Fungsionaris Organisasi";

  const avgScore = Number(selectedReport?.average_score) || 0;
  const predicate = getScorePredicate(avgScore);

  return (
    <div
      className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dashboard-report-detail-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-surface rounded-2xl border border-neutral-200 max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-xl"
      >
        <div className="flex items-start justify-between pb-3 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                id="dashboard-report-detail-title"
                className="font-headline text-lg font-bold text-neutral-900"
              >
                {displayName}
              </h3>
              <RoleBadge
                variant={displayRole === "bph" ? "bph" : "staff"}
                size="sm"
              >
                {displayRole === "bph" ? "BPH" : "Staff"}
              </RoleBadge>
            </div>
            <p className="text-xs text-neutral-600 mt-0.5">{displaySubtitle}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail raport"
            className="text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 p-1.5 rounded-lg cursor-pointer transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {isDetailLoading || !selectedReport ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
            <p className="text-xs text-neutral-600 font-medium">
              Memuat rincian raport dari server...
            </p>
          </div>
        ) : (
          <>
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block">
                  NILAI AKHIR (BE)
                </span>
                <span className="font-headline text-2xl font-bold text-primary tabular-nums">
                  {avgScore.toFixed(2)}
                  <span className="text-xs font-normal text-neutral-500 tabular-nums">
                    {" "}
                    / 100
                  </span>
                </span>
              </div>
              <span
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-bold border",
                  predicate.className
                )}
              >
                {predicate.label}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-neutral-800 block">
                Rincian Aspek
              </span>
              <div className="divide-y divide-neutral-200 border border-neutral-200 rounded-xl overflow-hidden">
                {selectedReport.scores?.map((sc, index) => {
                  const aspectTitle =
                    sc.aspect_name ||
                    aspectNameMap.get(sc.aspect_id) ||
                    `Aspek ${index + 1}`;
                  const feedbackText = sc.feedback || sc.notes;

                  return (
                    <div
                      key={sc.aspect_id}
                      className="p-2.5 px-3 bg-surface text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-neutral-800 font-medium">
                          {aspectTitle}
                        </span>
                        <span className="font-bold font-headline text-neutral-900 tabular-nums shrink-0">
                          {sc.score} / 100
                        </span>
                      </div>
                      {feedbackText && (
                        <p className="text-[11px] text-neutral-600 leading-relaxed">
                          {feedbackText}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-neutral-800 block">
                Evaluasi Menyeluruh
              </span>
              <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-xs text-neutral-700 leading-relaxed italic">
                &ldquo;{selectedReport.overall_evaluation}&rdquo;
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="rounded-full border-neutral-300 text-neutral-700"
              >
                Tutup
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
