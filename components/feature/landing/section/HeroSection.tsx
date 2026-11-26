import React from "react";
import Link from "next/link";
import { ClipboardCheck, Lock } from "lucide-react";
import Card from "@/components/ui/Card";
import StatCounterItem from "../component/StatCounterItem";
import DashboardMockup from "../component/DashboardMockup";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      <div className="layout-container text-center space-y-8">
        <div className="inline-flex items-center justify-center">
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

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full h-11 px-6 text-sm gap-2 font-semibold transition-all duration-150 ease-out select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary active:scale-[0.98] bg-primary text-surface hover:bg-primary-700 active:bg-primary-800 shadow-md hover:shadow-lg hover:shadow-primary/20"
          >
            <Lock className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Akses Raport Saya</span>
          </Link>

          <a
            href="#alur-penilaian"
            className="inline-flex items-center justify-center rounded-full h-11 px-6 text-sm gap-2 font-semibold transition-all duration-150 ease-out select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary active:scale-[0.98] bg-white hover:bg-neutral-50 border-2 border-neutral-300 text-neutral-800"
          >
            <ClipboardCheck className="w-4 h-4 text-neutral-500 shrink-0" aria-hidden="true" />
            <span>Lihat Alur Penilaian</span>
          </a>
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
              value="Role-Based"
              label="Hak Akses Terstruktur"
              sublabel="Akses Admin, BPH & Staff"
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
