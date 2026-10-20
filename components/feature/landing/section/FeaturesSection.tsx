import React from "react";
import FeatureCard from "../component/FeatureCard";
import RoleBadge from "@/components/ui/RoleBadge";

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-neutral-50/50">
      <div className="layout-container space-y-12">
        <div className="w-full max-w-2xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center justify-center">
            <RoleBadge variant="bph" size="sm" className="tracking-wider uppercase">
              Integritas Penilaian
            </RoleBadge>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
            Fitur Standar Evaluasi Terdepan
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-body">
            Dibangun khusus untuk memenuhi dinamika organisasi kemahasiswaan:
            terukur, aman, dan siap pakai untuk sidang pertanggungjawaban.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            }
            title="Rubrik Penilaian Terstandarisasi"
            description="Pemisahan tegas aspek evaluasi untuk Badan Pengurus Harian (BPH) dan Staff Fungsionaris menggunakan skala baku 0-100 tanpa multitafsir."
            actionText="Standar BPH & DPM"
          />

          <FeatureCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            }
            title="Kalkulasi Akurat & Transparan"
            description="Sistem komputasi otomatis dengan presisi 2 angka di belakang koma. Menghilangkan kesalahan kalkulasi manual dan bias subjektif antar fungsionaris."
            actionText="Formula Terverifikasi"
          />

          <FeatureCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
            title="Proteksi Transaksi Atomik"
            description="Pencegahan duplikasi input nilai secara bersamaan melalui sistem HTTP 409 Conflict. Data penilaian terkunci aman dan tidak dapat diubah sepihak."
            actionText="Integritas Database SQL"
          />

          <FeatureCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            title="Ekspor Transkrip Resmi PDF"
            description="Generate transkrip performa resmi lengkap dengan barcode validasi, catatan evaluasi kualitatif, serta tanda tangan digital pimpinan umum."
            actionText="Format Resmi Sidang LPJ"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
