import { auditLog } from "../../content/ai";
import { useLoop } from "../../hooks/useLoop";

const STEP_MS = 1400;
const VISIBLE = 5;
// Clock for the first entry, in seconds after midnight (09:41:02).
const START = 9 * 3600 + 41 * 60 + 2;

const clock = (s: number) =>
  [Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60].map((n) => String(n).padStart(2, "0")).join(":");

/** A live audit trail: a new entry types in every step and older ones scroll away. */
export default function LiveLog() {
  const { ref, step } = useLoop<HTMLDivElement>(STEP_MS);
  const newest = step + VISIBLE - 1;
  const rows = Array.from({ length: VISIBLE }, (_, i) => newest - (VISIBLE - 1) + i);

  return (
    <div ref={ref} className="ai-log live-log" aria-hidden="true">
      {rows.map((n) => {
        const row = auditLog[n % auditLog.length];
        return (
          <div key={n} className={n === newest && step > 0 ? "is-new" : undefined}>
            <span className="ai-log-time">{clock(START + n * 2)}</span>
            {"  "}
            <span className={row.actor === "policy" ? "ai-log-policy" : "ai-log-actor"}>{row.actor.padEnd(9, " ")}</span>
            {row.action}
            {row.result ? <span className="ai-log-ok">{row.result}</span> : null}
          </div>
        );
      })}
      <div className="live-log-cursor">
        <span className="ai-caret" />
      </div>
    </div>
  );
}
