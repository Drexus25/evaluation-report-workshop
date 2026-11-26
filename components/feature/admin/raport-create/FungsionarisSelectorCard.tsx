"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import RoleBadge from "@/components/ui/RoleBadge";
import { cn } from "@/libs/cn";
import { User, ReportListItem } from "@/types";

interface FungsionarisSelectorCardProps {
  users: User[];
  reports: ReportListItem[];
  selectedUserId: string;
  selectedUser: User | null;
  activeAspectsCount: number;
  isLoading: boolean;
  isSubmitting: boolean;
  errorMessage?: string;
  onSelectUser: (userId: string) => void;
}

export default function FungsionarisSelectorCard({
  users,
  reports,
  selectedUserId,
  selectedUser,
  activeAspectsCount,
  isLoading,
  isSubmitting,
  errorMessage,
  onSelectUser,
}: FungsionarisSelectorCardProps) {
  return (
    <Card variant="default" padding="lg" className="border-neutral-200">
      <CardHeader bordered className="pb-3">
        <div>
          <CardTitle className="text-base sm:text-lg">
            1. Pilih Fungsionaris
          </CardTitle>
          <p className="text-xs text-neutral-500 mt-0.5">
            Pilih anggota fungsionaris yang akan diberikan evaluasi
          </p>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        <div className="w-full flex flex-col font-sans">
          <label
            htmlFor="user-select"
            className="text-sm font-bold text-neutral-900 mb-2 select-none"
          >
            Nama Fungsionaris <span className="text-status-destructive">*</span>
          </label>

          {isLoading ? (
            <div className="py-3 px-4 rounded-xl bg-neutral-100 text-xs text-neutral-600 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span>Memuat daftar fungsionaris dari API...</span>
            </div>
          ) : (
            <select
              id="user-select"
              value={selectedUserId}
              disabled={isSubmitting}
              onChange={(e) => onSelectUser(e.target.value)}
              className={cn(
                "w-full rounded-xl bg-neutral-100 border py-3 px-4 text-sm text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer transition-colors duration-150 ease-out",
                errorMessage
                  ? "border-status-destructive ring-1 ring-status-destructive/20"
                  : "border-transparent focus:border-primary focus:bg-surface"
              )}
            >
              <option value="">-- Pilih Akun Fungsionaris (BPH / Staff) --</option>
              {users
                .filter((u) => u.role === "bph" || u.role === "staff")
                .map((user) => {
                  const hasRpt = reports.some(
                    (r) => r.user_id === user.id || r.user?.id === user.id
                  );
                  return (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.role.toUpperCase()}) -{" "}
                      {user.position || user.ministry || "Anggota"} [
                      {hasRpt ? "Sudah Ada Raport" : "Belum Dinilai"}]
                    </option>
                  );
                })}
            </select>
          )}

          {errorMessage && (
            <p className="text-xs text-status-destructive-text mt-1.5 font-medium">
              {errorMessage}
            </p>
          )}
        </div>

        {selectedUser && (
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 border border-primary-200/60 text-primary flex items-center justify-center font-bold font-headline text-sm shrink-0">
                {selectedUser.name
                  .split(" ")
                  .slice(0, 2)
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-neutral-900 text-sm">
                    {selectedUser.name}
                  </span>
                  <RoleBadge
                    variant={selectedUser.role === "bph" ? "bph" : "staff"}
                    size="sm"
                  >
                    {selectedUser.role === "bph" ? "BPH" : "Staff"}
                  </RoleBadge>
                </div>
                <p className="text-xs text-neutral-600">
                  {[selectedUser.position, selectedUser.ministry, selectedUser.email]
                    .filter(Boolean)
                    .join(" • ")}
                </p>
              </div>
            </div>

            <div className="sm:text-right">
              <span className="text-[11px] font-semibold text-neutral-500 block uppercase">
                Aspek Berlaku
              </span>
              <span className="text-xs font-semibold text-neutral-800 tabular-nums">
                {activeAspectsCount} Aspek Penilaian
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
