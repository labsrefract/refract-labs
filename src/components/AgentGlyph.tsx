import type { IconType } from "react-icons";
import {
  LuArrowLeftRight,
  LuAudioLines,
  LuHandCoins,
  LuHeadset,
  LuIdCard,
  LuLayoutDashboard,
  LuPlug,
  LuTrendingUp,
  LuUsers,
} from "react-icons/lu";
import type { GlyphKind } from "../content/ai";

const icons: Record<GlyphKind, IconType> = {
  circle: LuHeadset, // Support
  bars: LuHandCoins, // Collections
  frame: LuIdCard, // Onboarding
  rings: LuArrowLeftRight, // Reconciliation
  tri: LuTrendingUp, // Sales
  wave: LuAudioLines, // Voice
  square: LuLayoutDashboard, // Custom platforms
  link: LuPlug, // Integrations & APIs
  dots: LuUsers, // Dedicated teams
};

/** Agent or service icon in a small framed tile, drawn in `currentColor`. */
export default function AgentGlyph({ kind, size = 40, className = "" }: { kind: GlyphKind; size?: number; className?: string }) {
  const Icon = icons[kind];
  return (
    <span className={`ai-glyph ${className}`.trim()} style={{ width: size, height: size }} aria-hidden="true">
      <Icon size={Math.max(16, Math.round(size * 0.5))} strokeWidth={1.75} />
    </span>
  );
}
