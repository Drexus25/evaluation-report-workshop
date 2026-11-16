"use client";

import React, { useState } from "react";
import SimulationToolbar from "../component/SimulationToolbar";
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
  const [mode, setMode] = useState<"bph" | "staff" | "empty">("bph");

  const currentUser =
    mode === "bph"
      ? dummyRaportBph.user
      : mode === "staff"
      ? dummyRaportStaff.user
      : dummyUserEmpty;

  const currentRaport =
    mode === "bph"
      ? dummyRaportBph
      : mode === "staff"
      ? dummyRaportStaff
      : null;

  return (
    <div className="min-h-screen bg-canvas flex flex-col selection:bg-primary-100 selection:text-primary-900 pt-24 pb-16">
      <main className="flex-1 layout-container">
        <SimulationToolbar currentMode={mode} onChangeMode={setMode} />

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
              evaluation={currentRaport.evaluation}
              createdBy={currentRaport.created_by}
            />
          </>
        ) : (
          <RaportEmptySection onRefresh={() => setMode("bph")} />
        )}
      </main>
    </div>
  );
}
