
type Breakpoint = "xs" | "sm" | "md" | "lg";
export function getBreakpoint(width: number): Breakpoint {
  if (width < 480) return "xs";
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  return "lg";
}

export const LAYOUT_CONFIG: Record<
  Breakpoint,
  { cardW: number; cardH: number; columns: number; graphHeight: string; colGapExtra: number; rowGapExtra: number }
> = {
  xs: { cardW: 150, cardH: 96, columns: 1, graphHeight: "72vh", colGapExtra: 40, rowGapExtra: 36 },
  sm: { cardW: 180, cardH: 104, columns: 2, graphHeight: "68vh", colGapExtra: 60, rowGapExtra: 44 },
  md: { cardW: 210, cardH: 112, columns: 2, graphHeight: "620px", colGapExtra: 90, rowGapExtra: 56 },
  lg: { cardW: 230, cardH: 120, columns: 3, graphHeight: "680px", colGapExtra: 110, rowGapExtra: 64 },
};