"use client";

import React from "react";
import Cell from "./Cell";
import type { AnimatingCell } from "@/types/game";

type GridProps = {
  grid: number[][];
  animating: AnimatingCell[];
  onTap: (row: number, col: number) => void;
  disabled: boolean;
};

export default function Grid({ grid, animating, onTap, disabled }: GridProps) {
  return (
    <div
      className="relative w-full max-w-[min(90vw,400px)] mx-auto"
      role="grid"
      aria-label="ZeroGrid puzzle"
    >
      {/* Outer glow frame */}
      <div
        className="absolute -inset-1 rounded-lg opacity-40"
        style={{
          background:
            "linear-gradient(135deg, rgba(14,165,233,0.3), rgba(251,191,36,0.3))",
          filter: "blur(8px)",
          zIndex: 0,
        }}
      />

      <div
        className="relative grid gap-1 p-2 rounded-lg z-10"
        style={{
          gridTemplateColumns: `repeat(6, 1fr)`,
          background: "rgba(8,12,20,0.95)",
          border: "1px solid rgba(14,165,233,0.2)",
          boxShadow:
            "0 0 30px rgba(14,165,233,0.1), inset 0 0 20px rgba(0,0,0,0.5)",
        }}
      >
        {grid.map((row, rIdx) =>
          row.map((value, cIdx) => (
            <Cell
              key={`${rIdx}-${cIdx}`}
              value={value}
              row={rIdx}
              col={cIdx}
              allGrid={grid}
              animating={animating}
              onTap={onTap}
              disabled={disabled}
            />
          ))
        )}
      </div>
    </div>
  );
}
