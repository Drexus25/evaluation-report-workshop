"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import Card from "@/components/ui/Card";

interface MetricBreakdown {
  label: string;
  percentage: number;
  colorClass: string;
}

const breakdownData: MetricBreakdown[] = [
  {
    label: "Kedisiplinan",
    percentage: 50,
    colorClass: "bg-primary",
  },
  {
    label: "Eksekusi Proker",
    percentage: 34,
    colorClass: "bg-secondary",
  },
  {
    label: "Kerjasama Tim",
    percentage: 16,
    colorClass: "bg-accent",
  },
];

export const OrganizationPerformanceCard: React.FC = () => {
  const score = 84.75;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card
      variant="default"
      padding="none"
      className="p-6 md:p-8 bg-surface rounded-2xl border border-neutral-200/80 shadow-xs"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-6">
        <h3 className="font-headline font-bold text-neutral-800 text-base md:text-lg">
          Performa Organisasi
        </h3>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-neutral-700 transition-colors cursor-pointer select-none"
        >
          <span>Periode Ini</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Body: Donut chart & Breakdown */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-2">
        {/* Breakdown Legend (Left side) */}
        <div className="w-full md:w-1/2 space-y-4 order-2 md:order-1">
          {breakdownData.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between text-sm py-0.5"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.colorClass}`}
                  aria-hidden="true"
                />
                <span className="font-medium text-neutral-700">{item.label}</span>
              </div>
              <span className="font-bold text-neutral-800 font-headline">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>

        {/* Circular Donut Gauge (Right / Center) */}
        <div className="w-full md:w-1/2 flex items-center justify-center order-1 md:order-2">
          <div className="relative flex items-center justify-center">
            <svg
              className="w-44 h-44 -rotate-90 transform"
              viewBox="0 0 140 140"
              aria-label={`Skor Rata-Rata ${score}`}
            >
              {/* Background Track Circle */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                className="text-neutral-100"
                strokeWidth="14"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress Arc */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                className="text-primary transition-all duration-1000 ease-out"
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
              <span className="text-3xl font-extrabold font-headline text-neutral-900 tracking-tight leading-none">
                {score.toFixed(2)}
              </span>
              <span className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase mt-1">
                Rata-Rata
              </span>
              <span className="mt-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-status-warning-bg text-status-warning-text border border-status-warning/20">
                Sangat Baik
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrganizationPerformanceCard;

