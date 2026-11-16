"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Sliders,
  FileDown,
  Users,
  FileCheck,
  TrendingUp,
  ShieldCheck,
  Lock,
  FileText,
  BarChart3,
  ChevronDown,
  ArrowRight,
  X,
} from "lucide-react";
import RoleBadge from "@/components/ui/RoleBadge";
import Button from "@/components/ui/Button";

interface RecentReportItem {
  id: string;
  name: string;
  nim: string;
  division: string;
  role: "bph" | "staff";
  score: number;
  status: "verified";
  scores: Array<{ aspect: string; score: number }>;
  evaluation: string;
}

const recentReportsData: RecentReportItem[] = [
  {
    id: "rep-001",
    name: "Faris Ardian",
    nim: "22081010015",
    division: "PSDM",
    role: "staff",
    score: 88.5,
    status: "verified",
    scores: [
      { aspect: "Kedisiplinan", score: 90 },
      { aspect: "Kerjasama Tim", score: 87 },
      { aspect: "Inisiatif & Eksekusi", score: 88 },
    ],
    evaluation:
      "Menunjukkan dedikasi tinggi dalam manajemen pelatihan kaderisasi organisasi dan proaktif membantu divisi lain.",
  },
  {
    id: "rep-002",
    name: "Nabila Dwi",
    nim: "22081010008",
    division: "BPH",
    role: "bph",
    score: 91.3,
    status: "verified",
    scores: [
      { aspect: "Kepemimpinan Strategis", score: 92 },
      { aspect: "Koordinasi Antardivisi", score: 90 },
      { aspect: "Integritas & Akuntabilitas", score: 92 },
    ],
    evaluation:
      "Kepemimpinan sangat stabil, komunikasi lintas kementerian tertata rapi dengan transparansi laporan pertanggungjawaban yang prima.",
  },
  {
    id: "rep-003",
    name: "Faris Ardian",
    nim: "22081010015",
    division: "PSDM",
    role: "staff",
    score: 88.5,
    status: "verified",
    scores: [
      { aspect: "Kedisiplinan", score: 90 },
      { aspect: "Kerjasama Tim", score: 87 },
      { aspect: "Inisiatif & Eksekusi", score: 88 },
    ],
    evaluation:
      "Performa konsisten di setiap tahapan program kerja kementerian, disiplin waktu, dan tanggap terhadap arahan pimpinan.",
  },
  {
    id: "rep-004",
    name: "Nabila Dwi",
    nim: "22081010008",
    division: "BPH",
    role: "bph",
    score: 91.3,
    status: "verified",
    scores: [
      { aspect: "Kepemimpinan Strategis", score: 92 },
      { aspect: "Koordinasi Antardivisi", score: 90 },
      { aspect: "Integritas & Akuntabilitas", score: 92 },
    ],
    evaluation:
      "Tata kelola presidium berjalan efektif dengan evaluasi berkala yang berdampak nyata pada produktivitas pengurus.",
  },
  {
    id: "rep-005",
    name: "Faris Ardian",
    nim: "22081010015",
    division: "PSDM",
    role: "staff",
    score: 88.5,
    status: "verified",
    scores: [
      { aspect: "Kedisiplinan", score: 90 },
      { aspect: "Kerjasama Tim", score: 87 },
      { aspect: "Inisiatif & Eksekusi", score: 88 },
    ],
    evaluation:
      "Memiliki inisiatif tinggi dalam perancangan modul kader dan adaptif terhadap kendala teknis di lapangan.",
  },
  {
    id: "rep-006",
    name: "Nabila Dwi",
    nim: "22081010008",
    division: "BPH",
    role: "bph",
    score: 91.3,
    status: "verified",
    scores: [
      { aspect: "Kepemimpinan Strategis", score: 92 },
      { aspect: "Koordinasi Antardivisi", score: 90 },
      { aspect: "Integritas & Akuntabilitas", score: 92 },
    ],
    evaluation:
      "Mampu mengarahkan kebijakan organisasi secara terukur dan menjaga keharmonisan internal seluruh pengurus.",
  },
];

const divisionProgressData = [
  {
    name: "BPH (Badan Pengurus Harian)",
    completed: "8/8 Selesai",
    percentage: 100,
    average: "89.20",
    badgeColor: "bg-emerald-50 text-emerald-700",
  },
  {
    name: "PSDM (Pengembangan SDM)",
    completed: "9/10 Selesai",
    percentage: 90,
    average: "86.45",
    badgeColor: "bg-teal-50 text-teal-700",
  },
  {
    name: "Medinfo (Media & Informasi)",
    completed: "7/9 Selesai",
    percentage: 78,
    average: "84.10",
    badgeColor: "bg-teal-50 text-teal-700",
  },
  {
    name: "Humas (Hubungan Masyarakat)",
    completed: "6/9 Selesai",
    percentage: 67,
    average: "82.30",
    badgeColor: "bg-teal-50 text-teal-700",
  },
  {
    name: "Ekraf (Ekonomi Kreatif)",
    completed: "4/8 Selesai",
    percentage: 50,
    average: "81.70",
    badgeColor: "bg-amber-50 text-amber-700",
  },
];

