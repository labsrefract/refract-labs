import type { CSSProperties } from "react";
import { hubCalls } from "../../content/ai";
import { useLoop } from "../../hooks/useLoop";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

const STEP_MS = 1300;
// Where each node sits relative to the core, clockwise from the top.
const placement = ["is-top", "is-right", "is-bottom", "is-left"];
const pulseTo: [number, number][] = [
  [0, -78],
  [86, 0],
  [0, 78],
  [-86, 0],
];

/** The AI core sends a pulse to one system at a time; the node lights and the call is shown. */
export default function SystemHub() {
  const { ref, step } = useLoop<HTMLDivElement>(STEP_MS);
  const active = step % hubCalls.length;
  const [dx, dy] = pulseTo[active];

  return (
    <div ref={ref} className="ai-hub live-hub" aria-hidden="true">
      <span className="ai-hub-v" />
      <span className="ai-hub-h" />
      <span key={step} className="live-hub-pulse" style={{ "--dx": `${dx}px`, "--dy": `${dy}px` } as Vars} />
      <span className="ai-hub-core">AI</span>
      {hubCalls.map((h, i) => (
        <span key={h.node} className={`ai-hub-node ${placement[i]} ${i === active ? "is-active" : ""}`.trim()}>
          {h.node}
        </span>
      ))}
      <span key={`call-${step}`} className="live-hub-call">
        {hubCalls[active].call}() <span className="live-ok">✓</span>
      </span>
    </div>
  );
}
