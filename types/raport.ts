export type RoleType = "bph" | "staff" | "admin";

export interface User {
  id: string;
  user_id?: string;
  name: string;
  nim: string;
  email: string;
  role: RoleType;
  department: string;
  period: string;
}

export interface AspectScore {
  aspect_id: string;
  aspect_name: string;
  score: number; // 0 - 100
  notes?: string;
}

export interface RaportData {
  id: string;
  user_id: string;
  user: User;
  scores: AspectScore[];
  average_score: number; // Dihitung backend, ditampilkan 2 desimal
  evaluation: string; // Evaluasi menyeluruh naratif
  created_at: string;
  created_by?: string;
}