export default function AdminDashboardContainer() {
  const [selectedReport, setSelectedReport] = useState<RecentReportItem | null>(null);

  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = 0.8475;
  const strokeDashoffset = circumference * (1 - progressRatio);

  const handleExportPdf = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div className="space-y-1">
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight flex items-center gap-2">
            Halo, Sarah Adinda
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Rekapitulasi berkala evaluasi kerja fungsionaris BPH &amp; Staff periode berjalan.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link href="/admin/raport/create">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-primary text-surface hover:bg-primary-700 transition-colors cursor-pointer shadow-xs"
              >
                <Plus size={15} />
                Input Raport
              </button>
            </Link>

            <Link href="/admin/aspek">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-surface border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                <Sliders size={14} className="text-neutral-500" />
                Kelola Aspek
              </button>
            </Link>

            <button
              type="button"
              onClick={handleExportPdf}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-surface border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              <FileDown size={14} className="text-neutral-500" />
              Ekspor (.PDF)
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>Semester Genap 2024/2025</span>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-800 border border-teal-200/70">
            Tahap Penilaian Aktif
          </span>
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-neutral-200 p-6">
        <div className="flex items-center justify-between pb-4">
          <h2 className="font-headline font-bold text-sm sm:text-base text-neutral-900">
            Performa Organisasi
          </h2>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-700 cursor-pointer"
          >
            Periode Ini
            <ChevronDown size={14} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="currentColor"
                strokeWidth="10"
                className="text-teal-50"
                fill="transparent"
              />
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="currentColor"
                strokeWidth="10"
                className="text-primary transition-all duration-700 ease-out"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-headline text-3xl font-bold text-neutral-900 tracking-tight leading-none">
                84.75
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mt-1">
                RATA-RATA
              </span>
              <span className="mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60">
                Sangat Baik
              </span>
            </div>
          </div>

          <div className="w-full max-w-sm mt-6 space-y-2 text-xs">
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="text-neutral-700 font-medium">Kedisiplinan</span>
              </div>
              <span className="font-bold text-neutral-900 font-headline">50%</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                <span className="text-neutral-700 font-medium">Eksekusi Proker</span>
              </div>
              <span className="font-bold text-neutral-900 font-headline">34%</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-300" />
                <span className="text-neutral-700 font-medium">Kerjasama Tim</span>
              </div>
              <span className="font-bold text-neutral-900 font-headline">16%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 font-mono">
            ATURAN &amp; INTEGRITAS MVP
          </span>
          <span className="text-[10px] text-neutral-400 font-mono font-medium">
            v0.4
          </span>
        </div>

        <div className="space-y-2.5">
          <div className="bg-surface border border-neutral-200 rounded-xl p-3 sm:p-3.5 flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <FileText size={16} />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-neutral-900">
                Hak Akses BPH
              </h4>
              <p className="text-[11px] text-neutral-500">
                Deviasi penuh verifikasi nilai
              </p>
            </div>
          </div>

          <div className="bg-surface border border-neutral-200 rounded-xl p-3 sm:p-3.5 flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <Lock size={16} />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-neutral-900">
                1 Raport per Fungsionaris
              </h4>
              <p className="text-[11px] text-neutral-500">
                Mencegah duplikasi data per semester
              </p>
            </div>
          </div>

          <div className="bg-surface border border-neutral-200 rounded-xl p-3 sm:p-3.5 flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <ShieldCheck size={16} />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-neutral-900">
                Proteksi Atomik &amp; Anti-Conflict 409
              </h4>
              <p className="text-[11px] text-neutral-500">
                Integritas data transaksi concurrent
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border border-neutral-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                TOTAL FUNGSIONARIS
              </span>
              <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <Users size={15} />
              </div>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-headline text-2xl font-bold text-neutral-900">
                48
              </span>
              <span className="text-xs text-neutral-500 font-medium ml-1">
                Orang
              </span>
            </div>
          </div>
          <p className="text-[11px] text-neutral-500 font-medium mt-3">
            36 Staff • 12 BPH
          </p>
        </div>

        <div className="bg-surface border border-neutral-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                RAPORT TERISI
              </span>
              <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <FileCheck size={15} />
              </div>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-headline text-2xl font-bold text-neutral-900">
                38
              </span>
              <span className="text-xs text-neutral-400 font-medium">
                / 48
              </span>
            </div>
          </div>
          <p className="text-[11px] text-neutral-500 font-medium mt-3">
            <span className="text-teal-700 font-semibold">79.2% Selesai</span> • 10 Draft
          </p>
        </div>

        <div className="bg-surface border border-neutral-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                INDEKS KINERJA
              </span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp size={15} />
              </div>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-headline text-2xl font-bold text-neutral-900">
                84.75
              </span>
              <span className="text-xs text-neutral-400 font-medium">
                / 100
              </span>
            </div>
          </div>
          <div className="mt-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200/50">
              ★ Sangat Baik
            </span>
          </div>
        </div>

        <div className="bg-surface border border-neutral-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                RUBRIK PENILAIAN
              </span>
              <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <Sliders size={15} />
              </div>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-headline text-2xl font-bold text-neutral-900">
                10
              </span>
              <span className="text-xs text-neutral-500 font-medium ml-1">
                Aspek
              </span>
            </div>
          </div>
          <p className="text-[11px] text-neutral-500 font-medium mt-3">
            5 BPH • 5 Staff • 0 - 100
          </p>
        </div>
      </div>

      <div className="bg-surface border border-neutral-200 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <BarChart3 size={18} />
            </div>
            <div>
              <h3 className="font-headline font-bold text-sm sm:text-base text-neutral-900">
                Progres Evaluasi per Divisi
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Monitoring keterisian dan pencapaian rata-rata raport tiap divisi
              </p>
              <div className="mt-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 text-neutral-600">
                  5 Divisi Aktif
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-5">
          {divisionProgressData.map((item) => (
            <div key={item.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-neutral-900">
                    {item.name}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor}`}>
                    {item.percentage}%
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-neutral-500">
                    {item.completed}
                  </span>
                  <span className="font-headline font-bold text-teal-950 text-sm">
                    {item.average}
                  </span>
                </div>
              </div>

              <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface border border-neutral-200 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3 className="font-headline font-bold text-sm sm:text-base text-neutral-900">
                Entri Raport Terverifikasi Terbaru
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Penilaian fungsionaris yang baru diperbarui dan diverifikasi oleh pimpinan BPH
              </p>
            </div>
          </div>

          <Link
            href="/admin/raport"
            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-700 transition-colors self-start sm:self-auto"
          >
            Lihat Semua Raport
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/70 text-neutral-400 uppercase font-bold text-[10px] tracking-wider border-b border-neutral-200 font-mono">
              <tr>
                <th className="px-6 py-3.5">FUNGSIONARIS</th>
                <th className="px-6 py-3.5">DIVISI &amp; PERAN</th>
                <th className="px-6 py-3.5">SKOR AKHIR</th>
                <th className="px-6 py-3.5">STATUS</th>
                <th className="px-6 py-3.5 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {recentReportsData.map((item, idx) => {
                const initials = item.name
                  .split(" ")
                  .slice(0, 2)
                  .map((n) => n[0])
                  .join("");

                return (
                  <tr
                    key={`${item.id}-${idx}`}
                    className="hover:bg-neutral-50/60 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 border border-teal-200/50 flex items-center justify-center font-bold font-headline text-[11px] shrink-0">
                          {initials}
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900 text-xs">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-neutral-400 font-mono">
                            NIM: {item.nim}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-neutral-700 text-xs">
                          {item.division}
                        </span>
                        <RoleBadge
                          variant={item.role === "bph" ? "bph" : "staff"}
                          size="sm"
                        >
                          {item.role === "bph" ? "BPH" : "Staff"}
                        </RoleBadge>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-headline font-bold text-neutral-900 text-xs">
                        {item.score.toFixed(2)}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Terverifikasi
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedReport(item)}
                        className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        Lihat Detail Raport
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl border border-neutral-200 max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-neutral-200">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-headline text-lg font-bold text-neutral-900">
                    {selectedReport.name}
                  </h3>
                  <RoleBadge
                    variant={selectedReport.role === "bph" ? "bph" : "staff"}
                    size="sm"
                  >
                    {selectedReport.role === "bph" ? "BPH" : "Staff"}
                  </RoleBadge>
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">
                  NIM: {selectedReport.nim} • Divisi: {selectedReport.division}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer text-sm font-bold"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                  NILAI AKHIR
                </span>
                <span className="font-headline text-2xl font-bold text-primary">
                  {selectedReport.score.toFixed(2)}
                  <span className="text-xs font-normal text-neutral-400"> / 100</span>
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                Terverifikasi
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-neutral-800 block">
                Rincian Aspek
              </span>
              <div className="divide-y divide-neutral-200 border border-neutral-200 rounded-xl overflow-hidden">
                {selectedReport.scores.map((sc) => (
                  <div
                    key={sc.aspect}
                    className="p-2.5 px-3 flex items-center justify-between text-xs bg-surface"
                  >
                    <span className="text-neutral-700 font-medium">
                      {sc.aspect}
                    </span>
                    <span className="font-bold font-headline text-neutral-900">
                      {sc.score} / 100
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-neutral-800 block">
                Evaluasi Menyeluruh
              </span>
              <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-xs text-neutral-600 leading-relaxed italic">
                &ldquo;{selectedReport.evaluation}&rdquo;
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedReport(null)}
                className="rounded-full border-neutral-300 text-neutral-700!"
              >
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
