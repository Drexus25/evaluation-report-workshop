import { Metadata } from "next";
import DashboardContainer from "@/components/feature/dashboard/container/DashboardContainer";

export const metadata: Metadata = {
  title: "Dashboard - Report Evaluation Workshop",
  description: "Rekapitulasi berkala evaluasi kerja fungsionaris BPH & Staff periode berjalan.",
};

export default function DashboardPage() {
  return <DashboardContainer />;
}

