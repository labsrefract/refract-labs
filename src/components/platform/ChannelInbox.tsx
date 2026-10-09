import { inbox } from "../../content/ai";
import { useLoop } from "../../hooks/useLoop";

// Each message takes PHASES steps: it arrives, the agent thinks, the reply
// streams in over three steps, it is closed, then it holds before the next.
const STEP_MS = 450;
const PHASES = 9;
const STREAM_FROM = 3;
const STREAM_STEPS = 3;
const DONE_AT = STREAM_FROM + STREAM_STEPS;

/** A live inbox: one conversation at a time is handled at the top, the last two sit below. */
export default function ChannelInbox() {
  const { ref, step, reduced } = useLoop<HTMLDivElement>(STEP_MS);
  // Reduced motion: show a finished conversation.
  const tick = reduced ? DONE_AT : step;
  const current = Math.floor(tick / PHASES);
  const phase = reduced ? DONE_AT : tick % PHASES;

  const rows = [0, 1, 2]
    .map((back) => current - back)
    .map((n) => ((n % inbox.length) + inbox.length) % inbox.length);

  return (
    <div ref={ref} className="live-inbox" aria-hidden="true">
      {rows.map((msgIndex, row) => {
        const msg = inbox[msgIndex];
        const isLive = row === 0;
        const p = isLive ? phase : PHASES;
        const words = msg.r.split(" ");
        const shown = p >= DONE_AT ? words.length : Math.ceil((words.length * Math.max(0, p - STREAM_FROM + 1)) / STREAM_STEPS);
        const status = p < 1 ? "new" : p < STREAM_FROM ? "thinking" : p < DONE_AT ? "replying" : msg.s;
        return (
          <div key={`${current - row}-${msgIndex}`} className={isLive ? "live-inbox-row is-live" : "live-inbox-row"}>
            <span className="live-inbox-channel">{msg.c}</span>
            <span className="live-inbox-body">
              <span className="live-inbox-in">{msg.m}</span>
              <span className="live-inbox-reply">
                <span className="live-inbox-arrow">↳</span>
                {p >= 1 && p < STREAM_FROM ? (
                  <span className="live-shimmer" />
                ) : p >= STREAM_FROM ? (
                  words.slice(0, shown).join(" ")
                ) : null}
              </span>
            </span>
            <span className={`live-status is-${status}`}>{status}</span>
          </div>
        );
      })}
    </div>
  );
}
