"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import RoleBadge from "@/components/ui/RoleBadge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Aspect } from "@/types";
import { aspectSchema, AspectFormValues } from "@/schemas/aspekSchema";
import { dummyAllAspects } from "@/data/dummyRaport";

const USED_ASPECT_IDS = new Set([
  "11111111-1111-1111-1111-111111111101",
  "11111111-1111-1111-1111-111111111102",
  "11111111-1111-1111-1111-111111111103",
  "22222222-2222-2222-2222-222222222201",
  "22222222-2222-2222-2222-222222222202",
]);

export default function AdminAspekContainer() {
  const [aspects, setAspects] = useState<Aspect[]>(dummyAllAspects);
  const [filterRole, setFilterRole] = useState<"all" | "bph" | "staff" | "both">("all");
  const [editingAspect, setEditingAspect] = useState<Aspect | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AspectFormValues>({
    resolver: zodResolver(aspectSchema),
    defaultValues: {
      name: "",
      description: "",
      role_type: "both",
    },
  });

  const filteredAspects = aspects.filter((item) => {
    if (filterRole === "all") return true;
    if (filterRole === "both") return item.role_type === "both";
    return item.role_type === filterRole || item.role_type === "both";
  });

  const openCreateModal = () => {
    setEditingAspect(null);
    reset({
      name: "",
      description: "",
      role_type: "both",
    });
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (aspect: Aspect) => {
    setEditingAspect(aspect);
    setValue("name", aspect.name);
    setValue("description", aspect.description || "");
    setValue("role_type", aspect.role_type);
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAspect(null);
    setErrorMessage(null);
  };

  const onSubmit = (data: AspectFormValues) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (editingAspect) {
      if (
        USED_ASPECT_IDS.has(editingAspect.id) &&
        editingAspect.role_type !== data.role_type
      ) {
        setErrorMessage(
          `Gagal mengubah aspek: Aspek "${editingAspect.name}" sudah digunakan dalam raport fungsionaris aktif. Role target tidak dapat diubah.`
        );
        return;
      }

      setAspects((prev) =>
        prev.map((item) =>
          item.id === editingAspect.id
            ? {
                ...item,
                name: data.name,
                description: data.description,
                role_type: data.role_type,
                updated_at: new Date().toISOString(),
              }
            : item
        )
      );
      setSuccessMessage(`Aspek "${data.name}" berhasil diperbarui.`);
    } else {
      const nextId = `asp_${aspects.length + 1}_${data.role_type}`;
      const newAspect: Aspect = {
        id: nextId,
        name: data.name,
        description: data.description,
        role_type: data.role_type,
        created_at: new Date().toISOString(),
      };
      setAspects((prev) => [newAspect, ...prev]);
      setSuccessMessage(`Aspek baru "${data.name}" berhasil ditambahkan.`);
    }

    closeModal();
  };

  const handleDeleteAspect = (id: string) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (USED_ASPECT_IDS.has(id)) {
      const target = aspects.find((a) => a.id === id);
      setErrorMessage(
        `Aspek "${target?.name || id}" sudah digunakan dalam data raport aktif sehingga tidak dapat dihapus.`
      );
      setConfirmDeleteId(null);
      return;
    }

    const target = aspects.find((a) => a.id === id);
    setAspects((prev) => prev.filter((a) => a.id !== id));
    setSuccessMessage(`Aspek "${target?.name || id}" berhasil dihapus.`);
    setConfirmDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200">
        <div>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Kelola Aspek Penilaian
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            Rubrik evaluasi performa fungsionaris untuk BPH, Staff, maupun keduanya.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={openCreateModal}
          className="rounded-full"
        >
          + Tambah Aspek Baru
        </Button>
      </div>

      {errorMessage && (
        <div className="flex items-start justify-between gap-3 p-4 rounded-xl bg-status-destructive-bg/30 border border-status-destructive/30 text-status-destructive text-sm">
          <div className="flex items-start gap-2">
            <svg
              className="w-5 h-5 shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="font-semibold text-status-destructive-text">
                Peringatan Validasi Aspek
              </p>
              <p className="text-xs text-status-destructive-text mt-0.5 leading-relaxed">
                {errorMessage}
              </p>
            </div>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-neutral-400 hover:text-neutral-700 cursor-pointer text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {successMessage && (
        <div className="flex items-start justify-between gap-3 p-4 rounded-xl bg-status-success-bg/40 border border-status-success/30 text-status-success-text text-sm">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{successMessage}</span>
          </div>
          <button
            onClick={() => setSuccessMessage(null)}
            className="text-neutral-400 hover:text-neutral-700 cursor-pointer text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 bg-surface p-1.5 rounded-xl border border-neutral-200 w-fit flex-wrap">
        <button
          type="button"
          onClick={() => setFilterRole("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            filterRole === "all"
              ? "bg-primary text-surface font-bold shadow-xs"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
        >
          Semua Aspek ({aspects.length})
        </button>
        <button
          type="button"
          onClick={() => setFilterRole("bph")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            filterRole === "bph"
              ? "bg-primary text-surface font-bold shadow-xs"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
        >
          BPH ({aspects.filter((a) => a.role_type === "bph" || a.role_type === "both").length})
        </button>
        <button
          type="button"
          onClick={() => setFilterRole("staff")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            filterRole === "staff"
              ? "bg-primary text-surface font-bold shadow-xs"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
        >
          Staff ({aspects.filter((a) => a.role_type === "staff" || a.role_type === "both").length})
        </button>
        <button
          type="button"
          onClick={() => setFilterRole("both")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            filterRole === "both"
              ? "bg-primary text-surface font-bold shadow-xs"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
        >
          Keduanya ({aspects.filter((a) => a.role_type === "both").length})
        </button>
      </div>

      <Card variant="default" padding="none" className="border-neutral-200 overflow-hidden">
        <CardHeader bordered className="px-6 py-4 bg-surface">
          <div>
            <CardTitle className="text-base sm:text-lg">
              Daftar Aspek Penilaian Aktif
            </CardTitle>
            <p className="text-xs text-neutral-500 mt-0.5">
              Rubrik evaluasi yang digunakan pada formulir penilaian fungsionaris
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-0 space-y-0 divide-y divide-neutral-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 text-neutral-500 uppercase font-semibold border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-3.5">Nama Aspek &amp; Keterangan</th>
                  <th className="px-6 py-3.5">Role Berlaku</th>
                  <th className="px-6 py-3.5">Status Penggunaan</th>
                  <th className="px-6 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredAspects.map((aspect) => {
                  const isUsed = USED_ASPECT_IDS.has(aspect.id);

                  return (
                    <tr
                      key={aspect.id}
                      className="hover:bg-neutral-50/70 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-neutral-900 text-sm">
                          {aspect.name}
                        </p>
                        <p className="text-neutral-500 text-xs mt-0.5 max-w-lg">
                          {aspect.description || "Tidak ada deskripsi tambahan"}
                        </p>
                        <span className="font-mono text-[10px] text-neutral-400 mt-1 block">
                          ID: {aspect.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {aspect.role_type === "both" ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary border border-primary-200/50">
                            BPH &amp; Staff
                          </span>
                        ) : aspect.role_type === "bph" ? (
                          <RoleBadge variant="bph" size="sm">
                            BPH
                          </RoleBadge>
                        ) : (
                          <RoleBadge variant="staff" size="sm">
                            Staff
                          </RoleBadge>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {isUsed ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-100 text-neutral-700 border border-neutral-200">
                            Terkunci (Terpakai di Raport)
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-status-success-bg/50 text-status-success-text">
                            Bebas Dihapus
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => openEditModal(aspect)}
                            className="rounded-full text-xs"
                          >
                            Ubah
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setConfirmDeleteId(aspect.id)}
                            className="rounded-full text-xs border-status-destructive/30 text-status-destructive hover:bg-status-destructive-bg/20"
                          >
                            Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredAspects.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-neutral-500 text-sm italic"
                    >
                      Tidak ada aspek penilaian untuk kategori ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl border border-neutral-200 max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <h3 className="font-headline text-lg font-bold text-neutral-900">
                {editingAspect ? "Ubah Aspek Penilaian" : "Tambah Aspek Baru"}
              </h3>
              <button
                onClick={closeModal}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <Input
                {...register("name")}
                label="Nama Aspek Penilaian"
                placeholder="Contoh: Tanggung Jawab & Integritas"
                required
                error={errors.name?.message}
              />

              <div className="w-full flex flex-col font-sans">
                <label className="text-sm font-bold text-neutral-900 mb-2">
                  Role Target <span className="text-status-destructive">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <label
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition-colors text-center ${
                      errors.role_type ? "border-status-destructive" : "border-neutral-200"
                    } hover:bg-neutral-50`}
                  >
                    <input
                      type="radio"
                      value="both"
                      {...register("role_type")}
                      className="text-primary focus:ring-primary mb-1"
                    />
                    <span className="text-xs font-semibold text-neutral-800">
                      Keduanya
                    </span>
                    <span className="text-[10px] text-neutral-400">BPH &amp; Staff</span>
                  </label>
                  <label
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition-colors text-center ${
                      errors.role_type ? "border-status-destructive" : "border-neutral-200"
                    } hover:bg-neutral-50`}
                  >
                    <input
                      type="radio"
                      value="bph"
                      {...register("role_type")}
                      className="text-primary focus:ring-primary mb-1"
                    />
                    <span className="text-xs font-semibold text-neutral-800">
                      BPH
                    </span>
                    <span className="text-[10px] text-neutral-400">Khusus BPH</span>
                  </label>
                  <label
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition-colors text-center ${
                      errors.role_type ? "border-status-destructive" : "border-neutral-200"
                    } hover:bg-neutral-50`}
                  >
                    <input
                      type="radio"
                      value="staff"
                      {...register("role_type")}
                      className="text-primary focus:ring-primary mb-1"
                    />
                    <span className="text-xs font-semibold text-neutral-800">
                      Staff
                    </span>
                    <span className="text-[10px] text-neutral-400">Khusus Staff</span>
                  </label>
                </div>
                {errors.role_type && (
                  <p className="text-xs text-status-destructive mt-1.5 font-medium">
                    {errors.role_type.message}
                  </p>
                )}
              </div>

              <div className="w-full flex flex-col font-sans">
                <label className="text-sm font-bold text-neutral-900 mb-2">
                  Deskripsi / Rubrik Penilaian (Opsional)
                </label>
                <textarea
                  {...register("description")}
                  rows={3}
                  placeholder="Keterangan singkat kriteria penilaian aspek ini..."
                  className="w-full rounded-xl bg-neutral-100 border border-transparent focus:border-primary focus:bg-surface py-3 px-4 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={closeModal}
                  className="rounded-full border-neutral-300 text-neutral-700!"
                >
                  Batal
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full"
                >
                  {editingAspect ? "Simpan Perubahan" : "Simpan Aspek"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl border border-neutral-200 max-w-sm w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="font-headline text-lg font-bold text-neutral-900">
              Konfirmasi Hapus Aspek
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Apakah Anda yakin ingin menghapus aspek penilaian ini?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setConfirmDeleteId(null)}
                className="rounded-full border-neutral-300 text-neutral-700!"
              >
                Batal
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleDeleteAspect(confirmDeleteId)}
                className="rounded-full bg-status-destructive hover:bg-status-destructive-text"
              >
                Hapus Aspek
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
