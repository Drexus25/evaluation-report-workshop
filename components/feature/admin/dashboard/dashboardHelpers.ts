import { Aspect, ReportListItem, User } from "@/types";

export interface MinistryProgress {
  name: string;
  completedCount: number;
  totalCount: number;
  percentage: number;
  average: string | null;
}

export interface DashboardMetrics {
  functionaryUsers: User[];
  bphUserCount: number;
  staffUserCount: number;
  bphAspectCount: number;
  staffAspectCount: number;
  completionPercentage: number;
  pendingReportCount: number;
  overallAverageScore: number | null;
  ministryProgressList: MinistryProgress[];
  recentReports: ReportListItem[];
  aspectNameMap: Map<string, string>;
}

export function getScorePredicate(score: number): {
  label: string;
  className: string;
} {
  if (score >= 85) {
    return {
      label: "Sangat Baik",
      className:
        "bg-status-success-bg text-status-success-text border-status-success/20",
    };
  }
  if (score >= 70) {
    return {
      label: "Baik",
      className: "bg-teal-50 text-teal-800 border-teal-200/70",
    };
  }
  if (score >= 55) {
    return {
      label: "Cukup",
      className:
        "bg-status-warning-bg text-status-warning-text border-status-warning/20",
    };
  }
  return {
    label: "Perlu Pembinaan",
    className:
      "bg-status-destructive-bg text-status-destructive-text border-status-destructive/20",
  };
}

export function computeDashboardMetrics(
  users: User[],
  reports: ReportListItem[],
  aspects: Aspect[]
): DashboardMetrics {
  const functionaryUsers = users.filter(
    (u) => u.role === "bph" || u.role === "staff"
  );
  const bphUserCount = functionaryUsers.filter((u) => u.role === "bph").length;
  const staffUserCount = functionaryUsers.filter(
    (u) => u.role === "staff"
  ).length;
  const bphAspectCount = aspects.filter((a) => a.role_type === "bph").length;
  const staffAspectCount = aspects.filter(
    (a) => a.role_type === "staff"
  ).length;

  const reportByUserId = new Map<string, ReportListItem>();
  reports.forEach((report) => {
    const uid = report.user_id || report.user?.id;
    if (uid) reportByUserId.set(uid, report);
  });

  const completedUsersCount = functionaryUsers.filter((u) =>
    reportByUserId.has(u.id)
  ).length;

  const completionPercentage =
    functionaryUsers.length === 0
      ? 0
      : Math.round((completedUsersCount / functionaryUsers.length) * 1000) / 10;

  const pendingReportCount = Math.max(
    0,
    functionaryUsers.length - completedUsersCount
  );

  const validScores = reports
    .map((r) =>
      typeof r.average_score === "number"
        ? r.average_score
        : Number(r.average_score)
    )
    .filter((val) => !isNaN(val));

  const overallAverageScore =
    reports.length > 0 && validScores.length > 0
      ? validScores.reduce((acc, val) => acc + val, 0) / validScores.length
      : null;

  const groups = new Map<string, { users: User[]; scores: number[] }>();
  functionaryUsers.forEach((u) => {
    const label =
      u.ministry?.trim() ||
      u.department?.trim() ||
      (u.role === "bph" ? "BPH (Badan Pengurus Harian)" : "Staff Organisasi");
    const current = groups.get(label) || { users: [], scores: [] };
    current.users.push(u);
    const report = reportByUserId.get(u.id);
    if (report) {
      const avg =
        typeof report.average_score === "number"
          ? report.average_score
          : Number(report.average_score);
      if (!isNaN(avg)) current.scores.push(avg);
    }
    groups.set(label, current);
  });

  const ministryProgressList: MinistryProgress[] = Array.from(groups.entries())
    .map(([name, group]) => {
      const totalCount = group.users.length;
      const completedCount = group.users.filter((u) =>
        reportByUserId.has(u.id)
      ).length;
      const percentage =
        totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
      const average =
        group.scores.length > 0
          ? (
              group.scores.reduce((acc, val) => acc + val, 0) /
              group.scores.length
            ).toFixed(2)
          : null;

      return { name, completedCount, totalCount, percentage, average };
    })
    .sort((a, b) => b.percentage - a.percentage || b.totalCount - a.totalCount);

  const recentReports = [...reports]
    .sort((a, b) => {
      const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return timeB - timeA;
    })
    .slice(0, 6);

  const aspectNameMap = new Map<string, string>();
  aspects.forEach((aspect) => {
    aspectNameMap.set(aspect.id, aspect.name);
  });

  return {
    functionaryUsers,
    bphUserCount,
    staffUserCount,
    bphAspectCount,
    staffAspectCount,
    completionPercentage,
    pendingReportCount,
    overallAverageScore,
    ministryProgressList,
    recentReports,
    aspectNameMap,
  };
}
