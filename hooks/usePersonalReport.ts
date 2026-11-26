"use client";

import { useState, useCallback, useEffect } from "react";
import { User, RaportData } from "@/types";
import { authApi, reportApi, ApiError } from "@/libs/api";
import { useAuth } from "./useAuth";

export function usePersonalReport() {
  const { user: authUser, token } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [report, setReport] = useState<RaportData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNotFound, setIsNotFound] = useState<boolean>(false); // 404 khusus raport belum tersedia
  const [isNetworkError, setIsNetworkError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPersonalData = useCallback(async () => {
    if (!token) {
      setUser(null);
      setReport(null);
      setError(null);
      setIsNotFound(false);
      setIsNetworkError(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsNotFound(false);
    setIsNetworkError(false);

    try {
      // 1. Perbarui profil terkini via GET /api/v1/me saat refetch manual
      try {
        const currentUser = await authApi.getMe();
        setUser(currentUser);
      } catch (err) {
        console.warn("Gagal memperbarui profil pengguna:", err);
      }

      // 2. Ambil raport pribadi via GET /api/v1/me/report
      try {
        const reportData = await reportApi.getMyReport();
        setReport(reportData);
        setIsNotFound(false);
        setError(null);
      } catch (repErr) {
        if (repErr instanceof ApiError) {
          // BEDAKAN 404 Raport Belum Tersedia dari Network Error / Server Error 500
          if (repErr.isNotFound || repErr.status === 404) {
            setIsNotFound(true);
            setError(null);
            setReport(null);
          } else if (repErr.isNetworkError || repErr.status === 0) {
            setIsNetworkError(true);
            setIsNotFound(false);
            setError(
              "Gagal terhubung ke server backend (Network Error). Pastikan server backend sedang aktif."
            );
            setReport(null);
          } else {
            setIsNotFound(false);
            setError(repErr.message);
            setReport(null);
          }
        } else {
          setIsNotFound(false);
          setError("Terjadi kesalahan tidak terduga saat memuat raport.");
          setReport(null);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    let ignore = false;

    async function init() {
      if (!token) {
        if (!ignore) {
          setUser(null);
          setReport(null);
          setError(null);
          setIsNotFound(false);
          setIsNetworkError(false);
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);
      setError(null);
      setIsNotFound(false);
      setIsNetworkError(false);

      try {
        const reportData = await reportApi.getMyReport();
        if (!ignore) {
          setReport(reportData);
          setIsNotFound(false);
          setError(null);
        }
      } catch (repErr) {
        if (!ignore) {
          if (repErr instanceof ApiError) {
            if (repErr.isNotFound || repErr.status === 404) {
              setIsNotFound(true);
              setError(null);
              setReport(null);
            } else if (repErr.isNetworkError || repErr.status === 0) {
              setIsNetworkError(true);
              setIsNotFound(false);
              setError(
                "Gagal terhubung ke server backend (Network Error). Pastikan server backend sedang aktif."
              );
              setReport(null);
            } else {
              setIsNotFound(false);
              setError(repErr.message);
              setReport(null);
            }
          } else {
            setIsNotFound(false);
            setError("Terjadi kesalahan tidak terduga saat memuat raport.");
            setReport(null);
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
  }, [token]);

  return {
    user: user ?? authUser,
    report,
    isLoading,
    isNotFound,
    isNetworkError,
    error,
    refetch: fetchPersonalData,
  };
}
