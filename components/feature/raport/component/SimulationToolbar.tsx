"use client";

import React from "react";

interface SimulationToolbarProps {
  currentMode: "bph" | "staff" | "empty";
  onChangeMode: (mode: "bph" | "staff" | "empty") => void;
}

export default function SimulationToolbar({
  currentMode,
  onChangeMode,
}: SimulationToolbarProps) {
  return (
    <aside
      aria-label="Mode Simulasi Review Data Raport"
      className="bg-surface border border-neutral-200/80 rounded-2xl p-3 sm:p-4 mb-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => onChangeMode("bph")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              currentMode === "bph"
                ? "bg-surface text-primary shadow-xs font-bold"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Fungsionaris BPH
          </button>
          <button
            type="button"
            onClick={() => onChangeMode("staff")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              currentMode === "staff"
                ? "bg-surface text-primary shadow-xs font-bold"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Fungsionaris Staff
          </button>
          <button
            type="button"
            onClick={() => onChangeMode("empty")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              currentMode === "empty"
                ? "bg-surface text-status-warning-text shadow-xs font-bold"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Empty State (404)
          </button>
        </div>
      </div>
    </aside>
  );
}
