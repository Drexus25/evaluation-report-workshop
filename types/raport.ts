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
}

export interface AuthLoginData {
  token: string;
  user: User;
}

export type AspectRoleType = "bph" | "staff" | "both";

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
  notes?: string;
}

export type AspectScore = AspectScoreItem;

export interface RaportData {
  id: string;
  user_id: string;
  name?: string;
  role?: RoleType;
  position?: string;
  ministry?: string;
  user?: User;
  average_score: number;
  overall_evaluation: string;
  scores: AspectScoreItem[];
  created_at: string;
  updated_at?: string;
  created_by?: string;
}

export interface CreateReportPayload {
  user_id: string;
  overall_evaluation: string;
  scores: Array<{
    aspect_id: string;
    score: number;
  }>;
}
