"use client";

import Link from "next/link";
import { useState } from "react";
import { deleteReport, getReports, type Report } from "@/libs/store";
import { Icon } from "@iconify/react";

export default function AdminReportList() {
  const [reports, setReports] = useState<Report[]>(() => [...getReports()].reverse());

  const load = () => setReports([...getReports()].reverse());

  const handleDelete = (id: string) => {
    if (!confirm("Delete this report?")) return;
    deleteReport(id);
    load();
  };

  const gradeBadge = (score: number) => {
    if (score >= 85) return "bg-[#10704b] text-[#FFEFB3]";
    if (score >= 75) return "bg-[#1a8f62] text-white";
    if (score >= 65) return "bg-[#FFEFB3] text-[#053322] border border-[#10704b]";
    return "bg-red-100 text-red-700 border border-red-300";
  };

  return (
    <div className="w-full min-h-screen px-6 py-36 max-w-5xl mx-auto font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#053322]/50 mb-1 font-medium">
            <Link href="/admin" className="hover:text-[#10704b] transition-colors">Dashboard</Link>
            <span>/</span>
            <span>Reports</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#10704b]">All Reports</h1>
        </div>
        <Link href="/admin/report/create">
          <button className="flex items-center gap-2 bg-[#10704b] text-[#FFEFB3] border-2 border-[#053322] px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#0d5c3d] transition-all duration-200">
            <Icon icon="ri:add-line" width={18} /> Create Report
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-[#FFEFB3] border-3 border-[#10704b] rounded-3xl overflow-hidden">
        <div className="bg-[#10704b] px-6 py-4">
          <p className="text-[#FFEFB3] text-sm font-bold uppercase tracking-widest">
            {reports.length} report{reports.length !== 1 ? "s" : ""}
          </p>
        </div>

        {reports.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-[#053322]/50 text-sm font-medium mb-3">No reports found.</p>
            <Link href="/admin/report/create">
              <button className="bg-[#10704b] text-[#FFEFB3] px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#0d5c3d] transition-all">
                Create First Report
              </button>
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#10704b]/20">
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#053322]/60">Member</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#053322]/60">Division</th>
                <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#053322]/60">Aspects</th>
                <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#053322]/60">Grade</th>
                <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#053322]/60">Score</th>
                <th className="text-right px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#053322]/60">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r, i) => (
                <tr key={r.id} className={`border-t border-[#10704b]/10 ${i % 2 === 1 ? "bg-[#10704b]/5" : ""}`}>
                  <td className="px-6 py-3 font-semibold text-[#053322]">{r.memberName}</td>
                  <td className="px-4 py-3 text-[#053322]/70">{r.division}</td>
                  <td className="px-4 py-3 text-center text-[#053322]/70">{r.aspects.length}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold ${gradeBadge(r.finalScore)}`}>
                      {r.finalGrade}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-[#053322]">{r.finalScore.toFixed(1)}</td>
                  <td className="px-6 py-3 text-right text-[#053322]/50 text-xs">
                    {new Date(r.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                      title="Delete report"
                    >
                      <Icon icon="ri:delete-bin-line" width={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
