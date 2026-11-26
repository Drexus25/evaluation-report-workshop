import { apiClient, ApiError } from "./axios";
import {
  AuthLoginData,
  User,
  ReportListItem,
  RaportData,
  Aspect,
  CreateReportPayload,
  UpdateReportPayload,
  AspectPayload,
} from "@/types";

export { ApiError };

/**
 * Helper untuk mengekstrak data dari respons Axios yang berformat envelope { status: "success", data: ... }
 * atau format langsung.
 */
async function extractData<T>(promise: Promise<{ data: unknown }>): Promise<T> {
  const response = await promise;
  if (!response || response.data === undefined || response.data === null) {
    return null as unknown as T;
  }
  const body = response.data;
  if (typeof body === "object" && body !== null && "data" in body) {
    return (body as { data: T }).data;
  }
  return body as T;
}

export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    extractData<AuthLoginData>(apiClient.post("/auth/login", credentials)),

  logout: () => extractData<null>(apiClient.post("/auth/logout")),

  getMe: () => extractData<User>(apiClient.get("/me")),
};

export const reportApi = {
  getMyReport: () => extractData<RaportData>(apiClient.get("/me/report")),
};

export const adminApi = {
  getUsers: (role?: "bph" | "staff") =>
    extractData<User[]>(
      apiClient.get(role ? `/admin/users?role=${role}` : "/admin/users")
    ),

  getAspects: (roleType?: "bph" | "staff") =>
    extractData<Aspect[]>(
      apiClient.get(
        roleType ? `/admin/aspects?role_type=${roleType}` : "/admin/aspects"
      )
    ),

  createAspect: (payload: AspectPayload) =>
    extractData<Aspect>(apiClient.post("/admin/aspects", payload)),

  updateAspect: (id: string, payload: AspectPayload) =>
    extractData<Aspect>(apiClient.put(`/admin/aspects/${id}`, payload)),

  deleteAspect: (id: string) =>
    extractData<null>(apiClient.delete(`/admin/aspects/${id}`)),

  getReports: () =>
    extractData<ReportListItem[]>(apiClient.get("/admin/reports")),

  getReportDetail: (id: string) =>
    extractData<RaportData>(apiClient.get(`/admin/reports/${id}`)),

  createReport: (payload: CreateReportPayload) =>
    extractData<RaportData>(apiClient.post("/admin/reports", payload)),

  updateReport: (id: string, payload: UpdateReportPayload) =>
    extractData<RaportData>(apiClient.put(`/admin/reports/${id}`, payload)),

  deleteReport: (id: string) =>
    extractData<null>(apiClient.delete(`/admin/reports/${id}`)),
};
