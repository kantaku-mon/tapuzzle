"use client";

import React from "react";
import type { AnimatingCell } from "@/types/game";
import { getMaxValue } from "@/lib/gameLogic";

type CellProps = {
  value: number;
  row: number;
  col: number;
  allGrid: number[][];
  animating: AnimatingCell[];
  onTap: (row: number, col: number) => void;
  disabled: boolean;
};

export default function Cell({
  value,
  row,
  col,
  allGrid,
  animating,
  onTap,
  disabled,
}: CellProps) {
  const maxVal = getMaxValue(allGrid);
  const ratio = maxVal > 0 ? value / maxVal : 0;

  const tapAnim = animating.find(
    (a) => a.row === row && a.col === col && a.type === "tap"
  );
  const affectAnim = animating.find(
    (a) => a.row === row && a.col === col && a.type === "affect"
  );
  const isAnimating = !!(tapAnim || affectAnim);

  // Colour logic: zero = dark, positive scales from dim-cyan to bright-amber
  const getBgStyle = (): React.CSSProperties => {
    if (value === 0) {
      return {
        background: "rgba(15,20,30,0.9)",
        border: "1px solid rgba(34,197,94,0.25)",
        boxShadow: "inset 0 0 8px rgba(34,197,94,0.08)",
      };
    }
    if (value < 0) {
      return {
        background: "rgba(220,38,38,0.25)",
        border: "1px solid rgba(220,38,38,0.7)",
        boxShadow: "0 0 16px rgba(220,38,38,0.5)",
      };
    }
    // Interpolate colour: low = teal/cyan, high = amber/orange
    const r = Math.round(20 + ratio * 231);
    const g = Math.round(184 - ratio * 47);
    const b = Math.round(166 - ratio * 147);
    const alpha = 0.15 + ratio * 0.45;
    const glowAlpha = ratio * 0.6;
    return {
      background: `rgba(${r},${g},${b},${alpha})`,
      border: `1px solid rgba(${r},${g},${b},0.6)`,
      boxShadow: `0 0 ${Math.round(4 + ratio * 20)}px rgba(${r},${g},${b},${glowAlpha}), inset 0 0 6px rgba(${r},${g},${b},0.1)`,
    };
  };

  const getTextColor = (): string => {
    if (value === 0) return "rgba(34,197,94,0.5)";
    if (value < 0) return "rgb(248,113,113)";
    const r = Math.round(20 + ratio * 231);
    const g = Math.round(184 - ratio * 47);
    const b = Math.round(166 - ratio * 147);
    return `rgb(${r},${g},${b})`;
  };

  const handleClick = () => {
    if (!disabled) onTap(row, col);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || value === 0}
      aria-label={`Cell row ${row + 1} col ${col + 1} value ${value}`}
      style={getBgStyle()}
      className={[
        "relative flex items-center justify-center",
        "rounded-sm select-none outline-none",
        "transition-all duration-150",
        "w-full aspect-square",
        isAnimating ? "scale-90" : "scale-100",
        tapAnim ? "brightness-150" : "",
        !disabled && value > 0
          ? "cursor-pointer hover:brightness-125 hover:scale-95 active:scale-90"
          : value === 0
          ? "cursor-default"
          : "cursor-not-allowed",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Ripple effect on tap */}
      {tapAnim && (
        <span
          className="absolute inset-0 rounded-sm animate-ripple"
          style={{ background: "rgba(251,191,36,0.35)", zIndex: 10 }}
        />
      )}
      {affectAnim && (
        <span
          className="absolute inset-0 rounded-sm animate-ripple"
          style={{ background: "rgba(56,189,248,0.25)", zIndex: 10 }}
        />
      )}

      <span
        className="font-mono text-base sm:text-lg font-bold tabular-nums z-20 relative"
        style={{ color: getTextColor(), textShadow: `0 0 10px ${getTextColor()}` }}
      >
        {value}
      </span>
    </button>
  );
}
