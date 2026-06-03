"use client";

import React from "react";
import type { DifficultyLevel, GameStatus } from "@/types/game";
import { DIFFICULTY_CONFIGS } from "@/lib/gameLogic";

type HUDProps = {
  moves: number;
  status: GameStatus;
  difficulty: DifficultyLevel;
  nonZeroCells: number;
  totalCells: number;
  onNewGame: (diff: DifficultyLevel) => void;
};

export default function HUD({
  moves,
  status,
  difficulty,
  nonZeroCells,
  totalCells,
  onNewGame,
}: HUDProps) {
  const progress = ((totalCells - nonZeroCells) / totalCells) * 100;

  return (
    <div className="w-full max-w-[min(90vw,400px)] mx-auto flex flex-col gap-3">
      {/* Title row */}
      <div className="flex items-center justify-between">
        <h1
          className="font-display text-xl sm:text-2xl font-black tracking-[0.15em]"
          style={{
            color: "rgb(14,165,233)",
            textShadow: "0 0 20px rgba(14,165,233,0.6)",
          }}
        >
          ZEROGRID
        </h1>
        <div
          className="font-mono text-[10px] tracking-widest px-2 py-1 rounded"
          style={{
            background: "rgba(14,165,233,0.08)",
            border: "1px solid rgba(14,165,233,0.2)",
            color: "rgba(14,165,233,0.7)",
          }}
        >
          {DIFFICULTY_CONFIGS[difficulty].label}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-3">
        <div
          className="flex-1 rounded p-2 flex flex-col items-center"
          style={{
            background: "rgba(8,12,20,0.9)",
            border: "1px solid rgba(14,165,233,0.15)",
          }}
        >
          <span
            className="font-mono text-[9px] tracking-widest mb-0.5"
            style={{ color: "rgba(100,116,139,0.9)" }}
          >
            MOVES
          </span>
          <span
            className="font-mono text-xl font-bold tabular-nums"
            style={{ color: "rgb(251,191,36)", textShadow: "0 0 8px rgba(251,191,36,0.5)" }}
          >
            {moves}
          </span>
        </div>

        <div
          className="flex-1 rounded p-2 flex flex-col items-center"
          style={{
            background: "rgba(8,12,20,0.9)",
            border: "1px solid rgba(14,165,233,0.15)",
          }}
        >
          <span
            className="font-mono text-[9px] tracking-widest mb-0.5"
            style={{ color: "rgba(100,116,139,0.9)" }}
          >
            REMAINING
          </span>
          <span
            className="font-mono text-xl font-bold tabular-nums"
            style={{
              color: nonZeroCells === 0 ? "rgb(34,197,94)" : "rgb(14,165,233)",
              textShadow:
                nonZeroCells === 0
                  ? "0 0 8px rgba(34,197,94,0.6)"
                  : "0 0 8px rgba(14,165,233,0.4)",
            }}
          >
            {nonZeroCells}
          </span>
        </div>

        <div
          className="flex-1 rounded p-2 flex flex-col items-center"
          style={{
            background: "rgba(8,12,20,0.9)",
            border: "1px solid rgba(14,165,233,0.15)",
          }}
        >
          <span
            className="font-mono text-[9px] tracking-widest mb-0.5"
            style={{ color: "rgba(100,116,139,0.9)" }}
          >
            STATUS
          </span>
          <span
            className="font-mono text-xs font-bold tracking-widest"
            style={{
              color:
                status === "clear"
                  ? "rgb(34,197,94)"
                  : status === "gameover"
                  ? "rgb(248,113,113)"
                  : "rgba(148,163,184,0.8)",
              textShadow:
                status === "clear"
                  ? "0 0 8px rgba(34,197,94,0.6)"
                  : status === "gameover"
                  ? "0 0 8px rgba(220,38,38,0.6)"
                  : "none",
            }}
          >
            {status === "clear"
              ? "WIN"
              : status === "gameover"
              ? "FAIL"
              : "PLAY"}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="w-full h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.1)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            background:
              progress === 100
                ? "linear-gradient(90deg, rgb(34,197,94), rgb(134,239,172))"
                : "linear-gradient(90deg, rgb(14,165,233), rgb(251,191,36))",
            boxShadow:
              progress === 100
                ? "0 0 8px rgba(34,197,94,0.6)"
                : "0 0 6px rgba(14,165,233,0.4)",
          }}
        />
      </div>

      {/* Difficulty selector */}
      <div className="flex gap-2">
        {(["easy", "normal", "hard"] as DifficultyLevel[]).map((d) => (
          <button
            key={d}
            onClick={() => onNewGame(d)}
            className="flex-1 font-mono text-[10px] tracking-widest py-1.5 rounded transition-all duration-150 hover:brightness-125 active:scale-95"
            style={{
              background:
                d === difficulty
                  ? "rgba(14,165,233,0.2)"
                  : "rgba(14,165,233,0.05)",
              border:
                d === difficulty
                  ? "1px solid rgba(14,165,233,0.5)"
                  : "1px solid rgba(14,165,233,0.12)",
              color:
                d === difficulty
                  ? "rgb(14,165,233)"
                  : "rgba(100,116,139,0.7)",
              boxShadow:
                d === difficulty
                  ? "0 0 8px rgba(14,165,233,0.2)"
                  : "none",
            }}
          >
            {DIFFICULTY_CONFIGS[d].label}
          </button>
        ))}
      </div>
    </div>
  );
}
