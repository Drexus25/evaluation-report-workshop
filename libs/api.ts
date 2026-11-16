import {
  ApiResponse,
  ApiErrorResponse,
  AuthLoginData,
  User,
  RaportData,
  Aspect,
  CreateReportPayload,
} from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "your-api-key-here";

export class ApiError extends Error {
  status: number;
  errors?: Array<{ field: string; message: string }>;

  constructor(
    message: string,
    status: number,
    errors?: Array<{ field: string; message: string }>
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": API_KEY,
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return null as unknown as T;
  }

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    const errorJson = json as ApiErrorResponse | null;
    throw new ApiError(
      errorJson?.message || `Request failed with status ${response.status}`,
      response.status,
      errorJson?.errors
    );
  }

  const successJson = json as ApiResponse<T>;
  return successJson.data;
}

export const authApi = {
  login: (body: { email: string; password: string }) =>
    apiFetch<AuthLoginData>("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  logout: () =>
    apiFetch<null>("/auth/logout", {
      method: "POST",
    }),

  getMe: () => apiFetch<User>("/me"),
};

export const reportApi = {
  getMyReport: () => apiFetch<RaportData>("/me/report"),
};

export const adminApi = {
  getUsers: (role?: "bph" | "staff") =>
    apiFetch<User[]>(role ? `/admin/users?role=${role}` : "/admin/users"),

  getAspects: (roleType?: "bph" | "staff") =>
    apiFetch<Aspect[]>(
      roleType ? `/admin/aspects?role_type=${roleType}` : "/admin/aspects"
    ),

  createReport: (payload: CreateReportPayload) =>
    apiFetch<RaportData>("/admin/reports", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getReports: () => apiFetch<RaportData[]>("/admin/reports"),

  getReportDetail: (id: string) => apiFetch<RaportData>(`/admin/reports/${id}`),

  updateReport: (
    id: string,
    payload: {
      overall_evaluation: string;
      scores: Array<{ aspect_id: string; score: number }>;
    }
  ) =>
    apiFetch<RaportData>(`/admin/reports/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  deleteReport: (id: string) =>
    apiFetch<null>(`/admin/reports/${id}`, {
      method: "DELETE",
    }),
};
