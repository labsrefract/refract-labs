import type { CSSProperties } from "react";
import { volumeBars, volumePeak } from "../../content/ai";
import { useLoop } from "../../hooks/useLoop";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

const STEP_MS = 260;
const HOLD = 8;
// Roughly one agent per 11% of the busiest day's volume.
const agentsFor = (h: number) => Math.max(2, Math.ceil(h / 11));

/**
 * The month plays out day by day. As volume climbs to the month-end peak,
 * capacity rises with it and more agents come online, so the queue stays empty.
 */
export default function VolumeChart() {
  const { ref, step, reduced } = useLoop<HTMLDivElement>(STEP_MS);
  const day = reduced ? volumePeak : Math.min(step % (volumeBars.length + HOLD), volumeBars.length - 1);
  const height = volumeBars[day];

  return (
    <div ref={ref} className="live-volume" aria-hidden="true">
      <div className="live-volume-stats">
        <span>
          Day <strong>{day + 1}</strong>
        </span>
        <span>
          Agents running <strong className="ai-accent-text">{agentsFor(height)}</strong>
        </span>
        <span>
          Queue <strong>0</strong>
        </span>
      </div>
      <div className="live-volume-chart">
        <span className="live-volume-capacity" style={{ "--h": `${Math.min(100, height + 6)}%` } as Vars} />
        {volumeBars.map((h, i) => (
          <span
            key={i}
            className={[i <= day ? "is-past" : "", i === day ? "is-now" : "", i === volumePeak ? "is-peak" : ""].join(" ").trim()}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="ai-bars-axis">
        <span>1st</span>
        <span>15th</span>
        <span className="ai-accent-text">month-end</span>
      </div>
    </div>
  );
}
