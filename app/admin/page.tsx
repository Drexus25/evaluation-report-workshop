"use client";

import Link from "next/link";
import { useState } from "react";
import { getAspects, getReports, type Report } from "@/libs/store";
import { Icon } from "@iconify/react";

export default function AdminDashboard() {
  const [reports] = useState<Report[]>(() => getReports());
  const [aspects] = useState(() => getAspects());

  const reportCount = reports.length;
  const aspectCount = aspects.length;
  const recent = [...reports].reverse().slice(0, 5);

  const gradeBadge = (score: number) => {
    if (score >= 85) return "bg-[#10704b] text-[#FFEFB3]";
    if (score >= 75) return "bg-[#1a8f62] text-white";
    if (score >= 65) return "bg-[#FFEFB3] text-[#053322] border border-[#10704b]";
    return "bg-red-100 text-red-700 border border-red-300";
  };

  return (
    <div className="w-full min-h-screen px-6 py-36 max-w-5xl mx-auto font-sans">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-[#10704b]">Admin Dashboard</h1>
        <p className="text-[#053322]/60 mt-1 text-sm font-medium">
          Overview of evaluation reports and aspect management.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-[#FFEFB3] border-3 border-[#10704b] rounded-2xl px-8 py-6 flex items-center gap-5">
          <div className="bg-[#10704b] text-[#FFEFB3] rounded-xl p-3">
            <Icon icon="ri:file-text-line" width={28} height={28} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#053322]/60">Total Reports</p>
            <p className="text-4xl font-extrabold text-[#053322]">{reportCount}</p>
          </div>
        </div>
        <div className="bg-[#FFEFB3] border-3 border-[#10704b] rounded-2xl px-8 py-6 flex items-center gap-5">
          <div className="bg-[#10704b] text-[#FFEFB3] rounded-xl p-3">
            <Icon icon="ri:list-check-3" width={28} height={28} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#053322]/60">Total Aspects</p>
            <p className="text-4xl font-extrabold text-[#053322]">{aspectCount}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 mb-10">
        <Link href="/admin/report/create">
          <button className="flex items-center gap-2 bg-[#10704b] text-[#FFEFB3] border-2 border-[#053322] px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#0d5c3d] transition-all duration-200">
            <Icon icon="ri:add-line" width={18} /> Create Report
          </button>
        </Link>
        <Link href="/admin/report">
          <button className="flex items-center gap-2 bg-[#FFEFB3] text-[#10704b] border-2 border-[#10704b] px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#e7e0bc] transition-all duration-200">
            <Icon icon="ri:file-list-3-line" width={18} /> All Reports
          </button>
        </Link>
        <Link href="/admin/aspek">
          <button className="flex items-center gap-2 bg-[#FFEFB3] text-[#10704b] border-2 border-[#10704b] px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#e7e0bc] transition-all duration-200">
            <Icon icon="ri:settings-3-line" width={18} /> Manage Aspects
          </button>
        </Link>
      </div>

      {/* Recent Reports */}
      <div className="bg-[#FFEFB3] border-3 border-[#10704b] rounded-3xl overflow-hidden">
        <div className="bg-[#10704b] px-6 py-4 flex items-center justify-between">
          <h2 className="text-[#FFEFB3] font-bold text-sm uppercase tracking-widest">Recent Reports</h2>
          <Link href="/admin/report" className="text-[#FFEFB3]/70 hover:text-[#FFEFB3] text-xs font-semibold transition-colors">
            View all →
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="px-6 py-12 text-center text-[#053322]/50 text-sm font-medium">
            No reports yet. <Link href="/admin/report/create" className="text-[#10704b] font-bold underline">Create one →</Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#10704b]/20">
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#053322]/60">Member</th>
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#053322]/60">Division</th>
                <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#053322]/60">Grade</th>
                <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#053322]/60">Score</th>
                <th className="text-right px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#053322]/60">Date</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r, i) => (
                <tr key={r.id} className={`border-t border-[#10704b]/10 ${i % 2 === 1 ? "bg-[#10704b]/5" : ""}`}>
                  <td className="px-6 py-3 font-semibold text-[#053322]">{r.memberName}</td>
                  <td className="px-6 py-3 text-[#053322]/70">{r.division}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold ${gradeBadge(r.finalScore)}`}>
                      {r.finalGrade}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-[#053322]">{r.finalScore.toFixed(1)}</td>
                  <td className="px-6 py-3 text-right text-[#053322]/50 text-xs">
                    {new Date(r.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
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