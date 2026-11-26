import React from "react";
import FaqItem from "../component/FaqItem";

export const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-16 lg:py-24 bg-white scroll-mt-24">
      <div className="layout-container max-w-4xl space-y-10">
        <div className="text-center space-y-3">
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
            question="Apakah transkrip raport digital ini dapat dicetak untuk arsip organisasi?"
            answer="Ya. Raport evaluasi digital dari platform EvalOrg menyajikan rekapitulasi skor per kriteria dan catatan evaluasi kualitatif dalam format siap cetak, sehingga mudah dilampirkan untuk arsip sidang LPJ maupun portofolio internal organisasi."
            defaultOpen={false}
          />
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
