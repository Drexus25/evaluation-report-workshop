import React from "react";
import { User } from "@/types";
import RoleBadge from "@/components/ui/RoleBadge";
import Card from "@/components/ui/Card";

interface RaportHeaderSectionProps {
  user: User;
  createdAt?: string;
  hasRaport: boolean;
}

export default function RaportHeaderSection({
  user,
  createdAt,
  hasRaport,
}: RaportHeaderSectionProps) {
  const formattedDate = createdAt
    ? new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(createdAt))
    : "-";

  return (
    <header className="mb-6">
      <Card variant="default" padding="lg" className="border-neutral-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Identitas Kiri */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary-50 border border-primary-200/60 text-primary flex items-center justify-center shrink-0 font-headline font-bold text-xl sm:text-2xl">
              {user.name
                .split(" ")
                .slice(0, 2)
                .map((n) => n[0])
                .join("")}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-headline text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                  {user.name}
                </h1>
                <RoleBadge variant={user.role === "bph" ? "bph" : "staff"} size="sm">
                  {user.role === "bph" ? "BPH Inti" : "Staff"}
                </RoleBadge>
                {hasRaport ? (
                  <RoleBadge variant="verified" size="sm">
                    Raport Resmi Terbit
                  </RoleBadge>
                ) : (
                  <RoleBadge variant="draft" size="sm">
                    Menunggu Penilaian
                  </RoleBadge>
                )}
              </div>

              <p className="text-sm text-neutral-600 font-medium">
                {user.department}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500 pt-1">
                <span>
                  NIM: <strong className="font-semibold text-neutral-700">{user.nim}</strong>
                </span>
                <span className="hidden sm:inline">•</span>
                <span>
                  Email: <span className="text-neutral-700">{user.email}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Meta Kanan: Periode & Tanggal Terbit */}
          <div className="flex flex-row md:flex-col items-start md:items-end justify-between md:justify-center gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-neutral-100 text-left md:text-right shrink-0">
            <div>
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                Periode Evaluasi
              </span>
              <span className="text-sm font-semibold text-neutral-800">
                {user.period}
              </span>
            </div>
            {hasRaport && (
              <div className="text-right">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                  Tanggal Terbit
                </span>
                <span className="text-xs text-neutral-600 font-medium">
                  {formattedDate}
                </span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </header>
  );
}
