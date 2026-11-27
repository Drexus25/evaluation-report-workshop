"use client";

import React, { useState, useEffect, useMemo } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { User, UpdateUserPayload } from "@/types";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import UsersListTable from "./UsersListTable";
import UserDetailModal from "./UserDetailModal";
import UserEditModal from "./UserEditModal";

export default function AdminUsersContainer() {
  const {
    users,
    reports,
    selectedUserDetail,
    setSelectedUserDetail,
    isLoading,
    isDetailLoading,
    isSubmitting,
    error,
    fieldErrors,
    clearFieldErrors,
    fetchUsersAndReports,
    fetchUserDetail,
    updateUser,
  } = useAdminUsers();

  const [detailTarget, setDetailTarget] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchUsersAndReports();
  }, [fetchUsersAndReports]);

  useEffect(() => {
    if (!detailTarget && !isEditModalOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (isEditModalOpen && !isSubmitting && !isDetailLoading) {
        clearFieldErrors();
        setIsEditModalOpen(false);
        setEditingUser(null);
        return;
      }
      if (detailTarget) {
        setDetailTarget(null);
        setSelectedUserDetail(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    detailTarget,
    isEditModalOpen,
    isSubmitting,
    isDetailLoading,
    clearFieldErrors,
    setSelectedUserDetail,
  ]);

  const handleOpenDetail = async (user: User) => {
    setDetailTarget(user);
    setSelectedUserDetail(null);
    const detail = await fetchUserDetail(user.id);
    if (!detail) setDetailTarget(null);
  };

  const closeDetailModal = () => {
    setDetailTarget(null);
    setSelectedUserDetail(null);
  };

  const handleOpenEdit = async (user: User) => {
    clearFieldErrors();
    setEditingUser(user);
    setIsEditModalOpen(true);
    const detail = await fetchUserDetail(user.id);
    if (detail) {
      setEditingUser(detail);
    } else {
      setIsEditModalOpen(false);
      setEditingUser(null);
    }
  };

  const handleOpenEditFromDetail = (user: User) => {
    closeDetailModal();
    clearFieldErrors();
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    if (isSubmitting || isDetailLoading) return;
    clearFieldErrors();
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const handleSaveEdit = async (
    userId: string,
    payload: UpdateUserPayload
  ) => {
    try {
      await updateUser(userId, payload);
      clearFieldErrors();
      setIsEditModalOpen(false);
      setEditingUser(null);
    } catch {
      // Error ditangani di dalam hook useAdminUsers
    }
  };

  const activeUserReport = useMemo(() => {
    if (!detailTarget) return null;
    return (
      reports.find(
        (r) => r.user_id === detailTarget.id || r.user?.id === detailTarget.id
      ) ?? null
    );
  }, [detailTarget, reports]);

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-neutral-200">
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
          Data Fungsionaris
        </h1>
        <p className="text-sm text-neutral-600 mt-1">
          Daftar akun fungsionaris BPH dan Staff beserta detail profil dan status evaluasi raport.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start justify-between gap-3 p-4 rounded-xl bg-status-destructive-bg/30 border border-status-destructive/30 text-status-destructive text-sm"
        >
          <div className="flex items-start gap-2">
            <AlertCircle
              className="w-5 h-5 shrink-0 mt-0.5 text-status-destructive"
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold text-status-destructive-text">
                Gagal Memuat Daftar Fungsionaris
              </p>
              <p className="text-xs text-status-destructive-text mt-0.5 leading-relaxed">
                {error}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => fetchUsersAndReports()}
            className="text-neutral-700 hover:text-neutral-900 cursor-pointer text-xs font-semibold flex items-center gap-1 shrink-0 rounded-lg px-2 py-1 transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <RefreshCw size={13} aria-hidden="true" />
            <span>Muat Ulang</span>
          </button>
        </div>
      )}

      <UsersListTable
        users={users}
        reports={reports}
        isLoading={isLoading}
        onOpenDetail={handleOpenDetail}
        onOpenEdit={handleOpenEdit}
      />

      <UserDetailModal
        detailTarget={detailTarget}
        selectedUser={selectedUserDetail}
        userReport={activeUserReport}
        isDetailLoading={isDetailLoading}
        onClose={closeDetailModal}
        onEdit={handleOpenEditFromDetail}
      />

      <UserEditModal
        isOpen={isEditModalOpen}
        editingUser={editingUser}
        isDetailLoading={isDetailLoading}
        isSubmitting={isSubmitting}
        fieldErrors={fieldErrors}
        onClose={closeEditModal}
        onSubmit={handleSaveEdit}
      />
    </div>
  );
}
