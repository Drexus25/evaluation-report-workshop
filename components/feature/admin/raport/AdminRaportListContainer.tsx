"use client";

import React, { useState } from "react";
import Link from "next/link";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import RoleBadge from "@/components/ui/RoleBadge";
import Button from "@/components/ui/Button";
import { RaportData } from "@/types";
import { dummyInitialReports } from "@/data/dummyRaport";

export default function AdminRaportListContainer() {
  const [reports, setReports] = useState<RaportData[]>(dummyInitialReports);
  const [selectedReport, setSelectedReport] = useState<RaportData | null>(null);
  const [filterRole, setFilterRole] = useState<"all" | "bph" | "staff">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const filteredReports = reports.filter((item) => {
    const matchesRole =
      filterRole === "all" ? true : item.role === filterRole;
    const matchesSearch =
      (item.name || item.user?.name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (item.ministry || item.user?.ministry || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleDeleteReport = (id: string) => {
    const target = reports.find((r) => r.id === id);
    setReports((prev) => prev.filter((r) => r.id !== id));
    setConfirmDeleteId(null);
    if (selectedReport?.id === id) {
      setSelectedReport(null);
    }
    setSuccessToast(
      `Raport untuk "${target?.name || target?.user?.name || id}" berhasil dihapus.`
    );
    setTimeout(() => setSuccessToast(null), 3000);
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

        <Link href="/admin/raport/create">
          <Button variant="primary" size="sm" className="rounded-full">
            Input Raport Baru
          </Button>
        </Link>
      </div>

      {successToast && (
        <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-status-success-bg/40 border border-status-success/30 text-status-success-text text-sm">
          <span>{successToast}</span>
          <button
            onClick={() => setSuccessToast(null)}
            className="text-neutral-400 hover:text-neutral-700 cursor-pointer font-bold text-xs"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 bg-surface p-1.5 rounded-xl border border-neutral-200 w-fit">
          <button
            type="button"
            onClick={() => setFilterRole("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterRole === "all"
                ? "bg-primary text-surface font-bold shadow-xs"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Semua ({reports.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterRole("bph")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterRole === "bph"
                ? "bg-primary text-surface font-bold shadow-xs"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            BPH ({reports.filter((r) => r.role === "bph").length})
          </button>
          <button
            type="button"
            onClick={() => setFilterRole("staff")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterRole === "staff"
                ? "bg-primary text-surface font-bold shadow-xs"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Staff ({reports.filter((r) => r.role === "staff").length})
          </button>
        </div>

        <div className="relative max-w-xs w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama fungsionaris..."
            className="w-full bg-surface border border-neutral-200 rounded-xl py-2 px-3 pl-8 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-primary"
          />
          <svg
            className="w-4 h-4 text-neutral-400 absolute left-2.5 top-2.5 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <Card variant="default" padding="none" className="border-neutral-200 overflow-hidden">
        <CardHeader bordered className="px-6 py-4 bg-surface">
          <div>
            <CardTitle className="text-base sm:text-lg">
              Rekap Raport Terbit
            </CardTitle>
            <p className="text-xs text-neutral-500 mt-0.5">
              Nilai rata-rata tanpa bobot diformat hingga 2 angka desimal
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-0 space-y-0 divide-y divide-neutral-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 text-neutral-500 uppercase font-semibold border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-3.5">Fungsionaris</th>
                  <th className="px-6 py-3.5">Role</th>
                  <th className="px-6 py-3.5">Nilai Rata-Rata</th>
                  <th className="px-6 py-3.5">Jumlah Aspek</th>
                  <th className="px-6 py-3.5">Tanggal Terbit</th>
                  <th className="px-6 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredReports.map((report) => {
                  const role = report.role || report.user?.role || "staff";
                  const name = report.name || report.user?.name || "Fungsionaris";
                  const ministry =
                    report.ministry || report.user?.ministry || "Kementerian";
                  const dateStr = new Intl.DateTimeFormat("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(report.created_at));

                  return (
                    <tr
                      key={report.id}
                      className="hover:bg-neutral-50/70 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-neutral-900 text-sm">
                          {name}
                        </p>
                        <p className="text-neutral-500 text-xs">{ministry}</p>
                      </td>
                      <td className="px-6 py-4">
                        <RoleBadge
                          variant={role === "bph" ? "bph" : "staff"}
                          size="sm"
                        >
                          {role === "bph" ? "BPH" : "Staff"}
                        </RoleBadge>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-headline font-bold text-neutral-900 text-base">
                          {report.average_score.toFixed(2)}
                        </span>
                        <span className="text-neutral-400 text-xs"> / 100</span>
                      </td>
                      <td className="px-6 py-4 text-neutral-600 font-medium">
                        {report.scores.length} Aspek Dinilai
                      </td>
                      <td className="px-6 py-4 text-neutral-500">
                        {dateStr}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setSelectedReport(report)}
                            className="rounded-full text-xs"
                          >
                            Lihat Detail
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setConfirmDeleteId(report.id)}
                            className="rounded-full text-xs border-status-destructive/30 text-status-destructive hover:bg-status-destructive-bg/20"
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
        </CardContent>
      </Card>

      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl border border-neutral-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-4 border-b border-neutral-200">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-headline text-xl font-bold text-neutral-900">
                    Detail Raport: {selectedReport.name || selectedReport.user?.name}
                  </h3>
                  <RoleBadge
                    variant={
                      (selectedReport.role || selectedReport.user?.role) === "bph"
                        ? "bph"
                        : "staff"
                    }
                    size="sm"
                  >
                    {(selectedReport.role || selectedReport.user?.role) === "bph"
                      ? "BPH"
                      : "Staff"}
                  </RoleBadge>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  {selectedReport.position || selectedReport.user?.position} •{" "}
                  {selectedReport.ministry || selectedReport.user?.ministry} • ID:{" "}
                  {selectedReport.id.slice(0, 8)}...
                </p>
              </div>

              <button
                onClick={() => setSelectedReport(null)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
                  Nilai Rata-Rata Akhir
                </span>
                <span className="font-headline text-3xl font-bold text-primary mt-1 block">
                  {selectedReport.average_score.toFixed(2)}
                  <span className="text-xs text-neutral-400 font-normal"> / 100</span>
                </span>
              </div>
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
                  Cakupan Aspek
                </span>
                <span className="font-headline text-3xl font-bold text-neutral-900 mt-1 block">
                  {selectedReport.scores.length}
                  <span className="text-xs text-neutral-400 font-normal"> Aspek Terpenuhi</span>
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-headline text-sm font-bold text-neutral-900">
                Rincian Skor per Aspek Penilaian
              </h4>
              <div className="divide-y divide-neutral-200 border border-neutral-200 rounded-xl overflow-hidden">
                {selectedReport.scores.map((sc, idx) => (
                  <div
                    key={sc.aspect_id}
                    className="p-3.5 flex items-center justify-between bg-surface text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-neutral-100 text-neutral-600 font-bold flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-neutral-800">
                        {sc.aspect_name || `Aspek ID: ${sc.aspect_id.slice(0, 8)}...`}
                      </span>
                    </div>
                    <span className="font-headline font-bold text-neutral-900 text-sm">
                      {sc.score} / 100
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-headline text-sm font-bold text-neutral-900">
                Evaluasi Menyeluruh
              </h4>
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-xs text-neutral-700 leading-relaxed italic">
                &ldquo;{selectedReport.overall_evaluation}&rdquo;
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 text-xs text-neutral-500">
              <span>
                Disahkan oleh: {selectedReport.created_by || "Administrator"}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedReport(null)}
                className="rounded-full border-neutral-300 text-neutral-700!"
              >
                Tutup Panel
              </Button>
            </div>
          </div>
        </div>
      )}

      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl border border-neutral-200 max-w-sm w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="font-headline text-lg font-bold text-neutral-900">
              Hapus Raport Fungsionaris
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Apakah Anda yakin ingin menghapus transkrip raport ini? Fungsionaris bersangkutan akan kembali ke status &ldquo;Menunggu Penilaian&rdquo; (Empty State 404).
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setConfirmDeleteId(null)}
                className="rounded-full border-neutral-300 text-neutral-700!"
              >
                Batal
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleDeleteReport(confirmDeleteId)}
                className="rounded-full bg-status-destructive hover:bg-status-destructive-text"
              >
                Hapus Raport
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
