import React from "react";
import Link from "next/link";
import {
  Calendar,
  FileText,
  Lightbulb,
  Lock,
  LogIn,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import RoleBadge from "@/components/ui/RoleBadge";
import Card from "@/components/ui/Card";

interface MockCriterion {
  title: string;
  description: string;
  score: string;
  icon: LucideIcon;
}

const MOCK_CRITERIA: MockCriterion[] = [
  {
    title: "Eksekusi Program Kerja",
    description:
      "Kesesuaian timeline, penyerapan anggaran dan kepuasan audiens target kegiatan",
    score: "95.20",
    icon: TrendingUp,
  },
  {
    title: "Loyalitas & Disiplin Rapat",
    description:
      "Tingkat kehadiran presensi kegiatan harian, rapat koordinasi mingguan",
    score: "96.00",
    icon: Calendar,
  },
  {
    title: "Inisiatif & Problem Solving",
    description:
      "Solusi taktis saat kendala lapangan dan proaktif mendukung divisi lain",
    score: "93.40",
    icon: Lightbulb,
  },
  {
    title: "Kolegialitas & Etika Tim",
    description:
      "Sikap koordinasi horizontal antar staff dan vertikal dengan Badan Pengurus Harian",
    score: "94.80",
    icon: Users,
  },
];

export const DashboardMockup: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl md:rounded-3xl border border-neutral-200/90 bg-white/95 shadow-[0_20px_60px_-15px_rgba(31,111,120,0.15)] overflow-hidden backdrop-blur-sm transition-shadow duration-200 ease-out hover:shadow-[0_25px_70px_-15px_rgba(31,111,120,0.2)]">
      <div className="px-4 py-3 bg-neutral-50/90 border-b border-neutral-200/80 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400/90 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-400/90 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/90 inline-block" />
        </div>

        <div className="flex-1 max-w-md mx-auto hidden sm:flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200 text-neutral-600 text-[11px] font-mono">
          <Lock className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
          <span className="truncate">evalorg.kampus.ac.id/raport-transkrip</span>
        </div>

        <RoleBadge variant="bph" size="sm">
          Ilustrasi Tampilan
        </RoleBadge>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 bg-linear-to-b from-white to-neutral-50/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <Card variant="default" padding="none" className="lg:col-span-4 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-headline font-bold text-lg shadow-xs shrink-0">
                RZ
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-headline font-bold text-neutral-900 text-sm truncate">
                    Rafi Zaidan Hakim
                  </h4>
                  <RoleBadge variant="bph" size="sm">
                    BPH
                  </RoleBadge>
                </div>
                <p className="text-xs text-neutral-500 truncate">
                  Ahli Komisi &amp; Harmonisasi
                </p>
                <p className="text-[11px] font-mono text-neutral-500 tabular-nums">
                  NIM: 2202100145
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50/80 border border-neutral-100 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                Nilai Prestasi Fungsionaris
              </span>
              <div className="flex items-baseline justify-center gap-1 font-headline tabular-nums">
                <span className="text-4xl font-extrabold text-primary tracking-tight">
                  94.85
                </span>
                <span className="text-sm font-semibold text-neutral-500">
                  /100
                </span>
              </div>
              <div className="pt-1.5">
                <RoleBadge variant="verified" size="sm">
                  Kinerja Unggul (A)
                </RoleBadge>
              </div>
            </div>

            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">Kehadiran Rapat Pleno</span>
                <span className="font-semibold text-neutral-800 font-mono tabular-nums">
                  98.00%
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-neutral-500">Ketuntasan Proker Unggulan</span>
                <span className="font-semibold text-neutral-800 font-mono tabular-nums">
                  92.50%
                </span>
              </div>
            </div>
          </Card>

          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-xl bg-primary text-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h5 className="font-headline font-bold text-sm">
                    Ilustrasi Tampilan Raport
                  </h5>
                  <p className="text-[11px] text-white/80">
                    Contoh pratinjau struktur nilai berbobot dan rekap kriteria evaluasi
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MOCK_CRITERIA.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:border-primary-300 transition-colors duration-150 ease-out"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h6 className="font-headline font-semibold text-xs text-neutral-800">
                        {item.title}
                      </h6>
                      <Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-neutral-500">Skor Kriteria</span>
                      <span className="font-bold text-primary font-mono text-sm tabular-nums">
                        {item.score}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-neutral-50/80 p-3 rounded-xl border border-neutral-200/60">
              <div className="flex items-center gap-2 text-neutral-600 font-mono text-[11px] truncate">
                <FileText className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span className="truncate">Transkrip_Raport_RafiZaidan.pdf</span>
              </div>
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-700 transition-all duration-150 ease-out shadow-xs active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                <LogIn className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Masuk untuk Akses Raport</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
