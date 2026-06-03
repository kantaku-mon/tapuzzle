"use client";

import React, { useMemo } from "react";
import { useGameState } from "@/lib/useGameState";
import Grid from "@/components/Grid";
import HUD from "@/components/HUD";
import StatusOverlay from "@/components/StatusOverlay";
import RulesPanel from "@/components/RulesPanel";
import type { DifficultyLevel } from "@/types/game";

export default function GamePage() {
  const {
    grid,
    status,
    moves,
    difficulty,
    animating,
    tapCell,
    startNewGame,
  } = useGameState("normal");

  const nonZeroCells = useMemo(
    () => grid.flat().filter((v) => v !== 0).length,
    [grid]
  );
  const totalCells = grid.length * grid[0].length;

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center py-6 px-4 gap-4 relative overflow-hidden"
      style={{ background: "rgb(4,7,14)" }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.07) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[400px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(251,191,36,0.04) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* Grid noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 w-full flex flex-col items-center gap-4">
        <HUD
          moves={moves}
          status={status}
          difficulty={difficulty}
          nonZeroCells={nonZeroCells}
          totalCells={totalCells}
          onNewGame={(d: DifficultyLevel) => startNewGame(d)}
        />

        {/* Game grid with overlay wrapper */}
        <div className="relative w-full max-w-[min(90vw,400px)] mx-auto">
          <Grid
            grid={grid}
            animating={animating}
            onTap={tapCell}
            disabled={status !== "playing"}
          />
          <StatusOverlay
            status={status}
            moves={moves}
            difficulty={difficulty}
            onRestart={(d) => startNewGame(d)}
          />
        </div>

        <RulesPanel />

        {/* Footer */}
        <div
          className="font-mono text-[9px] tracking-widest text-center mt-2"
          style={{ color: "rgba(51,65,85,0.8)" }}
        >
          ZEROGRID v1.0 · 6×6 · TAP TO ZERO ALL CELLS
        </div>
      </div>
    </main>
  );
}
