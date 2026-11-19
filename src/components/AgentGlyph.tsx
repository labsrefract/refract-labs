import type { GlyphKind } from "../content/ai";
import ServiceArt, { type ServiceArtKind } from "./ServiceArt";

/** Clay illustration for each agent (and the Refract Software links on the AI page). */
const art: Record<GlyphKind, ServiceArtKind> = {
  circle: "headset", // Support
  bars: "coins", // Collections
  frame: "idcard", // Onboarding
  rings: "swap", // Reconciliation
  tri: "chart", // Sales
  wave: "wave", // Voice
  square: "monitor", // Custom platforms
  link: "link", // Integrations & APIs
  dots: "team", // Dedicated teams
};

/** Agent or service illustration at a given size, in the site's clay style. */
export default function AgentGlyph({ kind, size = 40, className = "" }: { kind: GlyphKind; size?: number; className?: string }) {
  return (
    <span className={`ai-glyph ${className}`.trim()} style={{ width: size, height: size }} aria-hidden="true">
      <ServiceArt kind={art[kind]} />
    </span>
  );
}
