"use client";

import React, { useState } from "react";
import RaportHeaderSection from "../section/RaportHeaderSection";
import RaportScoreSection from "../section/RaportScoreSection";
import RaportEvaluationSection from "../section/RaportEvaluationSection";
import RaportEmptySection from "../section/RaportEmptySection";
import {
  dummyRaportBph,
  dummyRaportStaff,
  dummyUserEmpty,
} from "@/data/dummyRaport";

export default function RaportContainer() {
  const [mode, setMode] = useState<"staff" | "bph" | "empty">("staff");

  const currentUser =
    mode === "bph"
      ? dummyRaportBph.user!
      : mode === "staff"
      ? dummyRaportStaff.user!
      : dummyUserEmpty;

  const currentRaport =
    mode === "bph"
      ? dummyRaportBph
      : mode === "staff"
      ? dummyRaportStaff
      : null;

  return (
    <div className="min-h-screen bg-canvas flex flex-col pt-24 pb-16">
      <main className="flex-1 layout-container space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-neutral-200">
          <div>
            <h2 className="font-headline text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Raport Pribadi Fungsionaris
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Hasil evaluasi kinerja semester aktif berbasis rubrik objektif organisasi
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <label htmlFor="user-preview" className="text-xs text-neutral-500 font-medium">
              Akun:
            </label>
            <select
              id="user-preview"
              value={mode}
              onChange={(e) => setMode(e.target.value as "staff" | "bph" | "empty")}
              className="bg-surface border border-neutral-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-neutral-800 focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="staff">Budi Santoso</option>
              <option value="bph">Bima Arya</option>
              <option value="empty">Siti Rahmawati</option>
            </select>
          </div>
        </div>

        <RaportHeaderSection
          user={currentUser}
          createdAt={currentRaport?.created_at}
          hasRaport={Boolean(currentRaport)}
        />

        {currentRaport ? (
          <>
            <RaportScoreSection
              scores={currentRaport.scores}
              averageScore={currentRaport.average_score}
            />
            <RaportEvaluationSection
              evaluation={currentRaport.overall_evaluation}
              createdBy={currentRaport.created_by}
            />
          </>
        ) : (
          <RaportEmptySection onRefresh={() => setMode("staff")} />
        )}
      </main>
    </div>
  );
}
