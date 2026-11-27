"use client";

import React, { useState, useEffect } from "react";
import { Plus, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/libs/cn";
import Button from "@/components/ui/Button";
import { Aspect } from "@/types";
import { AspectFormValues } from "@/schemas/aspekSchema";
import { useAspects } from "@/hooks/useAspects";
import AspectTable from "./AspectTable";
import AspectDetailModal from "./AspectDetailModal";
import AspectFormModal from "./AspectFormModal";
import AspectDeleteModal from "./AspectDeleteModal";

export default function AdminAspekContainer() {
  const {
    aspects,
    selectedAspect,
    setSelectedAspect,
    isLoading,
    isDetailLoading,
    isSubmitting,
    error,
    fieldErrors,
    clearFieldErrors,
    fetchAspects,
    fetchAspectDetail,
    createAspect,
    updateAspect,
    deleteAspect,
  } = useAspects();

  const [filterRole, setFilterRole] = useState<"all" | "bph" | "staff">("all");
  const [detailTargetAspect, setDetailTargetAspect] = useState<Aspect | null>(null);
  const [editingAspect, setEditingAspect] = useState<Aspect | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTargetAspect, setDeleteTargetAspect] = useState<Aspect | null>(null);

  useEffect(() => {
    if (!isModalOpen && !deleteTargetAspect && !detailTargetAspect) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (deleteTargetAspect && !isSubmitting) {
        setDeleteTargetAspect(null);
        return;
      }
      if (isModalOpen && !isSubmitting && !isDetailLoading) {
        clearFieldErrors();
        setIsModalOpen(false);
        setEditingAspect(null);
        return;
      }
      if (detailTargetAspect) {
        setDetailTargetAspect(null);
        setSelectedAspect(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isModalOpen,
    deleteTargetAspect,
    detailTargetAspect,
    isSubmitting,
    isDetailLoading,
    clearFieldErrors,
    setSelectedAspect,
  ]);

  const filteredAspects = aspects.filter((item) =>
    filterRole === "all" ? true : item.role_type === filterRole
  );

  const openDetailModal = async (aspect: Aspect) => {
    setDetailTargetAspect(aspect);
    setSelectedAspect(null);
    const detail = await fetchAspectDetail(aspect.id);
    if (!detail) setDetailTargetAspect(null);
  };

  const closeDetailModal = () => {
    setDetailTargetAspect(null);
    setSelectedAspect(null);
  };

  const openCreateModal = () => {
    clearFieldErrors();
    setEditingAspect(null);
    setIsModalOpen(true);
  };

  const openEditModal = async (aspect: Aspect) => {
    clearFieldErrors();
    setEditingAspect(aspect);
    setIsModalOpen(true);
    const detail = await fetchAspectDetail(aspect.id);
    if (detail) {
      setEditingAspect(detail);
    } else {
      setIsModalOpen(false);
      setEditingAspect(null);
    }
  };

  const openEditFromDetail = (aspect: Aspect) => {
    closeDetailModal();
    clearFieldErrors();
    setEditingAspect(aspect);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting || isDetailLoading) return;
    clearFieldErrors();
    setIsModalOpen(false);
    setEditingAspect(null);
  };

  const closeDeleteModal = () => {
    if (!isSubmitting) setDeleteTargetAspect(null);
  };

  const handleFormSubmit = async (data: AspectFormValues) => {
    try {
      if (editingAspect) {
        await updateAspect(editingAspect.id, data);
      } else {
        await createAspect(data);
      }
      closeModal();
    } catch {
      // Error ditangani di dalam hook useAspects
    }
  };

  const handleDeleteAspect = async () => {
    if (!deleteTargetAspect) return;
    try {
      await deleteAspect(deleteTargetAspect.id);
      setDeleteTargetAspect(null);
    } catch {
      // Error ditangani hook
    }
  };

  const bphCount = aspects.filter((a) => a.role_type === "bph").length;
  const staffCount = aspects.filter((a) => a.role_type === "staff").length;
  const filterTabs: Array<{ key: "all" | "bph" | "staff"; label: string; count: number }> = [
    { key: "all", label: "Semua Aspek", count: aspects.length },
    { key: "bph", label: "BPH", count: bphCount },
    { key: "staff", label: "Staff", count: staffCount },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200">
        <div>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Kelola Aspek Penilaian
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            Rubrik evaluasi performa fungsionaris untuk role BPH dan Staff.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={openCreateModal}
          className="rounded-full self-start sm:self-auto"
          leftIcon={<Plus size={16} aria-hidden="true" />}
        >
          Tambah Aspek Baru
        </Button>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start justify-between gap-3 p-4 rounded-xl bg-status-destructive-bg/30 border border-status-destructive/30 text-status-destructive text-sm"
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-status-destructive" aria-hidden="true" />
            <div>
              <p className="font-semibold text-status-destructive-text">Gagal Memuat Data Aspek</p>
              <p className="text-xs text-status-destructive-text mt-0.5 leading-relaxed">{error}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => fetchAspects()}
            className="text-neutral-700 hover:text-neutral-900 cursor-pointer text-xs font-semibold flex items-center gap-1 shrink-0 rounded-lg px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <RefreshCw size={13} aria-hidden="true" />
            <span>Muat Ulang</span>
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 bg-surface p-1.5 rounded-xl border border-neutral-200 w-fit flex-wrap">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilterRole(tab.key)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-150 ease-out cursor-pointer tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              filterRole === tab.key
                ? "bg-primary text-surface font-bold shadow-xs"
                : "text-neutral-600 hover:text-neutral-900"
            )}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <AspectTable
        aspects={filteredAspects}
        isLoading={isLoading}
        onViewDetail={openDetailModal}
        onEdit={openEditModal}
        onDelete={setDeleteTargetAspect}
      />

      <AspectDetailModal
        detailTarget={detailTargetAspect}
        selectedAspect={selectedAspect}
        isDetailLoading={isDetailLoading}
        onClose={closeDetailModal}
        onEdit={openEditFromDetail}
      />

      <AspectFormModal
        isOpen={isModalOpen}
        editingAspect={editingAspect}
        isDetailLoading={isDetailLoading}
        isSubmitting={isSubmitting}
        fieldErrors={fieldErrors}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
      />

      <AspectDeleteModal
        isOpen={Boolean(deleteTargetAspect)}
        targetAspect={deleteTargetAspect}
        isSubmitting={isSubmitting}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteAspect}
      />
    </div>
  );
}
