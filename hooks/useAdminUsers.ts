"use client";

import { useState, useCallback, useRef } from "react";
import { User, ReportListItem, UpdateUserPayload } from "@/types";
import { adminApi, ApiError } from "@/libs/api";
import { authStorage } from "@/libs/auth";
import { useToast } from "@/context/ToastContext";

export function useAdminUsers() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [reports, setReports] = useState<ReportListItem[]>([]);
  const [selectedUserDetail, setSelectedUserDetail] = useState<User | null>(
    null
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const detailRequestIdRef = useRef<number>(0);

  const clearFieldErrors = useCallback(() => {
    setFieldErrors({});
  }, []);

  const fetchUsersAndReports = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [fetchedUsers, fetchedReports] = await Promise.all([
        adminApi.getUsers(),
        adminApi.getReports(),
      ]);
      setUsers(Array.isArray(fetchedUsers) ? fetchedUsers : []);
      setReports(Array.isArray(fetchedReports) ? fetchedReports : []);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Gagal memuat daftar fungsionaris dari server.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchUserDetail = useCallback(
    async (id: string): Promise<User | null> => {
      detailRequestIdRef.current += 1;
      const requestId = detailRequestIdRef.current;

      setIsDetailLoading(true);
      try {
        const detail = await adminApi.getUserDetail(id);
        if (requestId !== detailRequestIdRef.current) {
          return null;
        }
        setSelectedUserDetail(detail);
        return detail;
      } catch (err) {
        if (requestId === detailRequestIdRef.current) {
          if (err instanceof ApiError) {
            toast.error(err.message, "Gagal Memuat Detail Fungsionaris");
          } else {
            toast.error(
              "Terjadi kegagalan saat memuat detail fungsionaris.",
              "Gagal Memuat Detail Fungsionaris"
            );
          }
        }
        return null;
      } finally {
        if (requestId === detailRequestIdRef.current) {
          setIsDetailLoading(false);
        }
      }
    },
    [toast]
  );

  const updateUser = useCallback(
    async (id: string, payload: UpdateUserPayload): Promise<User> => {
      setIsSubmitting(true);
      setFieldErrors({});
      setError(null);
      try {
        const updated = await adminApi.updateUser(id, payload);
        setSelectedUserDetail((prev) =>
          prev && prev.id === id ? { ...prev, ...updated } : prev
        );
        const currentAuthUser = authStorage.getUser();
        if (currentAuthUser && currentAuthUser.id === id) {
          authStorage.setUser({ ...currentAuthUser, ...updated });
        }
        toast.success(`Data pengguna "${updated.name}" berhasil diperbarui.`);
        await fetchUsersAndReports();
        return updated;
      } catch (err) {
        if (err instanceof ApiError) {
          if (err.errors) {
            const map: Record<string, string> = {};
            err.errors.forEach((e) => {
              map[e.field] = e.message;
            });
            setFieldErrors(map);
          }
          toast.error(err.message, "Gagal Memperbarui Pengguna");
        } else {
          toast.error(
            "Terjadi kegagalan saat menghubungi server.",
            "Gagal Memperbarui Pengguna"
          );
        }
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [fetchUsersAndReports, toast]
  );

  return {
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
  };
}
