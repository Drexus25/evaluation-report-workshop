"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Plus } from "lucide-react";
import { ReportListItem } from "@/types";
import { buttonVariants } from "@/components/ui/Button";
import RoleBadge from "@/components/ui/RoleBadge";

interface DashboardRecentReportsTableProps {
  reports: ReportListItem[];
  onOpenDetail: (report: ReportListItem) => void;
}

export default function DashboardRecentReportsTable({
  reports,
  onOpenDetail,
}: DashboardRecentReportsTableProps) {
  return (
    <div className="bg-surface border border-neutral-200 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <ShieldCheck size={18} aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-headline font-bold text-sm sm:text-base text-neutral-900">
              Entri Raport Terbaru
            </h2>
            <p className="text-xs text-neutral-600 mt-0.5">
              Raport fungsionaris yang telah diterbitkan pada sistem
            </p>
          </div>
        </div>

        <Link
          href="/admin/raport"
          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-700 transition-colors duration-150 ease-out self-start sm:self-auto rounded-md px-1 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span>Lihat Semua Raport</span>
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-neutral-50/70 text-neutral-600 uppercase font-bold text-[11px] tracking-wider border-b border-neutral-200 font-mono">
            <tr>
              <th className="px-6 py-3.5">FUNGSIONARIS</th>
              <th className="px-6 py-3.5">DIVISI &amp; PERAN</th>
              <th className="px-6 py-3.5">SKOR AKHIR</th>
              <th className="px-6 py-3.5">TANGGAL TERBIT</th>
              <th className="px-6 py-3.5 text-right">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {reports.map((item) => {
              const name = item.name || item.user?.name || "Fungsionaris";
              const role = item.role || item.user?.role || "staff";
              const ministry =
                item.ministry ||
                item.user?.ministry ||
                item.position ||
                item.user?.position ||
                "-";
              const position = item.position || item.user?.position || "";
              const avgScore =
                typeof item.average_score === "number"
                  ? item.average_score
                  : Number(item.average_score) || 0;
              const dateStr = item.created_at
                ? new Intl.DateTimeFormat("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(item.created_at))
                : "-";
              const initials = name
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((n) => n[0])
                .join("")
                .toUpperCase();

              return (
                <tr
                  key={item.id}
                  className="hover:bg-neutral-50/60 transition-colors duration-150 ease-out"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 border border-teal-200/50 flex items-center justify-center font-bold font-headline text-[11px] shrink-0">
                        {initials || "FG"}
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900 text-xs">
                          {name}
                        </p>
                        <p className="text-[11px] text-neutral-500">
                          {position || "Fungsionaris"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-neutral-700 text-xs">
                        {ministry}
                      </span>
                      <RoleBadge
                        variant={role === "bph" ? "bph" : "staff"}
                        size="sm"
                      >
                        {role === "bph" ? "BPH" : "Staff"}
                      </RoleBadge>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-headline font-bold text-neutral-900 text-xs tabular-nums">
                      {avgScore.toFixed(2)}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-neutral-600 tabular-nums">
                    {dateStr}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onOpenDetail(item)}
                      className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11px] font-semibold transition-colors duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      Lihat Detail Raport
                    </button>
                  </td>
                </tr>
              );
            })}

            {reports.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-neutral-600 text-sm"
                >
                  <p className="italic mb-3">
                    Belum ada raport fungsionaris yang diterbitkan.
                  </p>
                  <Link
                    href="/admin/raport/create"
                    className={buttonVariants({
                      variant: "primary",
                      size: "sm",
                      className: "gap-1.5",
                    })}
                  >
                    <Plus size={14} aria-hidden="true" />
                    <span>Buat Raport Pertama</span>
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
