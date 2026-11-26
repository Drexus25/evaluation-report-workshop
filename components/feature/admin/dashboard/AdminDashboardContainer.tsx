"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useAdminReports } from "@/hooks/useAdminReports";
import { ReportListItem } from "@/types";
import { Plus, Sliders, FileDown, AlertCircle, RefreshCw, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { computeDashboardMetrics } from "./dashboardHelpers";
import DashboardKpiGrid from "./DashboardKpiGrid";
import DashboardDivisionProgress from "./DashboardDivisionProgress";
import DashboardRecentReportsTable from "./DashboardRecentReportsTable";
import DashboardReportDetailModal from "./DashboardReportDetailModal";

export default function AdminDashboardContainer() {
  const { user } = useAuth();
  const {
    reports,
    users,
    aspects,
    selectedReport,
    setSelectedReport,
    isLoading,
    isDetailLoading,
    error,
    fetchDashboardData,
    fetchReportDetail,
  } = useAdminReports();

  const [detailTarget, setDetailTarget] = useState<ReportListItem | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    if (!detailTarget) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDetailTarget(null);
        setSelectedReport(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [detailTarget, setSelectedReport]);

  const metrics = useMemo(
    () => computeDashboardMetrics(users, reports, aspects),
    [users, reports, aspects]
  );

  const handleOpenDetail = async (report: ReportListItem) => {
    setDetailTarget(report);
    setSelectedReport(null);
    const detail = await fetchReportDetail(report.id);
    if (!detail) setDetailTarget(null);
  };

  const closeDetailModal = () => {
    setDetailTarget(null);
    setSelectedReport(null);
  };

  const handleExportPdf = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div className="space-y-1">
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Halo, {user?.name || "Administrator"}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600">
            Rekapitulasi evaluasi kerja fungsionaris BPH &amp; Staff dari data sistem aktif.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              href="/admin/raport/create"
              className={buttonVariants({ variant: "primary", size: "sm", className: "gap-1.5" })}
            >
              <Plus size={15} aria-hidden="true" />
              <span>Input Raport</span>
            </Link>

            <Link
              href="/admin/aspek"
              className={buttonVariants({
                variant: "secondary",
                size: "sm",
                className: "gap-1.5 border border-neutral-300 text-neutral-700",
              })}
            >
              <Sliders size={14} className="text-neutral-600" aria-hidden="true" />
              <span>Kelola Aspek</span>
            </Link>

            <button
              type="button"
              onClick={handleExportPdf}
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-xs font-semibold bg-surface border border-neutral-300 text-neutral-700 hover:bg-neutral-50 active:scale-[0.98] transition-all duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <FileDown size={14} className="text-neutral-600" aria-hidden="true" />
              <span>Cetak Halaman</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
          {user?.period && (
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>{user.period}</span>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start justify-between gap-3 p-4 rounded-xl bg-status-destructive-bg/30 border border-status-destructive/30 text-status-destructive text-sm"
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-status-destructive" aria-hidden="true" />
            <div>
              <p className="font-semibold text-status-destructive-text">Gagal Memuat Data Dashboard</p>
              <p className="text-xs text-status-destructive-text mt-0.5 leading-relaxed">{error}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => fetchDashboardData()}
            className="text-neutral-700 hover:text-neutral-900 cursor-pointer text-xs font-semibold flex items-center gap-1 shrink-0 rounded-lg px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <RefreshCw size={13} aria-hidden="true" />
            <span>Muat Ulang</span>
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="bg-surface border border-neutral-200 rounded-2xl py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-7 h-7 text-primary animate-spin" />
          <p className="text-xs text-neutral-600 font-medium">Memuat data statistik dashboard dari server...</p>
        </div>
      ) : (
        <>
          <DashboardKpiGrid
            totalFunctionaries={metrics.functionaryUsers.length}
            staffUserCount={metrics.staffUserCount}
            bphUserCount={metrics.bphUserCount}
            totalReports={reports.length}
            completionPercentage={metrics.completionPercentage}
            pendingReportCount={metrics.pendingReportCount}
            overallAverageScore={metrics.overallAverageScore}
            totalAspects={aspects.length}
            bphAspectCount={metrics.bphAspectCount}
            staffAspectCount={metrics.staffAspectCount}
          />
          <DashboardDivisionProgress items={metrics.ministryProgressList} />
          <DashboardRecentReportsTable reports={metrics.recentReports} onOpenDetail={handleOpenDetail} />
        </>
      )}

      <DashboardReportDetailModal
        detailTarget={detailTarget}
        selectedReport={selectedReport}
        isDetailLoading={isDetailLoading}
        aspectNameMap={metrics.aspectNameMap}
        onClose={closeDetailModal}
      />
    </div>
  );
}
