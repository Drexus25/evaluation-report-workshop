"use client";

import React from "react";
import { ShieldCheck, Lock, RefreshCw } from "lucide-react";
import Card from "@/components/ui/Card";

interface RuleItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const ruleItems: RuleItem[] = [
  {
    icon: ShieldCheck,
    title: "Hak Akses BPH",
    description: "Otorisasi penuh verifikasi nilai",
  },
  {
    icon: Lock,
    title: "1 Raport per Fungsionaris",
    description: "Mencegah duplikasi data per semester",
  },
  {
    icon: RefreshCw,
    title: "Proteksi Atomik & Anti-Conflict 409",
    description: "Integritas data transaksi concurrent",
  },
];

export const MvpIntegrityCard: React.FC = () => {
  return (
    <Card
      variant="default"
      padding="none"
      className="p-6 bg-surface rounded-2xl border border-neutral-200/80 shadow-xs"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-neutral-100">
        <h3 className="font-headline font-bold text-xs uppercase tracking-wider text-neutral-800">
          Aturan &amp; Integritas MVP
        </h3>
        <span className="text-xs font-mono font-medium text-neutral-400">
          v2.4
        </span>
      </div>

      {/* Rules List */}
      <div className="divide-y divide-neutral-100">
        {ruleItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex items-center gap-3.5 py-4 first:pt-4 last:pb-1"
            >
              <div className="w-9 h-9 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-xs sm:text-sm text-neutral-800 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default MvpIntegrityCard;

