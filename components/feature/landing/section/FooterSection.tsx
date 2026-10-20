import React from "react";

export const FooterSection: React.FC = () => {
  return (
    <footer className="border-t border-neutral-200/80 bg-white py-8 text-xs text-neutral-500 font-body">
      <div className="layout-container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center font-headline font-bold text-xs shadow-2xs">
            EO
          </div>
          <span className="font-headline font-bold text-sm text-neutral-900">
            EvalOrg
          </span>
          <span className="text-neutral-300 hidden sm:inline">|</span>
          <span className="text-neutral-500 text-[11px] sm:text-xs">
            © 2024–2025 Platform Evaluasi Kinerja &amp; Transkrip Fungsionaris Organisasi.
          </span>
        </div>

        <div className="text-[10px] sm:text-[11px] font-mono tracking-wider font-semibold text-neutral-400 uppercase">
          Transparansi, Akurasi &amp; Akuntabilitas Mahasiswa
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
