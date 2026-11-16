"use client";

import React from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import RoleBadge from "@/components/ui/RoleBadge";

interface VerifiedReportItem {
  id: string;
  name: string;
  nim: string;
  initials: string;
  division: string;
  role: "bph" | "staff";
  roleLabel: string;
  score: string;
  avatarBg: string;
  avatarColor: string;
}

const reportEntries: VerifiedReportItem[] = [
  {
    id: "1",
    name: "Faris Ardian",
    nim: "NIM: 2205102014",
    initials: "FA",
    division: "PSDM",
    role: "staff",
    roleLabel: "Staff",
    score: "88.50",
    avatarBg: "bg-primary-50",
    avatarColor: "text-primary",
  },
  {
    id: "2",
    name: "Nabila Dwi",
    nim: "NIM: 2205102088",
    initials: "ND",
    division: "BPH",
    role: "bph",
    roleLabel: "BPH",
    score: "91.30",
    avatarBg: "bg-secondary-50",
    avatarColor: "text-secondary",
  },
  {
    id: "3",
    name: "Faris Ardian",
    nim: "NIM: 2205102014",
    initials: "FA",
    division: "PSDM",
    role: "staff",
    roleLabel: "Staff",
    score: "88.50",
    avatarBg: "bg-primary-50",
    avatarColor: "text-primary",
  },
  {
    id: "4",
    name: "Nabila Dwi",
    nim: "NIM: 2205102088",
    initials: "ND",
    division: "BPH",
    role: "bph",
    roleLabel: "BPH",
    score: "91.30",
    avatarBg: "bg-secondary-50",
    avatarColor: "text-secondary",
  },
  {
    id: "5",
    name: "Faris Ardian",
    nim: "NIM: 2205102014",
    initials: "FA",
    division: "PSDM",
    role: "staff",
    roleLabel: "Staff",
    score: "88.50",
    avatarBg: "bg-primary-50",
    avatarColor: "text-primary",
  },
  {
    id: "6",
    name: "Nabila Dwi",
    nim: "NIM: 2205102088",
    initials: "ND",
    division: "BPH",
    role: "bph",
    roleLabel: "BPH",
    score: "91.30",
    avatarBg: "bg-secondary-50",
    avatarColor: "text-secondary",
  },
];

export const RecentVerifiedReportsCard: React.FC = () => {
  return (
    <Card
      variant="default"
      padding="none"
      className="p-6 md:p-7 bg-surface rounded-2xl border border-neutral-200/80 shadow-xs"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-100">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>

          <div>
            <h3 className="font-headline font-bold text-base sm:text-lg text-neutral-800 leading-snug">
              Entri Raport Terverifikasi Terbaru
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Penilaian fungsionaris yang baru diperbarui dan diverifikasi oleh pimpinan BPH
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-primary transition-colors cursor-pointer self-start sm:self-center"
        >
          <span>Lihat Semua Raport</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto pt-2">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-100 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              <th className="py-3.5 px-3">Fungsionaris</th>
              <th className="py-3.5 px-3">Divisi &amp; Peran</th>
              <th className="py-3.5 px-3">Skor Akhir</th>
              <th className="py-3.5 px-3">Status</th>
              <th className="py-3.5 px-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100/80 text-sm">
            {reportEntries.map((item, index) => (
              <tr
                key={`${item.id}-${index}`}
                className="hover:bg-neutral-50/60 transition-colors"
              >
                {/* 1. Fungsionaris (Avatar + Name + NIM) */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${item.avatarBg} ${item.avatarColor} font-bold text-xs flex items-center justify-center shrink-0 select-none`}
                    >
                      {item.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-sm text-neutral-900 leading-snug">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-neutral-400 font-mono">
                        {item.nim}
                      </div>
                    </div>
                  </div>
                </td>

                {/* 2. Divisi & Peran */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-xs text-neutral-700">
                      {item.division}
                    </span>
                    <RoleBadge
                      variant={item.role}
                      size="sm"
                      className="scale-90 origin-left"
                    >
                      {item.roleLabel}
                    </RoleBadge>
                  </div>
                </td>

                {/* 3. Skor Akhir */}
                <td className="py-3.5 px-3 font-headline font-bold text-neutral-900 text-sm">
                  {item.score}
                </td>

                {/* 4. Status */}
                <td className="py-3.5 px-3">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-status-success">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-success inline-block shrink-0" />
                    <span>Terverifikasi</span>
                  </div>
                </td>

                {/* 5. Aksi */}
                <td className="py-3.5 px-3 text-center">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200/80 rounded-lg transition-colors cursor-pointer"
                  >
                    Lihat Detail Raport
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RecentVerifiedReportsCard;

