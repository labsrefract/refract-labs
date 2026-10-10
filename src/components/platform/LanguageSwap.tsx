import { languages } from "../../content/ai";
import { useLoop } from "../../hooks/useLoop";

// Per language: the customer's message lands, the language is detected, the
// reply types out a few characters per step, then it holds.
const STEP_MS = 90;
const DETECT_AT = 6;
const TYPE_FROM = 12;
const CHARS_PER_STEP = 2;
const HOLD = 28;
const phasesFor = (reply: string) => TYPE_FROM + Math.ceil(reply.length / CHARS_PER_STEP) + HOLD;
const cycle = languages.reduce((n, l) => n + phasesFor(l.t), 0);

function locate(t: number) {
  let left = t % cycle;
  for (let i = 0; i < languages.length; i++) {
    const n = phasesFor(languages[i].t);
    if (left < n) return { index: i, phase: left };
    left -= n;
  }
  return { index: 0, phase: 0 };
}

/** The customer writes in one language; the agent detects it and replies in the same one. */
export default function LanguageSwap() {
  const { ref, step, reduced } = useLoop<HTMLDivElement>(STEP_MS);
  const { index, phase } = reduced ? { index: 0, phase: phasesFor(languages[0].t) - 1 } : locate(step);
  const lang = languages[index];
  const typed = lang.t.slice(0, Math.max(0, (phase - TYPE_FROM) * CHARS_PER_STEP));
  const typing = phase >= TYPE_FROM && typed.length < lang.t.length;

  return (
    <div ref={ref} className="live-lang" aria-hidden="true">
      <div className="live-lang-pills">
        {languages.map((l, i) => (
          <span key={l.c} className={i === index && phase >= DETECT_AT ? "live-lang-pill is-on" : "live-lang-pill"}>
            {l.c}
          </span>
        ))}
        <span className="live-lang-detect">{phase >= DETECT_AT ? `Detected: ${lang.name}` : "Detecting…"}</span>
      </div>
      <div key={index} className="live-lang-thread">
        <span className="live-bubble is-in" lang={lang.c.toLowerCase()}>
          {lang.ask}
        </span>
        {phase >= TYPE_FROM ? (
          <span className="live-bubble is-out" lang={lang.c.toLowerCase()}>
            {typed}
            {typing ? <span className="ai-caret" /> : null}
          </span>
        ) : phase >= DETECT_AT ? (
          <span className="live-bubble is-out is-thinking">
            <span className="live-shimmer" />
          </span>
        ) : null}
      </div>
    </div>
  );
}
