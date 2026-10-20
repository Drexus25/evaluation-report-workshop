import React from "react";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa6";

export const CtaSection: React.FC = () => {
  return (
    <section className="py-12 lg:py-16">
      <div className="layout-container">
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#0C4E54] p-8 sm:p-10 lg:p-12 overflow-hidden shadow-xl">
          {/* Subtle Right Ambient Light Glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 right-1/4 w-72 h-72 rounded-full bg-[#57D5D0]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Left Content */}
            <div className="max-w-2xl space-y-4">
              {/* Star Rating Badge */}
              <div className="inline-flex items-center gap-2.5">
                <div className="flex items-center gap-1 text-[#57D5D0]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaRegStar key={i} className="w-3.5 h-3.5 text-[#57D5D0]" />
                  ))}
                </div>
                <span
                  className="text-xs font-medium tracking-wide"
                  style={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  Dipercaya oleh 40+ Lembaga Mahasiswa
                </span>
              </div>

              {/* Title with exact 3 lines matching the reference */}
              <h2
                className="font-headline text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight leading-[1.25] !text-white"
                style={{ color: "#ffffff" }}
              >
                Siap Mewujudkan Budaya Organisasi <br />
                yang <br />
                Sehat &amp; Terbuka?
              </h2>

              {/* Subtitle */}
              <p
                className="text-xs sm:text-sm leading-relaxed max-w-xl font-body"
                style={{ color: "rgba(255, 255, 255, 0.85)" }}
              >
                Tinggalkan cara konvensional berbasis asumsi. Mulai gunakan EvalOrg untuk transparansi penilaian fungsionaris kabinet Anda sekarang juga.
              </p>
            </div>

            {/* Right Action Button */}
            <div className="shrink-0 w-full sm:w-auto">
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white font-headline font-bold text-sm sm:text-base hover:bg-neutral-100 active:scale-98 transition-all shadow-md hover:shadow-lg cursor-pointer select-none"
                style={{ color: "#0C4E54" }}
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
