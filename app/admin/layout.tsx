import React from "react";
import AdminSidebar from "@/components/feature/admin/layout/AdminSidebar";

export const metadata = {
  title: "Admin Panel | EvalOrg",
  description: "Manajemen aspek penilaian dan pembuatan raport fungsionaris",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas flex flex-col lg:flex-row text-neutral-900 selection:bg-primary-100 selection:text-primary-900">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-6 sm:p-8 max-w-7xl w-full">
        {children}
      </main>
    </div>
  );
}
