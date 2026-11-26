import React from "react";
import Link from "next/link";

export const CtaSection: React.FC = () => {
  return (
    <section className="py-12 lg:py-16">
      <div className="layout-container">
        <div className="relative rounded-2xl sm:rounded-3xl bg-primary-900 text-white p-8 sm:p-10 lg:p-12 overflow-hidden shadow-xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <h2
                className="font-headline text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight leading-tight text-white"
                style={{ color: "var(--surface-bg)" }}
              >
                Siap Mewujudkan Budaya Organisasi <br />
                yang <br />
                Sehat &amp; Terbuka?
              </h2>

              <p className="text-xs sm:text-sm leading-relaxed max-w-xl font-body text-white/85">
                Tinggalkan cara konvensional berbasis asumsi. Mulai gunakan EvalOrg untuk transparansi penilaian fungsionaris kabinet Anda sekarang juga.
              </p>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-primary-900 font-headline font-bold text-sm sm:text-base hover:bg-neutral-100 active:scale-[0.98] transition-all duration-150 ease-out shadow-md hover:shadow-lg cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 focus-visible:ring-white"
              >
                Masuk / Login Fungsionaris
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
