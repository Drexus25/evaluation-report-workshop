"use client";

import { useState, useCallback, useRef } from "react";
import {
  ReportListItem,
  RaportData,
  User,
  Aspect,
  CreateReportPayload,
  UpdateReportPayload,
} from "@/types";
import { adminApi, ApiError } from "@/libs/api";
import { useToast } from "@/context/ToastContext";

export function useAdminReports() {
  const { toast } = useToast();
  const [reports, setReports] = useState<ReportListItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [aspects, setAspects] = useState<Aspect[]>([]);
  const [selectedReport, setSelectedReport] = useState<RaportData | null>(null);
  const [selectedUserDetail, setSelectedUserDetail] = useState<User | null>(
    null
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);
  const [isUserDetailLoading, setIsUserDetailLoading] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);
  const userDetailRequestIdRef = useRef<number>(0);

  // Fetch daftar seluruh raport terbit
  const fetchReports = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await adminApi.getReports();
      setReports(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Gagal memuat daftar raport dari server.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch fungsionaris, master aspek, dan daftar raport untuk form create/edit
  const fetchFormPrerequisites = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [fetchedUsers, fetchedAspects, fetchedReports] = await Promise.all([
        adminApi.getUsers(),
        adminApi.getAspects(),
        adminApi.getReports(),
      ]);
      setUsers(Array.isArray(fetchedUsers) ? fetchedUsers : []);
      setAspects(Array.isArray(fetchedAspects) ? fetchedAspects : []);
      setReports(Array.isArray(fetchedReports) ? fetchedReports : []);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Gagal memuat data prasyarat formulir dari server.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch seluruh data ringkasan untuk dashboard admin secara paralel
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [fetchedReports, fetchedUsers, fetchedAspects] = await Promise.all([
        adminApi.getReports(),
        adminApi.getUsers(),
        adminApi.getAspects(),
      ]);
      setReports(Array.isArray(fetchedReports) ? fetchedReports : []);
      setUsers(Array.isArray(fetchedUsers) ? fetchedUsers : []);
      setAspects(Array.isArray(fetchedAspects) ? fetchedAspects : []);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Gagal memuat data dashboard dari server.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch detail satu raport (menggunakan isDetailLoading agar tabel tetap terlihat)
  const fetchReportDetail = useCallback(
    async (id: string) => {
      setIsDetailLoading(true);
      try {
        const detail = await adminApi.getReportDetail(id);
        setSelectedReport(detail);
        return detail;
      } catch (err) {
        if (err instanceof ApiError) {
          toast.error(err.message, "Gagal Membuka Detail Raport");
        } else {
          toast.error(
            "Terjadi kegagalan saat memuat detail raport.",
            "Gagal Membuka Detail Raport"
          );
        }
        return null;
      } finally {
        setIsDetailLoading(false);
      }
    },
    [toast]
  );

  // Fetch detail satu fungsionaris (GET /api/v1/admin/users/:id)
  const fetchUserDetail = useCallback(
    async (id: string): Promise<User | null> => {
      userDetailRequestIdRef.current += 1;
      const requestId = userDetailRequestIdRef.current;

      setIsUserDetailLoading(true);
      try {
        const detail = await adminApi.getUserDetail(id);
        if (requestId !== userDetailRequestIdRef.current) {
          return null;
        }
        setSelectedUserDetail(detail);
        return detail;
      } catch (err) {
        if (requestId === userDetailRequestIdRef.current) {
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
        if (requestId === userDetailRequestIdRef.current) {
          setIsUserDetailLoading(false);
        }
      }
    },
    [toast]
  );

  // Buat raport baru (POST /api/v1/admin/reports)
  const createReport = useCallback(
    async (payload: CreateReportPayload): Promise<RaportData> => {
      setIsSubmitting(true);
      setDuplicateWarning(null);
      setError(null);

      try {
        const created = await adminApi.createReport(payload);
        toast.success(
          `Raport untuk ${created.name || "fungsionaris"} berhasil diterbitkan.`
        );
        await fetchReports();
        return created;
      } catch (err) {
        if (err instanceof ApiError) {
          if (err.isDuplicate || err.status === 409) {
            const warningMsg =
              "Fungsionaris ini sudah memiliki raport aktif. Silakan lakukan pembaruan data pada daftar raport.";
            setDuplicateWarning(warningMsg);
            toast.warning(warningMsg, "Raport Duplikat (409)");
          } else {
            setError(err.message);
            toast.error(err.message, "Gagal Menerbitkan Raport");
          }
        } else {
          toast.error("Terjadi kegagalan jaringan saat mengirim raport.");
        }
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [fetchReports, toast]
  );

  // Perbarui raport (PUT /api/v1/admin/reports/:id)
  const updateReport = useCallback(
    async (id: string, payload: UpdateReportPayload): Promise<RaportData> => {
      setIsSubmitting(true);
      setError(null);
      try {
        const updated = await adminApi.updateReport(id, payload);
        toast.success("Raport berhasil diperbarui.");
        await fetchReports();
        if (selectedReport?.id === id) {
          setSelectedReport(updated);
        }
        return updated;
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
          toast.error(err.message, "Gagal Memperbarui Raport");
        } else {
          toast.error("Terjadi kesalahan jaringan.");
        }
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [fetchReports, selectedReport, toast]
  );

  // Hapus raport (DELETE /api/v1/admin/reports/:id)
  const deleteReport = useCallback(
    async (id: string) => {
      setIsDeleting(true);
      setError(null);
      try {
        await adminApi.deleteReport(id);
        toast.success("Raport fungsionaris berhasil dihapus.");
        setReports((prev) => prev.filter((r) => r.id !== id));
        if (selectedReport?.id === id) setSelectedReport(null);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
          toast.error(err.message, "Gagal Menghapus Raport");
        } else {
          toast.error("Terjadi kesalahan jaringan.");
        }
        throw err;
      } finally {
        setIsDeleting(false);
      }
    },
    [selectedReport, toast]
  );

  return {
    reports,
    users,
    aspects,
    selectedReport,
    setSelectedReport,
    selectedUserDetail,
    setSelectedUserDetail,
    isLoading,
    isDetailLoading,
    isUserDetailLoading,
    isSubmitting,
    isDeleting,
    error,
    duplicateWarning,
    setDuplicateWarning,
    fetchReports,
    fetchFormPrerequisites,
    fetchDashboardData,
    fetchReportDetail,
    fetchUserDetail,
    createReport,
    updateReport,
    deleteReport,
  };
}
