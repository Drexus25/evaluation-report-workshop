import React from "react";
import Button from "@/components/ui/Button";
import RoleBadge from "@/components/ui/RoleBadge";
import Card from "@/components/ui/Card";
import StatCounterItem from "../component/StatCounterItem";
import DashboardMockup from "../component/DashboardMockup";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-linear-to-b from-primary-100/40 via-primary-50/20 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="layout-container text-center space-y-8">
        <div className="inline-flex items-center justify-center">
          <RoleBadge
            variant="verified"
            size="md"
            className=" hover:opacity-90 font-semibold shadow-xs"
          >
            SIKLUS EVALUASI SEMESTER GENAP 2024/2025
          </RoleBadge>
        </div>

        <div className="w-full max-w-4xl mx-auto space-y-4">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.2]">
            Transparansi &amp; Evaluasi Kinerja Fungsionaris Organisasi yang{" "}
            <span className="text-primary">
              Terukur dan Akuntabel
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-600 leading-relaxed font-body">
            Platform terintegrasi bagi BPH dan seluruh anggota organisasi kampus
            untuk memantau performa, rubrik penilaian objektif, dan transkrip digital
            tanpa bias administratif.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            variant="primary"
            size="md"
            className="rounded-full shadow-md hover:shadow-lg hover:shadow-primary/20"
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          >
            Akses Raport Saya
          </Button>

          <Button
            variant="outline"
            size="md"
            className="rounded-full bg-white hover:bg-neutral-50 border-neutral-300 text-neutral-800! font-semibold"
            leftIcon={
              <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            }
          >
            Lihat Alur Penilaian
          </Button>
        </div>

        <div className="pt-6 pb-4 w-full max-w-4xl mx-auto">
          <Card
            variant="default"
            padding="none"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 px-4 bg-white/90 backdrop-blur-xs divide-y md:divide-y-0 md:divide-x divide-neutral-100"
          >
            <StatCounterItem
              value="100%"
              label="Penilaian Objektif"
              sublabel="Transparansi Penuh"
            />
            <StatCounterItem
              value="2 Desimal"
              label="Presisi Matrik Terstandar"
              sublabel="Formula Akurat"
            />
            <StatCounterItem
              value="HTTP 409"
              label="Anti Duplikasi Nilai"
              sublabel="Proteksi Atomik"
            />
            <StatCounterItem
              value="PDF Instan"
              label="Siap Cetak Sidang Pleno"
              sublabel="Tanda Tangan Digital"
            />
          </Card>
        </div>

        <div className="pt-4">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
