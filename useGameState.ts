"use client";

import { useState, useCallback } from "react";
import type { GameStatus, CellPosition, AnimatingCell } from "@/types/game";
import type { DifficultyLevel } from "@/types/game";
import {
  generatePuzzle,
  applyTap,
  isCleared,
  hasNegative,
  getAffectedCells,
} from "@/lib/gameLogic";

export function useGameState(initialDifficulty: DifficultyLevel = "normal") {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(initialDifficulty);
  const [{ grid, solution }, setPuzzle] = useState(() =>
    generatePuzzle(initialDifficulty)
  );
  const [status, setStatus] = useState<GameStatus>("playing");
  const [moves, setMoves] = useState(0);
  const [animating, setAnimating] = useState<AnimatingCell[]>([]);

  const startNewGame = useCallback(
    (diff?: DifficultyLevel) => {
      const d = diff ?? difficulty;
      setDifficulty(d);
      setPuzzle(generatePuzzle(d));
      setStatus("playing");
      setMoves(0);
      setAnimating([]);
    },
    [difficulty]
  );

  const tapCell = useCallback(
    (row: number, col: number) => {
      if (status !== "playing") return;

      const affected = getAffectedCells(row, col);
      const newGrid = applyTap(grid, row, col);

      // Build animation list
      const newAnimating: AnimatingCell[] = [
        { row, col, type: "tap" },
        ...affected
          .filter((c) => !(c.row === row && c.col === col))
          .map((c) => ({ ...c, type: "affect" as const })),
      ];
      setAnimating(newAnimating);
      setTimeout(() => setAnimating([]), 400);

      // Check conditions
      if (hasNegative(newGrid)) {
        setPuzzle((prev) => ({ ...prev, grid: newGrid }));
        setStatus("gameover");
        setMoves((m) => m + 1);
        return;
      }

      setPuzzle((prev) => ({ ...prev, grid: newGrid }));
      setMoves((m) => m + 1);

      if (isCleared(newGrid)) {
        setStatus("clear");
      }
    },
    [grid, status]
  );

  return {
    grid,
    status,
    moves,
    solution,
    difficulty,
    animating,
    tapCell,
    startNewGame,
  };
}

export type UseGameStateReturn = ReturnType<typeof useGameState>;

export type { CellPosition };
