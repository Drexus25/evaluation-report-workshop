"use client";

import Link from "next/link";
import { useState } from "react";
import {
  getAspects,
  saveReport,
  DIVISIONS,
  GRADES,
  gradeToScore,
  scoreToGrade,
  type Aspect,
} from "@/libs/store";
import { Icon } from "@iconify/react";

interface AspectEntry {
  aspectId: string;
  aspectName: string;
  grade: string;
  notes: string;
}

export default function CreateReport() {
  const [division, setDivision] = useState("");
  const [memberName, setMemberName] = useState("");
  const [aspects, setAspects] = useState<Aspect[]>(() => getAspects());
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [entries, setEntries] = useState<Record<string, AspectEntry>>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const toggleAspect = (aspect: Aspect) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(aspect.id)) {
        next.delete(aspect.id);
      } else {
        next.add(aspect.id);
        setEntries((e) => ({
          ...e,
          [aspect.id]: { aspectId: aspect.id, aspectName: aspect.name, grade: "B", notes: "" },
        }));
      }
      return next;
    });
  };

  const updateEntry = (id: string, field: keyof AspectEntry, value: string) => {
    setEntries((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const selectedEntries = aspects
    .filter((a) => selected.has(a.id))
    .map((a) => entries[a.id]);

  const avgScore =
    selectedEntries.length > 0
      ? selectedEntries.reduce((sum, e) => sum + gradeToScore(e.grade), 0) / selectedEntries.length
      : null;
  const finalGrade = avgScore !== null ? scoreToGrade(avgScore) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!division) { setError("Please select a division."); return; }
    if (!memberName.trim()) { setError("Please enter the member's name."); return; }
    if (selected.size === 0) { setError("Please select at least one aspect to grade."); return; }

    saveReport({
      division,
      memberName: memberName.trim(),
      aspects: selectedEntries.map((en) => ({
        ...en,
        score: gradeToScore(en.grade),
      })),
      finalGrade: finalGrade!,
      finalScore: Math.round(avgScore! * 10) / 10,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center font-sans gap-4">
        <div className="bg-[#FFEFB3] border-3 border-[#10704b] rounded-3xl p-10 text-center max-w-sm">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-extrabold text-[#10704b] mb-2">Report Saved!</h2>
          <p className="text-[#053322]/70 text-sm mb-6">The evaluation report has been created successfully.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/admin/report">
              <button className="bg-[#10704b] text-[#FFEFB3] px-6 py-2 rounded-full text-sm font-semibold border-2 border-[#053322] hover:bg-[#0d5c3d] transition-all">
                View Reports
              </button>
            </Link>
            <button
              onClick={() => { setSubmitted(false); setDivision(""); setMemberName(""); setSelected(new Set()); setEntries({}); }}
              className="bg-[#FFEFB3] text-[#10704b] px-6 py-2 rounded-full text-sm font-semibold border-2 border-[#10704b] hover:bg-[#e7e0bc] transition-all"
            >
              New Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-6 py-36 max-w-3xl mx-auto font-sans">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-[#053322]/50 mb-1 font-medium">
          <Link href="/admin" className="hover:text-[#10704b] transition-colors">Dashboard</Link>
          <span>/</span>
          <Link href="/admin/report" className="hover:text-[#10704b] transition-colors">Reports</Link>
          <span>/</span>
          <span>Create</span>
        </div>
        <h1 className="text-4xl font-extrabold text-[#10704b]">Create Report</h1>
        <p className="text-[#053322]/60 mt-1 text-sm font-medium">
          Fill in the member details, select aspects, and assign grades.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Section 1: Basic Info */}
        <div className="bg-[#FFEFB3] border-3 border-[#10704b] rounded-3xl overflow-hidden">
          <div className="bg-[#10704b] px-6 py-3">
            <h2 className="text-[#FFEFB3] font-bold text-sm uppercase tracking-widest">1 — Member Info</h2>
          </div>
          <div className="px-6 py-5 flex flex-col gap-4">
            {/* Division */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-[#053322]">Division</label>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/90 text-[#053322] border-2 border-[#10704b]/30 focus:border-[#10704b] focus:outline-none transition-all"
              >
                <option value="">Select a division…</option>
                {DIVISIONS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Member Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-[#053322]">Member Name</label>
              <input
                type="text"
                placeholder="Enter member's full name"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/90 text-[#053322] placeholder:text-[#053322]/40 border-2 border-[#10704b]/30 focus:border-[#10704b] focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Select Aspects */}
        <div className="bg-[#FFEFB3] border-3 border-[#10704b] rounded-3xl overflow-hidden">
          <div className="bg-[#10704b] px-6 py-3 flex items-center justify-between">
            <h2 className="text-[#FFEFB3] font-bold text-sm uppercase tracking-widest">2 — Select Aspects</h2>
            <span className="text-[#FFEFB3]/70 text-xs font-semibold">{selected.size} selected</span>
          </div>
          <div className="px-6 py-5">
            {aspects.length === 0 ? (
              <p className="text-[#053322]/50 text-sm text-center py-4">
                No aspects available.{" "}
                <Link href="/admin/aspek" className="text-[#10704b] font-bold underline">Create aspects →</Link>
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {aspects.map((a) => (
                  <label
                    key={a.id}
                    className={`flex items-start gap-3 px-4 py-3 rounded-xl cursor-pointer border-2 transition-all ${
                      selected.has(a.id)
                        ? "border-[#10704b] bg-[#10704b]/10"
                        : "border-[#10704b]/20 bg-white/50 hover:border-[#10704b]/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected.has(a.id)}
                      onChange={() => toggleAspect(a)}
                      className="mt-0.5 accent-[#10704b]"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#053322]">{a.name}</p>
                      {a.description && (
                        <p className="text-xs text-[#053322]/60 mt-0.5">{a.description}</p>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Grade selected aspects */}
        {selected.size > 0 && (
          <div className="bg-[#FFEFB3] border-3 border-[#10704b] rounded-3xl overflow-hidden">
            <div className="bg-[#10704b] px-6 py-3">
              <h2 className="text-[#FFEFB3] font-bold text-sm uppercase tracking-widest">3 — Assign Grades</h2>
            </div>
            <div className="px-6 py-5 flex flex-col gap-5">
              {aspects.filter((a) => selected.has(a.id)).map((a) => (
                <div key={a.id} className="flex flex-col gap-2">
                  <p className="text-sm font-bold text-[#053322]">{a.name}</p>
                  <div className="flex gap-3 items-start">
                    {/* Grade selector */}
                    <select
                      value={entries[a.id]?.grade ?? "B"}
                      onChange={(e) => updateEntry(a.id, "grade", e.target.value)}
                      className="px-4 py-2.5 rounded-xl bg-white/90 text-[#053322] border-2 border-[#10704b]/30 focus:border-[#10704b] focus:outline-none transition-all text-sm font-bold w-28"
                    >
                      {GRADES.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                    {/* Notes */}
                    <textarea
                      placeholder="Notes (optional)"
                      value={entries[a.id]?.notes ?? ""}
                      onChange={(e) => updateEntry(a.id, "notes", e.target.value)}
                      rows={2}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white/90 text-[#053322] placeholder:text-[#053322]/40 border-2 border-[#10704b]/30 focus:border-[#10704b] focus:outline-none transition-all text-sm resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Final Grade Preview */}
            {avgScore !== null && (
              <div className="mx-6 mb-5 bg-[#10704b]/10 border border-[#10704b]/30 rounded-2xl px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#053322]/60">Computed Final Grade</p>
                  <p className="text-xs text-[#053322]/50 mt-0.5">Average of {selected.size} aspect{selected.size !== 1 ? "s" : ""}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-2xl font-extrabold text-[#053322]">{avgScore.toFixed(1)}</p>
                  <span className="bg-[#10704b] text-[#FFEFB3] px-5 py-2 rounded-xl text-xl font-extrabold border-2 border-[#053322]">
                    {finalGrade}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-100 border border-red-300 text-red-700 text-sm font-medium flex items-center gap-2">
            <span>⚠️</span><span>{error}</span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-[#10704b] text-[#FFEFB3] font-bold text-base border-2 border-[#053322] hover:bg-[#0d5c3d] hover:shadow-md active:scale-[0.99] cursor-pointer transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Icon icon="ri:save-line" width={18} /> Save Report
        </button>
      </form>
    </div>
  );
}
