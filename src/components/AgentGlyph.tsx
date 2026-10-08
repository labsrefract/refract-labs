import type { CSSProperties } from "react";
import type { GlyphKind } from "../content/ai";

type Part = [left: number, top: number, width: number, height: number, extra?: CSSProperties];

const outline: CSSProperties = { background: "transparent", border: "2px solid currentColor" };
const round: CSSProperties = { borderRadius: "50%" };

const glyphs: Record<GlyphKind, Part[]> = {
  circle: [[3, 3, 14, 14, round]],
  bars: [
    [1, 4, 18, 4],
    [1, 12, 11, 4],
  ],
  frame: [
    [1, 1, 18, 18, outline],
    [10, 10, 8, 8],
  ],
  rings: [
    [0, 4, 12, 12, { ...outline, ...round }],
    [8, 4, 12, 12, round],
  ],
  tri: [
    [
      2,
      3,
      0,
      0,
      {
        background: "transparent",
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderBottom: "14px solid currentColor",
      },
    ],
  ],
  wave: [
    [2, 7, 3, 7],
    [8, 2, 3, 16],
    [14, 5, 3, 10],
  ],
  square: [[2, 2, 16, 16]],
  link: [
    [0, 5, 11, 11, outline],
    [9, 5, 11, 11],
  ],
  dots: [
    [1, 8, 4, 4, round],
    [8, 8, 4, 4, round],
    [15, 8, 4, 4, round],
  ],
};

/** Small geometric mark used as an agent or service icon, drawn in `currentColor`. */
export default function AgentGlyph({ kind, size = 40, className = "" }: { kind: GlyphKind; size?: number; className?: string }) {
  return (
    <span className={`ai-glyph ${className}`.trim()} style={{ width: size, height: size }} aria-hidden="true">
      <span className="ai-glyph-art">
        {glyphs[kind].map(([left, top, width, height, extra], i) => (
          <span key={i} style={{ position: "absolute", left, top, width, height, background: "currentColor", ...extra }} />
        ))}
      </span>
    </span>
  );
}
