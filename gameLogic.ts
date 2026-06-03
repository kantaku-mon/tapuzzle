import type { Grid, CellPosition, DifficultyConfig, DifficultyLevel } from "@/types/game";

export const GRID_SIZE = 6;

export const DIFFICULTY_CONFIGS: Record<DifficultyLevel, DifficultyConfig> = {
  easy: {
    label: "EASY",
    minTaps: 5,
    maxTaps: 8,
    tapCount: 6,
  },
  normal: {
    label: "NORMAL",
    minTaps: 8,
    maxTaps: 14,
    tapCount: 10,
  },
  hard: {
    label: "HARD",
    minTaps: 14,
    maxTaps: 22,
    tapCount: 16,
  },
};

/**
 * Returns the neighbors (including self) of a cell that get affected by a tap.
 */
export function getAffectedCells(row: number, col: number): CellPosition[] {
  const cells: CellPosition[] = [{ row, col }];
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  for (const [dr, dc] of directions) {
    const nr = row + dr;
    const nc = col + dc;
    if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
      cells.push({ row: nr, col: nc });
    }
  }
  return cells;
}

/**
 * Apply a tap to the grid (decrements affected cells). Returns new grid.
 */
export function applyTap(grid: Grid, row: number, col: number): Grid {
  const newGrid = grid.map((r) => [...r]);
  const affected = getAffectedCells(row, col);
  for (const { row: r, col: c } of affected) {
    newGrid[r][c] -= 1;
  }
  return newGrid;
}

/**
 * Apply an "inverse tap" (increments affected cells). Used for puzzle generation.
 */
function applyInverseTap(grid: Grid, row: number, col: number): Grid {
  const newGrid = grid.map((r) => [...r]);
  const affected = getAffectedCells(row, col);
  for (const { row: r, col: c } of affected) {
    newGrid[r][c] += 1;
  }
  return newGrid;
}

/**
 * Creates an empty GRID_SIZE × GRID_SIZE grid of zeros.
 */
function createEmptyGrid(): Grid {
  return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
}

/**
 * Generates a solvable puzzle grid by applying random inverse taps.
 * Returns the initial grid and the solution sequence.
 */
export function generatePuzzle(difficulty: DifficultyLevel): {
  grid: Grid;
  solution: CellPosition[];
} {
  const config = DIFFICULTY_CONFIGS[difficulty];
  let grid = createEmptyGrid();
  const solution: CellPosition[] = [];

  const tapCount =
    config.minTaps +
    Math.floor(Math.random() * (config.maxTaps - config.minTaps + 1));

  for (let i = 0; i < tapCount; i++) {
    const row = Math.floor(Math.random() * GRID_SIZE);
    const col = Math.floor(Math.random() * GRID_SIZE);
    grid = applyInverseTap(grid, row, col);
    solution.push({ row, col });
  }

  return { grid, solution };
}

/**
 * Check if all cells are zero (victory condition).
 */
export function isCleared(grid: Grid): boolean {
  return grid.every((row) => row.every((cell) => cell === 0));
}

/**
 * Check if any cell is negative (game over condition).
 */
export function hasNegative(grid: Grid): boolean {
  return grid.some((row) => row.some((cell) => cell < 0));
}

/**
 * Returns the maximum value in the grid (used for colour scaling).
 */
export function getMaxValue(grid: Grid): number {
  return Math.max(...grid.flat(), 1);
}
