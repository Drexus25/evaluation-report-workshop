"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import RoleBadge from "@/components/ui/RoleBadge";
import Button, { buttonVariants } from "@/components/ui/Button";
import { User, ReportListItem } from "@/types";

interface UserDetailModalProps {
  detailTarget: User | null;
  selectedUser: User | null;
  userReport: ReportListItem | null;
  isDetailLoading: boolean;
  onClose: () => void;
  onEdit: (user: User) => void;
}

function formatCreatedAt(value?: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function UserDetailModal({
  detailTarget,
  selectedUser,
  userReport,
  isDetailLoading,
  onClose,
  onEdit,
}: UserDetailModalProps) {
  const shouldReduceMotion = useReducedMotion();

  const headerUser = selectedUser ?? detailTarget;
  const headerRoleVariant =
    headerUser?.role === "admin"
      ? "admin"
      : headerUser?.role === "bph"
      ? "bph"
      : "staff";
  const headerRoleLabel =
    headerUser?.role === "admin"
      ? "Admin"
      : headerUser?.role === "bph"
      ? "BPH"
      : "Staff";

  const initials = (headerUser?.name || "F")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

  const createdAtLabel = formatCreatedAt(selectedUser?.created_at);

  return (
    <AnimatePresence>
      {detailTarget && (
        <div
          className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-detail-modal-title"
            initial={
              shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 10 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.95, y: 10 }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.18,
              ease: "easeOut",
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface rounded-2xl border border-neutral-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-xl"
          >
            <div className="flex items-start justify-between pb-4 border-b border-neutral-200">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary-50 border border-primary-200/60 text-primary flex items-center justify-center font-bold font-headline text-sm shrink-0">
                  {initials}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3
                      id="user-detail-modal-title"
                      className="font-headline text-xl font-bold text-neutral-900"
                    >
                      {headerUser?.name || "Detail Fungsionaris"}
                    </h3>
                    {headerUser && (
                      <RoleBadge variant={headerRoleVariant} size="sm">
                        {headerRoleLabel}
                      </RoleBadge>
                    )}
                  </div>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    {headerUser?.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup detail fungsionaris"
                className="text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 p-1.5 rounded-lg cursor-pointer transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {isDetailLoading || !selectedUser ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
                <p className="text-xs text-neutral-600 font-medium">
                  Memuat profil lengkap fungsionaris dari server...
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 sm:col-span-2">
                    <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
                      ID Pengguna
                    </span>
                    <span className="font-mono text-neutral-800 mt-0.5 block break-all">
                      {selectedUser.id}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
                    <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
                      NIM
                    </span>
                    <span className="font-semibold text-neutral-900 mt-0.5 block tabular-nums">
                      {selectedUser.nim || "-"}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
                    <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
                      Jabatan
                    </span>
                    <span className="font-semibold text-neutral-900 mt-0.5 block">
                      {selectedUser.position || "-"}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
                    <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
                      Kementerian / Biro
                    </span>
                    <span className="font-semibold text-neutral-900 mt-0.5 block">
                      {selectedUser.ministry || "-"}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
                    <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
                      Departemen / Prodi
                    </span>
                    <span className="font-semibold text-neutral-900 mt-0.5 block">
                      {selectedUser.department || "-"}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
                    <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
                      Periode Kepengurusan
                    </span>
                    <span className="font-semibold text-neutral-900 mt-0.5 block">
                      {selectedUser.period || "-"}
                    </span>
                  </div>

                  {createdAtLabel && (
                    <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
                      <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
                        Terdaftar
                      </span>
                      <span className="font-semibold text-neutral-900 mt-0.5 block tabular-nums">
                        {createdAtLabel}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {selectedUser.role === "admin" ? (
                    <p className="text-xs text-neutral-600">
                      Akun Administrator tidak memiliki raport evaluasi kinerja fungsionaris.
                    </p>
                  ) : userReport ? (
                    <>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-neutral-800">
                            Status Evaluasi
                          </span>
                          <RoleBadge variant="verified" size="sm">
                            Raport Terbit
                          </RoleBadge>
                        </div>
                        <p className="text-xs text-neutral-600 tabular-nums">
                          Nilai rata-rata akhir (BE):{" "}
                          <strong className="text-primary font-headline">
                            {(Number(userReport.average_score) || 0).toFixed(2)}
                          </strong>{" "}
                          / 100
                        </p>
                      </div>

                      <Link
                        href="/admin/raport"
                        className={buttonVariants({
                          variant: "outline",
                          size: "sm",
                          className: "self-start sm:self-auto",
                        })}
                      >
                        Lihat Daftar Raport
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-neutral-800">
                            Status Evaluasi
                          </span>
                          <RoleBadge variant="draft" size="sm">
                            Belum Dinilai
                          </RoleBadge>
                        </div>
                        <p className="text-xs text-neutral-600">
                          Fungsionaris ini belum memiliki raport evaluasi aktif.
                        </p>
                      </div>

                      <Link
                        href="/admin/raport/create"
                        className={buttonVariants({
                          variant: "primary",
                          size: "sm",
                          className: "self-start sm:self-auto",
                        })}
                      >
                        Input Raport
                      </Link>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(selectedUser)}
                    className="rounded-full"
                  >
                    Ubah Data
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="border border-neutral-300"
                  >
                    Tutup Panel
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
