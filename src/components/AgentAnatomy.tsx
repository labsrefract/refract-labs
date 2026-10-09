import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { LuInbox, LuMessageSquareText, LuScanText, LuShieldCheck, LuZap } from "react-icons/lu";
import { anatomyRuns, type AnatomyRun } from "../content/ai";
import { useLoop } from "../hooks/useLoop";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

// Per request: it arrives, then each of the four stages runs for one step and
// completes on the next, then the finished path holds before the next request.
const STEP_MS = 550;
const PHASES = 14;

type Stage = {
  key: "message" | "read" | "decide" | "act" | "report";
  label: (run: AnatomyRun) => string;
  sub?: string;
  Icon: IconType;
};

const stages: Stage[] = [
  { key: "message", label: (run) => run.channel, Icon: LuMessageSquareText },
  { key: "read", label: () => "Read", sub: "understands it", Icon: LuScanText },
  { key: "decide", label: () => "Decide", sub: "within your rules", Icon: LuShieldCheck },
  { key: "act", label: () => "Act", sub: "in your systems", Icon: LuZap },
  { key: "report", label: () => "Report", sub: "to your team", Icon: LuInbox },
];

/**
 * How an agent handles one request: it reads it, decides within your rules,
 * acts in your systems and reports to your team. A pulse carries each request
 * through the stages; requests loop while the diagram is on screen.
 */
export default function AgentAnatomy() {
  const { ref, step, reduced } = useLoop<HTMLDivElement>(STEP_MS);
  const runIndex = Math.floor(step / PHASES) % anatomyRuns.length;
  const run = anatomyRuns[runIndex];
  const phase = reduced ? PHASES - 1 : step % PHASES;
  // Stage n (1–4) runs at phase 2n−1 and is done from phase 2n.
  const pos = Math.min(stages.length - 1, Math.ceil(phase / 2));

  return (
    <div ref={ref} className="ai-anatomy">
      <p className="sr-only">
        An agent reads each request, decides what to do within the rules you set, acts in your systems and reports back to
        your team. Requests over a limit wait for a person.
      </p>
      <div className="ai-anatomy-head" aria-hidden="true">
        <span className="ai-anatomy-live">
          <span className="ai-anatomy-live-dot" />
          Live
        </span>
        <span>{run.channel} request</span>
        <span className="ai-anatomy-runs">
          {anatomyRuns.map((r, i) => (
            <span key={r.channel} className={i === runIndex ? "is-on" : undefined} />
          ))}
        </span>
      </div>

      {/* Keyed per request so a new one starts from the left instead of sweeping back. */}
      <div key={runIndex} className="ai-anatomy-flow" style={{ "--pos": pos } as Vars} aria-hidden="true">
        <span className="ai-anatomy-track">
          <span className="ai-anatomy-fill" />
        </span>
        <span className="ai-anatomy-pulse" />
        {stages.map((stage, i) => {
          const done = i === 0 || phase >= 2 * i;
          const active = i > 0 && phase === 2 * i - 1;
          const flagged = done && stage.key === "decide" && run.flag;
          const state = flagged ? "is-flag" : active ? "is-active" : done ? "is-done" : "is-idle";
          const text = stage.key === "message" ? run.message : run[stage.key];
          return (
            <div key={stage.key} className={`ai-anatomy-stage ${state}`}>
              <span className="ai-anatomy-node">
                <stage.Icon size={20} strokeWidth={1.75} />
              </span>
              <span className="ai-anatomy-label">
                {stage.label(run)}
                {stage.sub ? <span className="ai-anatomy-sub">{stage.sub}</span> : null}
              </span>
              <span key={`${runIndex}-${done}`} className={i === 0 ? "ai-anatomy-caption is-message" : "ai-anatomy-caption"}>
                {done ? text : active ? <span className="live-shimmer" /> : null}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
