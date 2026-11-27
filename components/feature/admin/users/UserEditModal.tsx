"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AlertCircle, Loader2, X } from "lucide-react";
import { User, UpdateUserPayload } from "@/types";
import { updateUserSchema, UpdateUserFormValues } from "@/schemas/userSchema";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import RoleBadge from "@/components/ui/RoleBadge";

interface UserEditModalProps {
  isOpen: boolean;
  editingUser: User | null;
  isDetailLoading?: boolean;
  isSubmitting: boolean;
  fieldErrors: Record<string, string>;
  onClose: () => void;
  onSubmit: (userId: string, payload: UpdateUserPayload) => Promise<void>;
}

export default function UserEditModal({
  isOpen,
  editingUser,
  isDetailLoading = false,
  isSubmitting,
  fieldErrors,
  onClose,
  onSubmit,
}: UserEditModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const [noChangeNotice, setNoChangeNotice] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: "",
      role: "staff",
      position: "",
      ministry: "",
    },
  });

  useEffect(() => {
    if (!isOpen || isDetailLoading) return;
    reset({
      name: editingUser?.name ?? "",
      role: editingUser?.role ?? "staff",
      position: editingUser?.position ?? "",
      ministry: editingUser?.ministry ?? "",
    });
  }, [isOpen, isDetailLoading, editingUser, reset]);

  const handleClose = () => {
    if (isSubmitting || isDetailLoading) return;
    setNoChangeNotice(null);
    onClose();
  };

  const handleFormSubmit = async (data: UpdateUserFormValues) => {
    if (!editingUser) return;

    const payload: UpdateUserPayload = {};
    const trimmedName = data.name.trim();
    const initialName = (editingUser.name ?? "").trim();
    if (trimmedName !== initialName) {
      payload.name = trimmedName;
    }

    if (data.role !== editingUser.role) {
      payload.role = data.role;
    }

    const trimmedPosition = data.position.trim();
    const initialPosition = (editingUser.position ?? "").trim();
    if (trimmedPosition !== initialPosition) {
      payload.position = trimmedPosition;
    }

    const trimmedMinistry = data.ministry.trim();
    const initialMinistry = (editingUser.ministry ?? "").trim();
    if (trimmedMinistry !== initialMinistry) {
      payload.ministry = trimmedMinistry;
    }

    if (Object.keys(payload).length === 0) {
      setNoChangeNotice(
        "Belum ada perubahan data yang dilakukan. Ubah minimal satu field sebelum menyimpan."
      );
      return;
    }

    setNoChangeNotice(null);
    await onSubmit(editingUser.id, payload);
  };

  const roleBadgeVariant =
    editingUser?.role === "admin"
      ? "admin"
      : editingUser?.role === "bph"
      ? "bph"
      : "staff";
  const roleLabel =
    editingUser?.role === "admin"
      ? "Admin"
      : editingUser?.role === "bph"
      ? "BPH"
      : "Staff";

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-edit-modal-title"
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
            className="bg-surface rounded-2xl border border-neutral-200 max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-xl"
          >
            <div className="flex items-start justify-between pb-3 border-b border-neutral-200">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    id="user-edit-modal-title"
                    className="font-headline text-lg font-bold text-neutral-900"
                  >
                    Ubah Data Pengguna
                  </h3>
                  {editingUser && (
                    <RoleBadge variant={roleBadgeVariant} size="sm">
                      {roleLabel}
                    </RoleBadge>
                  )}
                </div>
                {editingUser?.email && (
                  <p className="text-xs text-neutral-600 mt-0.5">
                    {editingUser.email}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting || isDetailLoading}
                aria-label="Tutup modal ubah data pengguna"
                className="text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 p-1.5 rounded-lg cursor-pointer transition-colors duration-150 ease-out disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {isDetailLoading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
                <p className="text-xs text-neutral-600 font-medium">
                  Mengambil data fungsionaris terbaru dari server...
                </p>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit(handleFormSubmit)}
                onChange={() => {
                  if (noChangeNotice) setNoChangeNotice(null);
                }}
                className="space-y-4"
              >
                {noChangeNotice && (
                  <div
                    role="status"
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-status-warning-bg text-status-warning-text border border-status-warning/25 text-xs"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{noChangeNotice}</span>
                  </div>
                )}

                <Input
                  {...register("name")}
                  label="Nama Lengkap"
                  maxLength={255}
                  placeholder="Contoh: Rosy Fredycia Bagaskara"
                  error={errors.name?.message || fieldErrors.name}
                  disabled={isSubmitting}
                />

                <div className="flex flex-col gap-1.5 font-sans">
                  <label
                    htmlFor="user-edit-role"
                    className="text-xs font-bold text-neutral-800"
                  >
                    Peran Pengguna (Role)
                  </label>
                  <select
                    id="user-edit-role"
                    {...register("role")}
                    disabled={isSubmitting}
                    className="w-full bg-neutral-100 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary focus:bg-surface cursor-pointer transition-colors duration-150 ease-out"
                  >
                    <option value="admin">Administrator (Admin)</option>
                    <option value="bph">BPH</option>
                    <option value="staff">Staff</option>
                  </select>
                  {(errors.role?.message || fieldErrors.role) && (
                    <p className="text-[11px] text-status-destructive-text font-medium">
                      {errors.role?.message || fieldErrors.role}
                    </p>
                  )}
                </div>

                <Input
                  {...register("position")}
                  label="Jabatan (Opsional)"
                  maxLength={255}
                  placeholder="Contoh: Kepala Biro"
                  helperText="Kosongkan untuk menghapus jabatan."
                  error={errors.position?.message || fieldErrors.position}
                  disabled={isSubmitting}
                />

                <Input
                  {...register("ministry")}
                  label="Kementerian / Biro (Opsional)"
                  maxLength={255}
                  placeholder="Contoh: PSDM"
                  helperText="Kosongkan untuk menghapus kementerian/biro."
                  error={errors.ministry?.message || fieldErrors.ministry}
                  disabled={isSubmitting}
                />

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="rounded-full border-neutral-300 text-neutral-700"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={isSubmitting}
                    className="rounded-full"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-1.5">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Menyimpan...
                      </span>
                    ) : (
                      "Simpan Perubahan"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
