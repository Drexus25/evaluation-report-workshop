import React from "react";
import { Calculator, FileText, ShieldCheck, SlidersHorizontal } from "lucide-react";
import FeatureCard from "../component/FeatureCard";

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-neutral-50/50">
      <div className="layout-container space-y-12">
        <div className="w-full max-w-2xl mx-auto text-center space-y-3">
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
            icon={<SlidersHorizontal className="w-6 h-6" aria-hidden="true" />}
            title="Rubrik Penilaian Terstandarisasi"
            description="Pemisahan tegas aspek evaluasi untuk Badan Pengurus Harian (BPH) dan Staff Fungsionaris menggunakan skala baku 0-100 tanpa multitafsir."
            actionText="Masuk Portal Evaluasi"
            actionHref="/login"
          />

          <FeatureCard
            icon={<Calculator className="w-6 h-6" aria-hidden="true" />}
            title="Kalkulasi Akurat & Transparan"
            description="Sistem komputasi otomatis dengan presisi 2 angka di belakang koma. Menghilangkan kesalahan kalkulasi manual dan bias subjektif antar fungsionaris."
            actionText="Lihat Alur Penilaian"
            actionHref="#alur-penilaian"
          />

          <FeatureCard
            icon={<ShieldCheck className="w-6 h-6" aria-hidden="true" />}
            title="Proteksi Transaksi Atomik"
            description="Pencegahan duplikasi input nilai secara bersamaan melalui sistem HTTP 409 Conflict. Data penilaian terkunci aman dan tidak dapat diubah sepihak."
            actionText="Pelajari di FAQ"
            actionHref="#faq"
          />

          <FeatureCard
            icon={<FileText className="w-6 h-6" aria-hidden="true" />}
            title="Transkrip Digital Siap Cetak"
            description="Menyajikan raport performa digital lengkap dengan rekapitulasi skor kriteria dan catatan evaluasi kualitatif yang siap dicetak untuk arsip sidang LPJ."
            actionText="Buka Halaman Raport"
            actionHref="/raport"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
