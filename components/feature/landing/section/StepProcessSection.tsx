import React from "react";
import StepCard from "../component/StepCard";
import RoleBadge from "@/components/ui/RoleBadge";

export const StepProcessSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="layout-container space-y-12">
        <div className="w-full max-w-2xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center justify-center">
            <RoleBadge variant="bph" size="sm" className="tracking-wider uppercase">
              Proses Terstruktur
            </RoleBadge>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
            Alur 3 Langkah Mudah Menuju Evaluasi Sah
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-body">
            Dirancang praktis agar siklus evaluasi tengah dan akhir kepengurusan
            berjalan lancar tanpa kerumitan administratif fisik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <StepCard
            stepNumber="01"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
            title="Login Akun Organisasi"
            description="BPH dan anggota masuk menggunakan email institusi kampus atau ID fungsionaris terdaftar. Sistem otomatis menyesuaikan hak akses berdasarkan jabatan aktif."
            footerBadge="Single Sign-On Aktif"
            badgeVariant="verified"
          />

          <StepCard
            stepNumber="02"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            }
            title="Penilaian Objektif oleh BPH"
            description="Ketua divisi dan presidium mengisi rubrik penilaian berbasis indikator capaian proker, catatan kedisiplinan, serta masukan kualitatif yang membangun."
            footerBadge="Rubrik Standar Mutu"
            badgeVariant="draft"
          />

          <StepCard
            stepNumber="03"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            }
            title="Raport Pribadi Terbit"
            description="Hasil evaluasi otomatis teragregasi secara real-time. Setiap fungsionaris dapat mengunduh transkrip kinerja berstempel digital untuk portofolio &amp; arsip sidang LPJ."
            footerBadge="Arsip Digital Permanen"
            badgeVariant="locked"
          />
        </div>
      </div>
    </section>
  );
};

export default StepProcessSection;
