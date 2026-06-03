"use client";

import React, { useState } from "react";

export default function RulesPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-[min(90vw,400px)] mx-auto">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full font-mono text-[10px] tracking-widest py-2 rounded transition-all duration-150 hover:brightness-125"
        style={{
          background: "rgba(8,12,20,0.9)",
          border: "1px solid rgba(14,165,233,0.15)",
          color: "rgba(100,116,139,0.8)",
        }}
      >
        {open ? "▲ HIDE RULES" : "▼ HOW TO PLAY"}
      </button>

      {open && (
        <div
          className="mt-1 rounded p-4 font-mono text-xs animate-fade-in"
          style={{
            background: "rgba(8,12,20,0.95)",
            border: "1px solid rgba(14,165,233,0.12)",
            color: "rgba(148,163,184,0.9)",
            lineHeight: "1.7",
          }}
        >
          <ul className="space-y-2">
            <li>
              <span style={{ color: "rgb(251,191,36)" }}>▸</span>{" "}
              Tap a cell to decrease it and up to 4 adjacent cells by{" "}
              <span style={{ color: "rgb(14,165,233)" }}>1</span>.
            </li>
            <li>
              <span style={{ color: "rgb(251,191,36)" }}>▸</span>{" "}
              <span style={{ color: "rgb(34,197,94)" }}>Goal:</span> reduce ALL
              cells to{" "}
              <span style={{ color: "rgb(34,197,94)" }}>zero</span>.
            </li>
            <li>
              <span style={{ color: "rgb(251,191,36)" }}>▸</span>{" "}
              <span style={{ color: "rgb(248,113,113)" }}>Game Over</span> if
              any cell goes{" "}
              <span style={{ color: "rgb(248,113,113)" }}>negative</span>.
            </li>
            <li>
              <span style={{ color: "rgb(251,191,36)" }}>▸</span>{" "}
              Every puzzle is guaranteed solvable — the numbers were generated
              by applying the same tap logic in reverse.
            </li>
          </ul>

          <div
            className="mt-3 pt-3 text-[10px]"
            style={{
              borderTop: "1px solid rgba(14,165,233,0.1)",
              color: "rgba(100,116,139,0.7)",
            }}
          >
            TIP: Corner cells affect 3 cells, edge cells affect 4, inner cells
            affect 5.
          </div>
        </div>
      )}
    </div>
  );
}
