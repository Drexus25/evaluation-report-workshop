"use client";

import React from "react";
import DashboardHeaderSection from "../section/DashboardHeaderSection";
import OrganizationPerformanceCard from "../component/OrganizationPerformanceCard";
import MvpIntegrityCard from "../component/MvpIntegrityCard";
import StatCardGrid from "../component/StatCardGrid";
import DivisionProgressCard from "../component/DivisionProgressCard";
import RecentVerifiedReportsCard from "../component/RecentVerifiedReportsCard";

export const DashboardContainer: React.FC = () => {
  return (
    <main className="min-h-screen bg-canvas text-neutral-700 antialiased font-body py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header: Greeting, Status, Action Buttons */}
        <DashboardHeaderSection />

        {/* Performa Organisasi Card */}
        <OrganizationPerformanceCard />

        {/* Aturan & Integritas MVP Card */}
        <MvpIntegrityCard />

        {/* 4 Bottom Metric / Stat Cards */}
        <StatCardGrid />

        {/* Progres Evaluasi per Divisi */}
        <DivisionProgressCard />

        {/* Entri Raport Terverifikasi Terbaru */}
        <RecentVerifiedReportsCard />
      </div>
    </main>
  );
};

export default DashboardContainer;

