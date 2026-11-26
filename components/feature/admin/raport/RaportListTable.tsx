"use client";

import React, { useState, useMemo } from "react";
import { Loader2, Search } from "lucide-react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import RoleBadge from "@/components/ui/RoleBadge";
import Button from "@/components/ui/Button";
import { cn } from "@/libs/cn";
import { ReportListItem } from "@/types";

interface RaportListTableProps {
  reports: ReportListItem[];
  isLoading: boolean;
  onOpenDetail: (report: ReportListItem) => void;
  onOpenEdit: (report: ReportListItem) => void;
  onOpenDelete: (report: ReportListItem) => void;
}

export default function RaportListTable({
  reports,
  isLoading,
  onOpenDetail,
  onOpenEdit,
  onOpenDelete,
}: RaportListTableProps) {
  const [filterRole, setFilterRole] = useState<"all" | "bph" | "staff">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return reports.filter((item) => {
      const role = item.role || item.user?.role;
      const matchesRole = filterRole === "all" ? true : role === filterRole;
      const name = item.name || item.user?.name || "";
      const ministry = item.ministry || item.user?.ministry || "";
      return (
        matchesRole &&
        (name.toLowerCase().includes(query) || ministry.toLowerCase().includes(query))
      );
    });
  }, [reports, filterRole, searchQuery]);

  const roleTabs: Array<{ key: "all" | "bph" | "staff"; label: string; count: number }> = [
    { key: "all", label: "Semua", count: reports.length },
    {
      key: "bph",
      label: "BPH",
      count: reports.filter((r) => (r.role || r.user?.role) === "bph").length,
    },
    {
      key: "staff",
      label: "Staff",
      count: reports.filter((r) => (r.role || r.user?.role) === "staff").length,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 bg-surface p-1.5 rounded-xl border border-neutral-200 w-fit flex-wrap">
          {roleTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilterRole(tab.key)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-150 ease-out cursor-pointer tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                filterRole === tab.key
                  ? "bg-primary text-surface font-bold shadow-xs"
                  : "text-neutral-600 hover:text-neutral-900"
              )}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <label htmlFor="raport-search" className="sr-only">
            Cari nama atau kementerian fungsionaris
          </label>
          <input
            id="raport-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama fungsionaris..."
            className="w-full bg-surface border border-neutral-200 rounded-xl py-2 px-3 pl-8 text-xs text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary"
          />
          <Search className="w-4 h-4 text-neutral-500 absolute left-2.5 top-2.5 pointer-events-none" />
        </div>
      </div>

      <Card variant="default" padding="none" className="border-neutral-200 overflow-hidden">
        <CardHeader bordered className="px-6 py-4 bg-surface">
          <div>
            <CardTitle className="text-base sm:text-lg">
              Rekap Raport Terbit
            </CardTitle>
            <p className="text-xs text-neutral-500 mt-0.5">
              Nilai rata-rata dari backend (tanpa kalkulasi ulang) diformat hingga 2 angka desimal
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-0 space-y-0 divide-y divide-neutral-200">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
              <p className="text-xs text-neutral-500 font-medium">
                Mengambil data raport dari API...
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 text-neutral-600 uppercase font-semibold border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-3.5">Fungsionaris</th>
                    <th className="px-6 py-3.5">Peran</th>
                    <th className="px-6 py-3.5">Nilai Rata-Rata (BE)</th>
                    <th className="px-6 py-3.5">Cakupan Aspek</th>
                    <th className="px-6 py-3.5">Tanggal Terbit</th>
                    <th className="px-6 py-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredReports.map((report) => {
                    const userName = report.name || report.user?.name || "Fungsionaris";
                    const userRole = report.role || report.user?.role || "staff";
                    const position = report.position || report.user?.position || "";
                    const ministry = report.ministry || report.user?.ministry || "";
                    const dateStr = report.created_at
                      ? new Intl.DateTimeFormat("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }).format(new Date(report.created_at))
                      : "-";

                    const rawAvg =
                      typeof report.average_score === "number"
                        ? report.average_score
                        : Number(report.average_score) || 0;

                    const hasScoresCount =
                      Array.isArray(report.scores) && report.scores.length > 0;

                    return (
                      <tr
                        key={report.id}
                        className="hover:bg-neutral-50/70 transition-colors duration-150 ease-out"
                      >
                        <td className="px-6 py-4">
                          <div className="font-semibold text-neutral-900 text-sm">
                            {userName}
                          </div>
                          <div className="text-neutral-600 text-xs">
                            {position ? `${position} • ` : ""}
                            {ministry || "-"}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <RoleBadge
                            variant={userRole === "bph" ? "bph" : "staff"}
                            size="sm"
                          >
                            {userRole === "bph" ? "BPH" : "Staff"}
                          </RoleBadge>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-baseline gap-1">
                            <span className="font-headline font-bold text-base text-neutral-900 tabular-nums">
                              {rawAvg.toFixed(2)}
                            </span>
                            <span className="text-neutral-500 text-xs tabular-nums">/ 100</span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-neutral-600 font-medium">
                          {hasScoresCount ? (
                            <span className="tabular-nums">
                              {report.scores!.length} Aspek Dinilai
                            </span>
                          ) : (
                            <span className="text-neutral-500">Lihat detail</span>
                          )}
                        </td>

                        <td className="px-6 py-4 text-neutral-600 tabular-nums">{dateStr}</td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => onOpenDetail(report)}
                              className="text-xs"
                            >
                              Lihat Detail
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onOpenEdit(report)}
                              className="text-xs"
                            >
                              Ubah
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onOpenDelete(report)}
                              className="text-xs border border-status-destructive/30 text-status-destructive-text hover:bg-status-destructive-bg/20"
                            >
                              Hapus
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredReports.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-12 text-center text-neutral-500 text-sm italic"
                      >
                        Tidak ada data raport yang sesuai filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
