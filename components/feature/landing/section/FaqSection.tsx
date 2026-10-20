import React from "react";
import FaqItem from "../component/FaqItem";
import RoleBadge from "@/components/ui/RoleBadge";

export const FaqSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="layout-container max-w-4xl space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center">
            <RoleBadge variant="bph" size="sm" className="tracking-wider uppercase">
              Bantuan &amp; FAQ
            </RoleBadge>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
            Pertanyaan Fungsionaris
          </h2>
        </div>

        <div className="space-y-3">
          <FaqItem
            question="Apakah fungsionaris lain dapat melihat rincian raport saya?"
            answer="Tidak. Rincian nilai dan catatan kualitatif bersifat privat dan hanya dapat diakses oleh fungsionaris yang bersangkutan, ketua divisi terkait, serta presidium BPH yang berwenang demi menjaga objektivitas dan kenyamanan berorganisasi."
            defaultOpen={false}
          />

          <FaqItem
            question="Bagaimana jika BPH salah memasukkan nilai atau terjadi kendala jaringan?"
            answer="Sistem dilengkapi dengan proteksi transaksi HTTP 409 untuk mencegah duplikasi dan tabrakan data serentak. Jika terjadi kesalahan input sebelum status penilaian dikunci permanen, BPH dapat melakukan pembaruan nilai yang seluruh riwayatnya tercatat rapi di audit log."
            defaultOpen={false}
          />

          <FaqItem
            question="Apakah transkrip PDF resmi ini dapat dilampirkan sebagai SKPI?"
            answer="Ya. Transkrip hasil generate dari platform EvalOrg telah dilengkapi dengan barcode verifikasi digital, stempel organisasi terdaftar, serta rekapitulasi penilaian baku yang diakui untuk kelengkapan berkas portofolio, beasiswa, maupun lampiran SKPI."
            defaultOpen={false}
          />
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
