export type RoleType = "admin" | "bph" | "staff";

export interface ApiResponse<T> {
  status: "success";
  message: string;
  data: T;
}

export interface ApiErrorDetail {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  status: "error";
  message: string;
  errors?: ApiErrorDetail[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  position?: string;
  ministry?: string;
  nim?: string;
  department?: string;
  period?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthLoginData {
  token: string;
  user: User;
}

export type AspectRoleType = "bph" | "staff";

export interface Aspect {
  id: string;
  name: string;
  description?: string;
  role_type: AspectRoleType;
  created_at?: string;
  updated_at?: string;
}

export interface AspectScoreItem {
  aspect_id: string;
  aspect_name?: string;
  score: number;
  feedback?: string;
  notes?: string;
}

export type AspectScore = AspectScoreItem;

export interface ReportListItem {
  id: string;
  user_id: string;
  name?: string;
  role?: RoleType;
  position?: string;
  ministry?: string;
  user?: User;
  average_score: number;
  overall_evaluation?: string;
  scores?: AspectScoreItem[];
  created_at: string;
  updated_at?: string;
  created_by?: string;
}

export interface RaportData extends ReportListItem {
  overall_evaluation: string;
  scores: AspectScoreItem[];
}

export interface CreateReportPayload {
  user_id: string;
  overall_evaluation: string;
  scores: Array<{
    aspect_id: string;
    score: number;
    feedback?: string;
  }>;
}

export interface UpdateReportPayload {
  overall_evaluation: string;
  scores: Array<{
    aspect_id: string;
    score: number;
    feedback?: string;
  }>;
}

export interface AspectPayload {
  name: string;
  description?: string;
  role_type: AspectRoleType;
}

export interface UpdateUserPayload {
  name?: string;
  role?: RoleType;
  position?: string;
  ministry?: string;
}
