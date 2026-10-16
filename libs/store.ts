const ASPECTS_KEY = "eval_aspects";
const REPORTS_KEY = "eval_reports";

export interface Aspect {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface ReportAspect {
  aspectId: string;
  aspectName: string;
  grade: string;
  score: number;
  notes: string;
}

export interface Report {
  id: string;
  division: string;
  memberName: string;
  aspects: ReportAspect[];
  finalGrade: string;
  finalScore: number;
  createdAt: string;
}

export const DIVISIONS = [
  "Human Capital",
  "Talent Growth",
  "Creative Enterprise",
  "Student Advocacy & Welfare",
  "Inter-Agency Affairs",
  "Social Equity & Environment",
  "Studies Strategic & Action",
  "Creative Media Information",
  "Administration & Finance",
  "IT Solutions",
];

export const GRADES = ["A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"];

export function gradeToScore(grade: string): number {
  const map: Record<string, number> = {
    A: 95,
    "A-": 87,
    "B+": 82,
    B: 77,
    "B-": 72,
    "C+": 67,
    C: 62,
    D: 55,
    F: 40,
  };
  return map[grade] ?? 0;
}

export function scoreToGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 85) return "A-";
  if (score >= 80) return "B+";
  if (score >= 75) return "B";
  if (score >= 70) return "B-";
  if (score >= 65) return "C+";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

export function getAspects(): Aspect[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(ASPECTS_KEY) ?? "[]") as Aspect[];
  } catch {
    return [];
  }
}

export function saveAspect(data: Pick<Aspect, "name" | "description">): Aspect {
  const list = getAspects();
  const next: Aspect = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  list.push(next);
  localStorage.setItem(ASPECTS_KEY, JSON.stringify(list));
  return next;
}

export function deleteAspect(id: string): void {
  localStorage.setItem(
    ASPECTS_KEY,
    JSON.stringify(getAspects().filter((a) => a.id !== id))
  );
}

export function getReports(): Report[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(REPORTS_KEY) ?? "[]") as Report[];
  } catch {
    return [];
  }
}

export function saveReport(
  data: Omit<Report, "id" | "createdAt">
): Report {
  const list = getReports();
  const next: Report = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  list.push(next);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(list));
  return next;
}

export function deleteReport(id: string): void {
  localStorage.setItem(
    REPORTS_KEY,
    JSON.stringify(getReports().filter((r) => r.id !== id))
  );
}
