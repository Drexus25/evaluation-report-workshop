import React from "react";
import RoleBadge from "@/components/ui/RoleBadge";

export const DashboardMockup: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl md:rounded-3xl border border-neutral-200/90 bg-white/95 shadow-[0_20px_60px_-15px_rgba(31,111,120,0.15)] overflow-hidden backdrop-blur-sm transition-all hover:shadow-[0_25px_70px_-15px_rgba(31,111,120,0.2)]">
      <div className="px-4 py-3 bg-neutral-50/90 border-b border-neutral-200/80 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400/90 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-400/90 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/90 inline-block" />
        </div>

        <div className="flex-1 max-w-md mx-auto hidden sm:flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200 text-neutral-600 text-[11px] font-mono">
          <svg
            className="w-3.5 h-3.5 text-primary shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span className="truncate">evalorg.kampus.ac.id/raport-transkrip</span>
        </div>

        <RoleBadge variant="verified" size="sm">
          Terverifikasi BPH
        </RoleBadge>
      </div>
      <div className="p-4 sm:p-6 lg:p-8 bg-linear-to-b from-white to-neutral-50/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-headline font-bold text-lg shadow-xs shrink-0">
                RZ
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-headline font-bold text-neutral-900 text-sm truncate">
                    Rafi Zaidan Hakim
                  </h4>
                  <RoleBadge variant="bph" size="sm" className="scale-90 origin-left">
                    BPH
                  </RoleBadge>
                </div>
                <p className="text-xs text-neutral-500 truncate">
                  Ahli Komisi &amp; Harmonisasi
                </p>
                <p className="text-[11px] font-mono text-neutral-400">
                  NIM: 2202100145
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50/80 border border-neutral-100 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                Nilai Prestasi Fungsionaris
              </span>
              <div className="flex items-baseline justify-center gap-1 font-headline">
                <span className="text-4xl font-extrabold text-primary tracking-tight">
                  94.85
                </span>
                <span className="text-sm font-semibold text-neutral-400">
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
                <span className="font-semibold text-neutral-800 font-mono">
                  98.00%
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-neutral-500">Ketuntasan Proker Unggulan</span>
                <span className="font-semibold text-neutral-800 font-mono">
                  92.50%
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-xl bg-primary text-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h5 className="font-headline font-bold text-sm">
                    Transkrip Sah Semester Genap 2024/2025
                  </h5>
                  <p className="text-[11px] text-white/80">
                    Nilai berbobot akhir dipantau langsung dengan komposit kriteria
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:border-primary-300 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <h6 className="font-headline font-semibold text-xs text-neutral-800">
                    Eksekusi Program Kerja
                  </h6>
                  <svg className="w-3.5 h-3.5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                  Kesesuaian timeline, penyerapan anggaran dan kepuasan audiens target kegiatan
                </p>
                <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-neutral-400">Skor Kriteria</span>
                  <span className="font-bold text-primary font-mono text-sm">95.20</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:border-primary-300 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <h6 className="font-headline font-semibold text-xs text-neutral-800">
                    Loyalitas &amp; Disiplin Rapat
                  </h6>
                  <svg className="w-3.5 h-3.5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                  Tingkat kehadiran presensi kegiatan harian, rapat koordinasi mingguan
                </p>
                <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-neutral-400">Skor Kriteria</span>
                  <span className="font-bold text-primary font-mono text-sm">96.00</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:border-primary-300 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <h6 className="font-headline font-semibold text-xs text-neutral-800">
                    Inisiatif &amp; Problem Solving
                  </h6>
                  <svg className="w-3.5 h-3.5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                  Solusi taktis saat kendala lapangan dan proaktif mendukung divisi lain
                </p>
                <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-neutral-400">Skor Kriteria</span>
                  <span className="font-bold text-primary font-mono text-sm">93.40</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:border-primary-300 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <h6 className="font-headline font-semibold text-xs text-neutral-800">
                    Kolegialitas &amp; Etika Tim
                  </h6>
                  <svg className="w-3.5 h-3.5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                  Sikap koordinasi horizontal antar staff dan vertikal dengan Badan Pengurus Harian
                </p>
                <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-neutral-400">Skor Kriteria</span>
                  <span className="font-bold text-primary font-mono text-sm">94.80</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-neutral-50/80 p-3 rounded-xl border border-neutral-200/60">
              <div className="flex items-center gap-2 text-neutral-600 font-mono text-[11px] truncate">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="truncate">Transkrip_Raport_RafiZaidan.pdf</span>
              </div>
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-700 transition-all cursor-pointer shadow-xs active:scale-95">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Unduh Transkrip Resmi</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
