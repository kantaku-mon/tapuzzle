"use client";

import React from "react";
import type { GameStatus, DifficultyLevel } from "@/types/game";
import { DIFFICULTY_CONFIGS } from "@/lib/gameLogic";

type StatusOverlayProps = {
  status: GameStatus;
  moves: number;
  difficulty: DifficultyLevel;
  onRestart: (diff?: DifficultyLevel) => void;
};

export default function StatusOverlay({
  status,
  moves,
  difficulty,
  onRestart,
}: StatusOverlayProps) {
  if (status === "playing") return null;

  const isClear = status === "clear";

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center rounded-lg">
      {/* Backdrop */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: isClear
            ? "rgba(0,15,5,0.88)"
            : "rgba(15,0,0,0.88)",
          backdropFilter: "blur(4px)",
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center gap-5 p-6 rounded-lg animate-fade-in"
        style={{
          border: isClear
            ? "1px solid rgba(34,197,94,0.4)"
            : "1px solid rgba(220,38,38,0.4)",
          boxShadow: isClear
            ? "0 0 40px rgba(34,197,94,0.25)"
            : "0 0 40px rgba(220,38,38,0.25)",
          background: isClear
            ? "rgba(0,30,10,0.8)"
            : "rgba(30,0,0,0.8)",
          minWidth: "220px",
        }}
      >
        {/* Status title */}
        <div
          className="font-display text-2xl sm:text-3xl font-black tracking-widest"
          style={{
            color: isClear ? "rgb(34,197,94)" : "rgb(248,113,113)",
            textShadow: isClear
              ? "0 0 20px rgba(34,197,94,0.8)"
              : "0 0 20px rgba(220,38,38,0.8)",
          }}
        >
          {isClear ? "CLEARED" : "GAME OVER"}
        </div>

        {/* Sub message */}
        <div className="font-mono text-sm text-center" style={{ color: "rgba(156,163,175,0.9)" }}>
          {isClear ? (
            <>
              <span style={{ color: "rgba(34,197,94,0.9)" }}>ALL CELLS ZEROED</span>
              <br />
              <span>in {moves} moves</span>
            </>
          ) : (
            <>
              <span style={{ color: "rgba(248,113,113,0.9)" }}>NEGATIVE CELL DETECTED</span>
              <br />
              <span>{moves} moves taken</span>
            </>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 w-full">
          <button
            onClick={() => onRestart(difficulty)}
            className="font-mono text-sm font-bold tracking-widest py-2.5 px-5 rounded transition-all duration-150 hover:brightness-125 active:scale-95 w-full"
            style={{
              background: isClear
                ? "rgba(34,197,94,0.15)"
                : "rgba(248,113,113,0.15)",
              border: isClear
                ? "1px solid rgba(34,197,94,0.5)"
                : "1px solid rgba(248,113,113,0.5)",
              color: isClear ? "rgb(34,197,94)" : "rgb(248,113,113)",
            }}
          >
            RETRY ({DIFFICULTY_CONFIGS[difficulty].label})
          </button>

          <div className="flex gap-2 w-full">
            {(["easy", "normal", "hard"] as DifficultyLevel[])
              .filter((d) => d !== difficulty)
              .map((d) => (
                <button
                  key={d}
                  onClick={() => onRestart(d)}
                  className="font-mono text-xs tracking-wider py-2 flex-1 rounded transition-all duration-150 hover:brightness-125 active:scale-95"
                  style={{
                    background: "rgba(14,165,233,0.08)",
                    border: "1px solid rgba(14,165,233,0.25)",
                    color: "rgba(14,165,233,0.8)",
                  }}
                >
                  {DIFFICULTY_CONFIGS[d].label}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
