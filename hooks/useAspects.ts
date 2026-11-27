"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Aspect, AspectRoleType, AspectPayload } from "@/types";
import { adminApi, ApiError } from "@/libs/api";
import { useToast } from "@/context/ToastContext";

export function useAspects(initialFilterRole: AspectRoleType | "all" = "all") {
  const { toast } = useToast();
  const [aspects, setAspects] = useState<Aspect[]>([]);
  const [selectedAspect, setSelectedAspect] = useState<Aspect | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const activeRoleFilterRef = useRef<AspectRoleType | "all">(initialFilterRole);
  const detailRequestIdRef = useRef<number>(0);

  const clearFieldErrors = useCallback(() => {
    setFieldErrors({});
  }, []);

  const fetchAspects = useCallback(
    async (roleType?: AspectRoleType | "all") => {
      const targetFilter = roleType ?? activeRoleFilterRef.current;
      activeRoleFilterRef.current = targetFilter;

      setIsLoading(true);
      setError(null);
      try {
        const queryRole = targetFilter !== "all" ? targetFilter : undefined;
        const data = await adminApi.getAspects(queryRole);
        setAspects(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("Gagal memuat aspek penilaian dari server.");
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    let ignore = false;
    activeRoleFilterRef.current = initialFilterRole;

    async function init() {
      setIsLoading(true);
      setError(null);
      const queryRole =
        initialFilterRole !== "all" ? initialFilterRole : undefined;

      try {
        const data = await adminApi.getAspects(queryRole);
        if (!ignore) {
          setAspects(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!ignore) {
          if (err instanceof ApiError) {
            setError(err.message);
          } else {
            setError("Gagal memuat aspek penilaian dari server.");
          }
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    init();
    return () => {
      ignore = true;
    };
  }, [initialFilterRole]);

  const createAspect = useCallback(
    async (payload: AspectPayload) => {
      setIsSubmitting(true);
      setFieldErrors({});
      setError(null);
      try {
        const created = await adminApi.createAspect(payload);
        setFieldErrors({});
        toast.success(`Aspek "${payload.name}" berhasil ditambahkan.`);
        await fetchAspects(activeRoleFilterRef.current);
        return created;
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
          if (err.errors) {
            const map: Record<string, string> = {};
            err.errors.forEach((e) => {
              map[e.field] = e.message;
            });
            setFieldErrors(map);
          }
          toast.error(err.message, "Gagal Menambah Aspek");
        } else {
          toast.error("Terjadi kegagalan saat menghubungi server.");
        }
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [fetchAspects, toast]
  );

  const updateAspect = useCallback(
    async (id: string, payload: AspectPayload) => {
      setIsSubmitting(true);
      setFieldErrors({});
      setError(null);
      try {
        const updated = await adminApi.updateAspect(id, payload);
        setFieldErrors({});
        toast.success(`Aspek "${payload.name}" berhasil diperbarui.`);
        await fetchAspects(activeRoleFilterRef.current);
        return updated;
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
          if (err.errors) {
            const map: Record<string, string> = {};
            err.errors.forEach((e) => {
              map[e.field] = e.message;
            });
            setFieldErrors(map);
          }
          toast.error(err.message, "Gagal Mengubah Aspek");
        } else {
          toast.error("Terjadi kegagalan saat menghubungi server.");
        }
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [fetchAspects, toast]
  );

  const deleteAspect = useCallback(
    async (id: string) => {
      setIsSubmitting(true);
      setFieldErrors({});
      setError(null);
      try {
        await adminApi.deleteAspect(id);
        toast.success("Aspek penilaian berhasil dihapus.");
        await fetchAspects(activeRoleFilterRef.current);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
          toast.error(err.message, "Gagal Menghapus Aspek");
        } else {
          toast.error("Terjadi kegagalan saat menghubungi server.");
        }
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [fetchAspects, toast]
  );

  const fetchAspectDetail = useCallback(
    async (id: string): Promise<Aspect | null> => {
      detailRequestIdRef.current += 1;
      const requestId = detailRequestIdRef.current;

      setIsDetailLoading(true);
      try {
        const detail = await adminApi.getAspectDetail(id);
        if (requestId !== detailRequestIdRef.current) {
          return null;
        }
        setSelectedAspect(detail);
        return detail;
      } catch (err) {
        if (requestId === detailRequestIdRef.current) {
          if (err instanceof ApiError) {
            toast.error(err.message, "Gagal Memuat Detail Aspek");
          } else {
            toast.error(
              "Terjadi kegagalan saat memuat detail aspek.",
              "Gagal Memuat Detail Aspek"
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

  return {
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
  };
}
