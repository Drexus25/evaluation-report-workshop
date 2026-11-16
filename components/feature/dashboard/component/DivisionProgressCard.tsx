"use client";

import React from "react";
import { BarChart3 } from "lucide-react";
import Card from "@/components/ui/Card";

interface DivisionProgress {
  name: string;
  fullName: string;
  percentage: number;
  completed: number;
  total: number;
  score: string;
  badgeStyle: string;
}

const divisionData: DivisionProgress[] = [
  {
    name: "BPH",
    fullName: "Badan Pengurus Harian",
    percentage: 100,
    completed: 8,
    total: 8,
    score: "89.20",
    badgeStyle: "bg-status-success-bg text-status-success-text",
  },
  {
    name: "PSDM",
    fullName: "Pengembangan SDM",
    percentage: 90,
    completed: 9,
    total: 10,
    score: "86.45",
    badgeStyle: "bg-primary-50 text-primary font-medium",
  },
  {
    name: "Medinfo",
    fullName: "Media & Informasi",
    percentage: 78,
    completed: 7,
    total: 9,
    score: "84.10",
    badgeStyle: "bg-neutral-100 text-neutral-600",
  },
  {
    name: "Humas",
    fullName: "Hubungan Masyarakat",
    percentage: 67,
    completed: 6,
    total: 9,
    score: "82.30",
    badgeStyle: "bg-neutral-100 text-neutral-600",
  },
  {
    name: "Ekraf",
    fullName: "Ekonomi Kreatif",
    percentage: 50,
    completed: 4,
    total: 8,
    score: "81.70",
    badgeStyle: "bg-status-warning-bg text-status-warning-text",
  },
];

export const DivisionProgressCard: React.FC = () => {
  return (
    <Card
      variant="default"
      padding="none"
      className="p-6 md:p-7 bg-surface rounded-2xl border border-neutral-200/80 shadow-xs"
    >
      {/* Header */}
      <div className="pb-5 border-b border-neutral-100">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>

          <div>
            <h3 className="font-headline font-bold text-base sm:text-lg text-neutral-800 leading-snug">
              Progres Evaluasi per Divisi
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Monitoring keterisian dan pencapaian rata-rata raport tiap divisi
            </p>

            <span className="inline-flex items-center text-[11px] font-semibold text-neutral-600 bg-neutral-100 px-2.5 py-0.5 rounded-full mt-2.5 select-none">
              5 Divisi Aktif
            </span>
          </div>
        </div>
      </div>

      {/* Division Items List */}
      <div className="pt-4 space-y-3.5">
        {divisionData.map((item) => (
          <div
            key={item.name}
            className="p-3.5 rounded-xl border border-neutral-100 bg-surface hover:bg-neutral-50/50 transition-colors"
          >
            {/* Top row: Name, Badge, Completed count, Score */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-bold text-neutral-800 truncate">
                  {item.name} ({item.fullName})
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${item.badgeStyle}`}
                >
                  {item.percentage}%
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0 pl-2">
                <span className="text-xs text-neutral-500 font-medium">
                  {item.completed}/{item.total} Selesai
                </span>
                <span className="font-headline font-bold text-primary text-sm sm:text-base">
                  {item.score}
                </span>
              </div>
            </div>

            {/* Bottom row: Progress bar */}
            <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden mt-2.5">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DivisionProgressCard;

