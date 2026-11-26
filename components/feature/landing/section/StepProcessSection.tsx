import React from "react";
import { Award, ClipboardCheck, User } from "lucide-react";
import StepCard from "../component/StepCard";

export const StepProcessSection: React.FC = () => {
  return (
    <section id="alur-penilaian" className="py-16 lg:py-24 bg-white scroll-mt-24">
      <div className="layout-container space-y-12">
        <div className="w-full max-w-2xl mx-auto text-center space-y-3">
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
            icon={<User className="w-5 h-5" aria-hidden="true" />}
            title="Login Akun Organisasi"
            description="BPH dan anggota masuk menggunakan email dan kata sandi akun terdaftar. Sistem otomatis menyesuaikan hak akses berdasarkan peran aktif."
            footerBadge="Autentikasi Berbasis Peran"
            badgeVariant="verified"
          />

          <StepCard
            stepNumber="02"
            icon={<ClipboardCheck className="w-5 h-5" aria-hidden="true" />}
            title="Penilaian Objektif oleh BPH"
            description="Ketua divisi dan presidium mengisi rubrik penilaian berbasis indikator capaian proker, catatan kedisiplinan, serta masukan kualitatif yang membangun."
            footerBadge="Rubrik Standar Mutu"
            badgeVariant="draft"
          />

          <StepCard
            stepNumber="03"
            icon={<Award className="w-5 h-5" aria-hidden="true" />}
            title="Raport Pribadi Terbit"
            description="Hasil evaluasi teragregasi otomatis dan dapat ditinjau melalui portal pribadi. Setiap fungsionaris dapat mencetak transkrip kinerja untuk portofolio &amp; arsip sidang LPJ."
            footerBadge="Transkrip Siap Cetak"
            badgeVariant="locked"
          />
        </div>
      </div>
    </section>
  );
};

export default StepProcessSection;
