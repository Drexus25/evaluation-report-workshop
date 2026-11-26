import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { authStorage } from "./auth";
import { ApiErrorResponse } from "@/types";

export class ApiError extends Error {
  status: number;
  errors?: Array<{ field: string; message: string }>;
  isNetworkError: boolean;
  isNotFound: boolean;
  isDuplicate: boolean;
  isUnauthorized: boolean;
  isForbidden: boolean;

  constructor(
    message: string,
    status: number,
    errors?: Array<{ field: string; message: string }>,
    isNetworkError = false
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
    this.isNetworkError = isNetworkError;
    this.isNotFound = status === 404;
    this.isDuplicate = status === 409;
    this.isUnauthorized = status === 401;
    this.isForbidden = status === 403;
  }
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(API_KEY ? { "X-API-Key": API_KEY } : {}),
  },
  timeout: 15000,
});

// Request Interceptor: Menambahkan Bearer Token & X-API-Key ke Header
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = authStorage.getToken();
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    const currentApiKey = process.env.NEXT_PUBLIC_API_KEY || API_KEY;
    if (currentApiKey) {
      config.headers.set("X-API-Key", currentApiKey);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Penanganan Error Terpusat & Sesi 401 / 403
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    // 1. Error Jaringan / Backend Mati (Network Error)
    if (!error.response) {
      const netError = new ApiError(
        "Gagal terhubung ke server backend (Network Error). Pastikan server backend sedang aktif pada port/domain yang sesuai.",
        0,
        undefined,
        true
      );
      return Promise.reject(netError);
    }

    const { status, data } = error.response;
    const message =
      data?.message ||
      (status === 401
        ? "Sesi telah berakhir atau kredensial tidak valid. Silakan login kembali."
        : status === 403
        ? "Akses ditolak: Anda tidak memiliki wewenang untuk tindakan ini."
        : status === 404
        ? "Data yang diminta tidak ditemukan."
        : status === 409
        ? "Data raport untuk fungsionaris ini sudah ada."
        : `Permintaan gagal dengan status ${status}`);

    const fieldErrors = data?.errors;

    // 2. Tangani 401: Sesi Kedaluwarsa / Invalid Token
    if (status === 401) {
      authStorage.clearSession();
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("evalorg:session-expired", {
            detail: { message },
          })
        );
      }
    }

    const apiError = new ApiError(message, status, fieldErrors);
    return Promise.reject(apiError);
  }
);
