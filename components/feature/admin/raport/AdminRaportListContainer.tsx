"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { Plus, AlertCircle, RefreshCw } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { ReportListItem, RaportData, UpdateReportPayload } from "@/types";
import { useAdminReports } from "@/hooks/useAdminReports";
import { useAspects } from "@/hooks/useAspects";
import RaportListTable from "./RaportListTable";
import RaportDetailModal from "./RaportDetailModal";
import RaportEditModal from "./RaportEditModal";
import RaportDeleteModal from "./RaportDeleteModal";

export default function AdminRaportListContainer() {
  const {
    reports, selectedReport, setSelectedReport, isLoading, isDetailLoading,
    isSubmitting, isDeleting, error, fetchReports, fetchReportDetail, updateReport, deleteReport,
  } = useAdminReports();
  const { aspects } = useAspects();

  const [detailTarget, setDetailTarget] = useState<ReportListItem | null>(null);
  const [editingTarget, setEditingTarget] = useState<ReportListItem | null>(null);
  const [editingDetail, setEditingDetail] = useState<RaportData | null>(null);
  const [deleteTargetReport, setDeleteTargetReport] = useState<ReportListItem | null>(null);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  useEffect(() => {
    if (!detailTarget && !editingTarget && !deleteTargetReport) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (deleteTargetReport && !isDeleting) {
        setDeleteTargetReport(null);
      } else if (editingTarget && !isSubmitting) {
        setEditingTarget(null);
        setEditingDetail(null);
      } else if (detailTarget) {
        setDetailTarget(null);
        setSelectedReport(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [detailTarget, editingTarget, deleteTargetReport, isDeleting, isSubmitting, setSelectedReport]);

  const aspectNameMap = useMemo(() => {
    const map = new Map<string, string>();
    aspects.forEach((aspect) => map.set(aspect.id, aspect.name));
    return map;
  }, [aspects]);

  const resolveAspectName = useCallback(
    (aspectId: string, aspectName?: string, index?: number) => {
      if (aspectName && aspectName.trim()) return aspectName;
      const mapped = aspectNameMap.get(aspectId);
      if (mapped) return mapped;
      return typeof index === "number" ? `Aspek ${index + 1}` : `Aspek ID: ${aspectId.slice(0, 8)}...`;
    },
    [aspectNameMap]
  );

  const handleOpenDetail = async (report: ReportListItem) => {
    setDetailTarget(report);
    setSelectedReport(null);
    const detail = await fetchReportDetail(report.id);
    if (!detail) setDetailTarget(null);
  };

  const handleOpenEdit = async (report: ReportListItem) => {
    setEditingTarget(report);
    setEditingDetail(null);
    const detail = await fetchReportDetail(report.id);
    if (!detail) {
      setEditingTarget(null);
      return;
    }
    setEditingDetail(detail);
  };

  const handleEditSave = async (reportId: string, payload: UpdateReportPayload) => {
    try {
      await updateReport(reportId, payload);
      setEditingTarget(null);
      setEditingDetail(null);
    } catch {
      // Error ditangani di dalam hook useAdminReports
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetReport) return;
    try {
      await deleteReport(deleteTargetReport.id);
      setDeleteTargetReport(null);
    } catch {
      // Error ditangani di dalam hook useAdminReports
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200">
        <div>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Daftar Raport Fungsionaris
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            Data raport evaluasi fungsionaris yang telah diterbitkan administrator.
          </p>
        </div>

        <Link
          href="/admin/raport/create"
          className={buttonVariants({ variant: "primary", size: "sm", className: "self-start sm:self-auto" })}
        >
          <Plus size={16} />
          <span>Input Raport Baru</span>
        </Link>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start justify-between gap-3 p-4 rounded-xl bg-status-destructive-bg/30 border border-status-destructive/30 text-status-destructive text-sm"
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-status-destructive" />
            <div>
              <p className="font-semibold text-status-destructive-text">Gagal Memuat Daftar Raport</p>
              <p className="text-xs text-status-destructive-text mt-0.5 leading-relaxed">{error}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => fetchReports()}
            className="text-neutral-700 hover:text-neutral-900 cursor-pointer text-xs font-semibold flex items-center gap-1 shrink-0 rounded-lg px-2 py-1 transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <RefreshCw size={13} />
            <span>Muat Ulang</span>
          </button>
        </div>
      )}

      <RaportListTable
        reports={reports}
        isLoading={isLoading}
        onOpenDetail={handleOpenDetail}
        onOpenEdit={handleOpenEdit}
        onOpenDelete={setDeleteTargetReport}
      />

      <RaportDetailModal
        detailTarget={detailTarget}
        selectedReport={selectedReport}
        isDetailLoading={isDetailLoading}
        resolveAspectName={resolveAspectName}
        onClose={() => { setDetailTarget(null); setSelectedReport(null); }}
      />

      <RaportEditModal
        editingTarget={editingTarget}
        editingDetail={editingDetail}
        isDetailLoading={isDetailLoading}
        isSubmitting={isSubmitting}
        resolveAspectName={resolveAspectName}
        onClose={() => { if (!isSubmitting) { setEditingTarget(null); setEditingDetail(null); } }}
        onSave={handleEditSave}
      />

      <RaportDeleteModal
        deleteTarget={deleteTargetReport}
        isDeleting={isDeleting}
        onClose={() => { if (!isDeleting) setDeleteTargetReport(null); }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
