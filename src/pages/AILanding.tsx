import {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Link, useSearchParams } from "react-router";
import { LuWorkflow } from "react-icons/lu";
import AgentAnatomy from "../components/AgentAnatomy";
import AgentGlyph from "../components/AgentGlyph";
import ReachGlobe from "../components/ReachGlobe";
import ApprovalQueue from "../components/platform/ApprovalQueue";
import ChannelInbox from "../components/platform/ChannelInbox";
import LanguageSwap from "../components/platform/LanguageSwap";
import LiveLog from "../components/platform/LiveLog";
import PrivacyScan from "../components/platform/PrivacyScan";
import SystemHub from "../components/platform/SystemHub";
import VolumeChart from "../components/platform/VolumeChart";
import { site } from "../content/site";
import { usePageMeta } from "../hooks/usePageMeta";
import { useSnapScroll } from "../hooks/useSnapScroll";
import {
  agentPath,
  agents,
  DEMO_PATH,
  demoPathFor,
  firstProcesses,
  type FirstProcessId,
  faqGroups,
  industries,
  scenarios,
  type Scenario,
  softwareLinks,
  steps,
} from "../content/ai";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <span className="ai-eyebrow">
      <span className="ai-eyebrow-index">{index}</span>
      <span className="ai-eyebrow-rule" />
      {label}
    </span>
  );
}

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Becomes true, once, when the element enters the viewport shrunk by
 * `rootMargin`. With reduced motion it is true straight away.
 */
function useInView<T extends HTMLElement>(rootMargin = "0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        setInView(true);
        io.disconnect();
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, inView] as const;
}

/** True once the surrounding <InView> block has scrolled far enough into view. */
const LiveContext = createContext(false);

type InViewTag = "div" | "span" | "section";

/**
 * Adds `is-in` once the block is in view (so headings inside it unmask and
 * demos inside it play) and shares that state through LiveContext. Give it
 * the `ai-rise` class to also rise in step with the scroll; `col` staggers
 * blocks that sit side by side.
 */
function InView({
  as: Tag = "div",
  col = 0,
  rootMargin = "0px 0px -25% 0px",
  className = "",
  style,
  children,
  "aria-hidden": ariaHidden,
}: {
  as?: InViewTag;
  col?: number;
  rootMargin?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  "aria-hidden"?: boolean | "true";
}) {
  const [ref, inView] = useInView<HTMLElement>(rootMargin);
  const Comp = Tag as ElementType;
  return (
    <Comp
      ref={ref}
      className={`${className} ${inView ? "is-in" : ""}`.trim()}
      style={{ ...style, "--col": col } as Vars}
      aria-hidden={ariaHidden}
    >
      <LiveContext.Provider value={inView}>{children}</LiveContext.Provider>
    </Comp>
  );
}

/**
 * Heading whose lines slide up from behind a mask once an ancestor has
 * `is-in`. Words are grouped into lines by where they wrap, so each line
 * moves as one.
 */
function MaskLines({
  text,
  className = "",
  style,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const assign = () => {
      let top: number | null = null;
      let line = -1;
      el.querySelectorAll<HTMLElement>(".ai-mask-word").forEach((w) => {
        if (w.offsetTop !== top) {
          top = w.offsetTop;
          line++;
        }
        w.style.setProperty("--line", String(line));
      });
    };
    assign();
    const ro = new ResizeObserver(assign);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <h2 ref={ref} className={`ai-mask-lines ${className}`.trim()} style={style}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="ai-mask-word">
            <span>{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h2>
  );
}

/* ── 01 Hero ─────────────────────────────────────────────── */

// The circuit is drawn in a 1200×440 box that scales as one piece, so the
// wires always land on the tiles. Each wire leaves the chip in a parallel
// bundle, then fans out at 45° near its end. Each side also has one short
// wire that ends in a pad instead of a tile; the bottom wires run straight down.
const BOX = { w: 1200, h: 440 };
const CHIP = { cx: 600, cy: 218, size: 80 };
const TILE = 52;
const WIRE_GAP = 16;
const FAN_X = 330; // where the side bundles start to fan out
const STUB = 210; // length of the pad-ended wire on each side
const END = 14; // length of the thick section at each end of a wire

type Pt = [number, number];
type Wire = { d: string; len: number; tile?: { x: number; y: number }; pad?: Pt };

function wire(points: Pt[], tile?: Wire["tile"], pad?: Pt): Wire {
  let len = 0;
  for (let i = 1; i < points.length; i++) {
    len += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
  }
  const d = points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  return { d, len, tile, pad };
}

const tileRows = [70, 210, 350];
// Offset of slot i in a bundle of four wires, centred on the chip.
const slot = (i: number) => (i - 1.5) * WIRE_GAP;

function buildWires(): Wire[] {
  const half = CHIP.size / 2;
  const wires: Wire[] = [];
  [-1, 1].forEach((dir) => {
    const startX = CHIP.cx + dir * half;
    const fanX = CHIP.cx + dir * (CHIP.cx - FAN_X);
    const tileX = dir < 0 ? 90 : BOX.w - 90;
    const edgeX = tileX - dir * (TILE / 2);
    tileRows.forEach((ty, i) => {
      const y = CHIP.cy + slot(i);
      const rise = ty - y;
      wires.push(
        wire(
          [
            [startX, y],
            [fanX, y],
            [fanX + dir * Math.abs(rise), ty],
            [edgeX, ty],
          ],
          { x: tileX, y: ty },
        ),
      );
    });
    const stubY = CHIP.cy + slot(3);
    const stubEnd: Pt = [startX + dir * STUB, stubY];
    wires.push(wire([[startX, stubY], stubEnd], undefined, stubEnd));
  });
  [0, 1, 2, 3].forEach((i) => {
    const x = CHIP.cx + slot(i);
    wires.push(
      wire([
        [x, CHIP.cy + half],
        [x, BOX.h],
      ]),
    );
  });
  return wires;
}

const wires = buildWires();
const tileWires = wires.flatMap((w, i) => (w.tile ? [{ tile: w.tile, i }] : []));
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

// Pulses start once the wires have drawn in, staggered so the wires take turns.
const pulseDelay = (i: number) => `${2200 + ((i * 5) % wires.length) * 300}ms`;

function HeroCircuit() {
  return (
    <div className="ai-circuit" aria-hidden="true">
      <svg className="ai-circuit-svg" viewBox={`0 0 ${BOX.w} ${BOX.h}`} fill="none">
        {wires.map((w) => (
          <path key={w.d} d={w.d} pathLength={1000} className="ai-wire" />
        ))}
        {wires.map((w) => (
          <path
            key={w.d}
            d={w.d}
            className="ai-wire-ends"
            strokeDasharray={w.tile || w.pad ? `${END} ${w.len - END * 2} ${END}` : `${END} ${w.len}`}
          />
        ))}
        {wires
          .filter((w) => w.pad)
          .map((w) => (
            <circle key={w.d} cx={w.pad![0]} cy={w.pad![1]} r="4" className="ai-wire-pad" />
          ))}
        {wires.map((w, i) => (
          <path
            key={w.d}
            d={w.d}
            pathLength={1000}
            className="ai-trace-pulse"
            style={{ "--delay": pulseDelay(i) } as Vars}
          />
        ))}
      </svg>

      {tileWires.map(({ tile, i }, n) => (
        <span
          key={agents[n].id}
          className="ai-circuit-tile"
          style={
            {
              left: pct(tile.x, BOX.w),
              top: pct(tile.y, BOX.h),
              width: pct(TILE, BOX.w),
              "--in": `${1500 + n * 70}ms`,
              "--delay": pulseDelay(i),
            } as Vars
          }
        >
          <AgentGlyph kind={agents[n].glyph} size={48} />
        </span>
      ))}

      <div
        className="ai-circuit-core"
        style={{ left: pct(CHIP.cx, BOX.w), top: pct(CHIP.cy, BOX.h), width: pct(CHIP.size, BOX.w) }}
      >
        AI
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="ai-hero" data-theme="dark">
      {/* Everything inside the stage is revealed by a circle that grows out of the chip. */}
      <div className="ai-hero-stage">
        <div className="ai-hero-bg" aria-hidden="true" />

        <div className="ai-hero-copy">
          <h1 className="ai-hero-title">AI agents that run your operations</h1>
          <p className="ai-hero-lead">
            Ready-to-deploy agents for customer support, collections and back-office work, connected to M-Pesa, WhatsApp and the
            systems you already run.
          </p>
          <div className="ai-hero-actions">
            <Link to={DEMO_PATH} className="ai-btn ai-btn-primary">
              Book a demo
            </Link>
            <a href="#try" className="ai-btn ai-btn-ghost">
              Explore agents
            </a>
          </div>
        </div>

        <HeroCircuit />
      </div>
    </section>
  );
}

/* ── 02 How it works ─────────────────────────────────────── */

function HowItWorks() {
  const [windowRef, windowOpen] = useInView<HTMLElement>("0px 0px -30% 0px");

  return (
    <section
      ref={windowRef}
      id="how-it-works"
      className={`ai-section ai-section-ruled ai-window ${windowOpen ? "is-open" : ""}`.trim()}
    >
      <div className="ai-wrap">
        <InView className="ai-head ai-mask-head" rootMargin="0px 0px -30% 0px">
          <Eyebrow index="01" label="How it works" />
          <MaskLines className="ai-h2" style={{ maxWidth: 780 }} text="Put AI to work inside the tools you already use" />
          <p className="ai-muted ai-mask-after" style={{ maxWidth: 560, fontSize: 16 }}>
            Each agent reads a request, decides within the rules you set, acts in your systems and reports back to your team.
          </p>
        </InView>

        <AgentAnatomy />

        <ol className="ai-steps ai-start-steps">
          {steps.map((st) => (
            <li key={st.n}>
              <span className="ai-mono-accent">{st.n}</span>
              <span className="ai-step-title">{st.t}</span>
              <span className="ai-muted" style={{ fontSize: 15 }}>
                {st.d}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── 03 Platform ─────────────────────────────────────────── */

function Platform() {
  return (
    <section className="ai-section ai-section-tight ai-platform">
      <div className="ai-wrap ai-stack">
        <InView className="ai-head ai-mask-head" style={{ marginBottom: "clamp(20px,3cqi,40px)" }}>
          <Eyebrow index="02" label="Platform" />
          <MaskLines className="ai-h2" style={{ maxWidth: 680 }} text="Everything your agents need to do real work" />
        </InView>

        <div className="ai-row">
          <InView
            col={0}
            rootMargin="0px 0px -30% 0px"
            className="ai-card ai-plat-card ai-rise ai-card-hover"
            style={{ flex: "2 1 420px", minHeight: 400 }}
          >
            <h3 className="ai-h3">Every channel your customers use</h3>
            <p className="ai-card-text" style={{ maxWidth: 380 }}>
              WhatsApp, SMS, voice, email and web chat, handled by the same agent with the same context.
            </p>
            <div className="ai-card-foot">
              <ChannelInbox />
            </div>
          </InView>
          <InView
            col={1}
            rootMargin="0px 0px -30% 0px"
            className="ai-card ai-plat-card ai-rise ai-card-hover"
            style={{ flex: "1 1 260px", minHeight: 400, justifyContent: "flex-end" }}
          >
            <SystemHub />
            <h3 className="ai-h3" style={{ position: "relative" }}>
              One connection for every system
            </h3>
            <p className="ai-card-text" style={{ position: "relative" }}>
              Payments, banking, CRM and ERP connectors, managed in one place.
            </p>
          </InView>
        </div>

        <div className="ai-row">
          <InView
            col={0}
            rootMargin="0px 0px -30% 0px"
            className="ai-card ai-plat-card ai-rise ai-card-hover"
            style={{ flex: "1 1 220px", minHeight: 360 }}
          >
            <h3 className="ai-h3">Data privacy and security</h3>
            <p className="ai-card-text">Run in your cloud or ours. Personal data is masked before it reaches a model.</p>
            <PrivacyScan />
          </InView>
          <InView
            col={1}
            rootMargin="0px 0px -30% 0px"
            className="ai-card ai-plat-card ai-rise ai-card-hover"
            style={{ flex: "1 1 220px", minHeight: 360 }}
          >
            <h3 className="ai-h3">People approve what matters</h3>
            <p className="ai-card-text">Set limits per action. Above them, the agent asks a person first.</p>
            <ApprovalQueue />
          </InView>
          <InView
            col={2}
            rootMargin="0px 0px -30% 0px"
            className="ai-card ai-plat-card ai-rise ai-card-hover"
            style={{ flex: "1 1 220px", minHeight: 360 }}
          >
            <h3 className="ai-h3">Speaks your customers’ languages</h3>
            <p className="ai-card-text">English and Kiswahili by default, with French and more on request.</p>
            <div className="ai-card-foot">
              <LanguageSwap />
            </div>
          </InView>
        </div>

        <div className="ai-row">
          <InView
            col={0}
            rootMargin="0px 0px -30% 0px"
            className="ai-card ai-plat-card ai-rise ai-card-hover"
            style={{ flex: "3 1 380px", minHeight: 340 }}
          >
            <h3 className="ai-h3">Scales with your volume</h3>
            <p className="ai-card-text" style={{ maxWidth: 380 }}>
              Handle month-end peaks and quiet weekends without hiring for the busiest day.
            </p>
            <div className="ai-card-foot">
              <VolumeChart />
            </div>
          </InView>
          <InView
            col={1}
            rootMargin="0px 0px -30% 0px"
            className="ai-card ai-plat-card ai-rise ai-card-ink"
            style={{ flex: "2 1 300px", minHeight: 340 }}
          >
            <h3 className="ai-h3">Every action is logged</h3>
            <p className="ai-card-text ai-ink-muted">A plain-language audit trail your compliance team can read.</p>
            <LiveLog />
          </InView>
        </div>
      </div>
    </section>
  );
}

/* ── 04 Reach ────────────────────────────────────────────── */

function Reach() {
  return (
    <section className="ai-section ai-reach">
      <InView className="ai-head ai-reach-copy ai-mask-head">
        <Eyebrow index="03" label="Nairobi to anywhere" />
        <MaskLines className="ai-h2" text="Built in Nairobi, ready wherever you operate" />
        <p className="ai-muted ai-mask-after" style={{ maxWidth: 520, fontSize: 16 }}>
          Designed around African payment rails, languages and regulation, and just as at home with teams in Europe, the Gulf
          and beyond.
        </p>
      </InView>
      {/* The globe starts half below the horizon and rises to a full globe as the section scrolls by. */}
      <InView className="ai-globe-stage">
        <div className="ai-globe">
          <ReachGlobe />
        </div>
        <div className="ai-globe-fade" aria-hidden="true" />
      </InView>
    </section>
  );
}

/* ── 05 Try an agent ─────────────────────────────────────── */

// Demo timeline, in ms from when the console starts: the message lands, each
// step runs then completes, the reply types out, then the outcome appears.
const MSG_AT = 250;
const STEP_AT = 900;
const STEP_GAP = 750;
const STEP_RUN = 500;
const CHAR_MS = 16;

/** Milliseconds since `active` became true, ticking until `end`. Jumps to `end` for reduced motion. */
function useClock(active: boolean, end: number) {
  const [ms, setMs] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setMs(end);
      return;
    }
    const start = performance.now();
    const id = window.setInterval(() => {
      const t = performance.now() - start;
      setMs(Math.min(t, end));
      if (t >= end) window.clearInterval(id);
    }, 40);
    return () => window.clearInterval(id);
  }, [active, end]);
  return ms;
}

/**
 * Plays one scenario: the conversation on the left, the agent's work on the
 * right, then the outcome. Starts once the demo panel is in view.
 */
function AgentConsole({ scenario, onReplay }: { scenario: Scenario; onReplay: () => void }) {
  const live = useContext(LiveContext);
  const agent = agents.find((a) => a.id === scenario.agent) ?? agents[0];
  const replyAt = STEP_AT + scenario.steps.length * STEP_GAP + 200;
  const outcomeAt = replyAt + scenario.reply.length * CHAR_MS + 300;
  const ms = useClock(live, outcomeAt);

  const finished = ms >= outcomeAt;
  const typed = scenario.reply.slice(0, Math.max(0, Math.floor((ms - replyAt) / CHAR_MS)));
  const doneSteps = scenario.steps.filter((_, i) => ms >= STEP_AT + i * STEP_GAP + STEP_RUN);
  const clock = finished ? scenario.took : (doneSteps[doneSteps.length - 1]?.at ?? "0.0s");

  return (
    <div className="ai-console">
      <div className="ai-console-pane ai-console-chat">
        <div className="ai-console-bar">
          <span>{scenario.channel}</span>
          <span>{agent.name}</span>
        </div>
        <div className="ai-console-thread">
          {ms >= MSG_AT ? (
            <div className="ai-bubble is-in">
              <span className="ai-bubble-from">{scenario.from}</span>
              {scenario.message}
            </div>
          ) : null}
          {ms >= MSG_AT && ms < replyAt ? (
            <div className="ai-typing" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          ) : null}
          {ms >= replyAt ? (
            <div className="ai-bubble is-out">
              <span className="ai-bubble-from">{agent.name}</span>
              {typed}
              {finished ? null : <span className="ai-caret" aria-hidden="true" />}
            </div>
          ) : null}
        </div>
      </div>

      <div className="ai-console-pane ai-console-work">
        <div className="ai-console-bar">
          <span>Agent activity</span>
          <span className="ai-console-clock">{clock}</span>
        </div>
        <ol className="ai-activity">
          {scenario.steps.map((step, i) => {
            const startAt = STEP_AT + i * STEP_GAP;
            if (ms < startAt) return null;
            const done = ms >= startAt + STEP_RUN;
            const state = done ? (step.flag ? "is-flag" : "is-done") : "is-running";
            return (
              <li key={step.text} className={`ai-activity-step ${state}`}>
                <span className="ai-activity-mark" aria-hidden="true" />
                <span className="ai-activity-system">{step.system}</span>
                <span className="ai-activity-text">{step.text}</span>
                <span className="ai-activity-at">{done ? step.at : ""}</span>
              </li>
            );
          })}
        </ol>
        {finished ? (
          <div className="ai-outcome" role="status">
            <div className="ai-outcome-time">
              <strong>{scenario.took}</strong>
              <span>vs {scenario.byHand}</span>
            </div>
            <span className="ai-outcome-note">{scenario.note}</span>
            <button type="button" className="ai-outcome-replay" onClick={onReplay}>
              ↻ Replay
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function TryAgent() {
  const [params] = useSearchParams();
  const requested = scenarios.findIndex((s) => s.agent === params.get("agent"));
  const [index, setIndex] = useState(requested >= 0 ? requested : 0);
  const [run, setRun] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const agentParam = params.get("agent");
  useEffect(() => {
    const i = scenarios.findIndex((s) => s.agent === agentParam);
    if (i < 0) return;
    setIndex(i);
    setRun((r) => r + 1);
  }, [agentParam]);

  const select = (i: number) => {
    setIndex(i);
    setRun((r) => r + 1);
  };

  // Arrow keys move between tabs, as in a standard tablist.
  const onKeyDown = (e: KeyboardEvent) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + scenarios.length) % scenarios.length;
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="try" className="ai-section ai-section-tight ai-try">
      <InView className="ai-demo ai-rise ai-mask-head">
        <div className="ai-demo-grid" aria-hidden="true" />
        <div className="ai-demo-head">
          <span className="ai-demo-mark">
            <LuWorkflow size={22} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <MaskLines className="ai-h2" style={{ fontSize: "clamp(32px,3.8cqi,50px)" }} text="See an agent at work" />
          <p className="ai-muted ai-mask-after" style={{ fontSize: 16 }}>
            Pick a problem and watch an agent handle it, start to finish.
          </p>
        </div>

        <div className="ai-scenario-tabs" role="tablist" aria-label="Choose a problem" onKeyDown={onKeyDown}>
          {scenarios.map((s, i) => {
            const agent = agents.find((a) => a.id === s.agent) ?? agents[0];
            const active = i === index;
            return (
              <button
                key={s.agent}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab${i}`}
                aria-selected={active}
                aria-controls={`${baseId}-panel`}
                tabIndex={active ? 0 : -1}
                className={active ? "ai-scenario-tab is-active" : "ai-scenario-tab"}
                style={{ "--i": i } as Vars}
                onClick={() => select(i)}
              >
                <AgentGlyph kind={agent.glyph} size={34} className="is-surface" />
                <span className="ai-scenario-copy">
                  <span className="ai-scenario-problem">{s.problem}</span>
                  <span className="ai-scenario-agent">{agent.name}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab${index}`}>
          <AgentConsole key={`${index}-${run}`} scenario={scenarios[index]} onReplay={() => setRun((r) => r + 1)} />
        </div>

        <p className="ai-demo-note">Sample data only. Live demos run against a sandbox copy of your systems.</p>
      </InView>
    </section>
  );
}

/* ── 06 Industries ───────────────────────────────────────── */

/** Agents that have a scenario in "See an agent at work". */
const demoable = new Set(scenarios.map((s) => s.agent));

/** Moves to the demo even when the URL already ends in #try, which would not re-trigger the hash scroll. */
const scrollToDemo = () => {
  document.getElementById("try")?.scrollIntoView({ block: "start", behavior: prefersReducedMotion() ? "auto" : "smooth" });
};

function Industries() {
  const [params] = useSearchParams();
  const requested = industries.findIndex((ind) => ind.id === params.get("industry"));
  const [index, setIndex] = useState(requested >= 0 ? requested : 0);
  // Follow ?industry= when it changes, e.g. from the navbar's Solutions menu.
  useEffect(() => {
    if (requested >= 0) setIndex(requested);
  }, [requested]);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const industry = industries[index];

  // Up/down (or left/right on phones, where the tabs sit in a row) move between industries.
  const onKeyDown = (e: KeyboardEvent) => {
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + industries.length) % industries.length;
    setIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="industries" className="ai-section">
      <div className="ai-wrap">
        <InView className="ai-head ai-mask-head">
          <Eyebrow index="04" label="Industries" />
          <MaskLines className="ai-h2" style={{ maxWidth: 620 }} text="Where our agents already fit" />
        </InView>

        <InView className="ai-industries ai-rise">
          <div className="ai-industry-tabs" role="tablist" aria-label="Industries" aria-orientation="vertical" onKeyDown={onKeyDown}>
            {industries.map((ind, i) => {
              const active = i === index;
              return (
                <button
                  key={ind.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab${i}`}
                  aria-selected={active}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={active ? 0 : -1}
                  className={active ? "ai-industry-tab is-active" : "ai-industry-tab"}
                  style={{ "--i": i } as Vars}
                  onClick={() => setIndex(i)}
                >
                  <span className="ai-industry-n">{String(i + 1).padStart(2, "0")}</span>
                  {ind.title}
                </button>
              );
            })}
          </div>

          <div
            key={industry.id}
            role="tabpanel"
            id={`${baseId}-panel`}
            aria-labelledby={`${baseId}-tab${index}`}
            className="ai-industry-panel"
          >
            <div className="ai-industry-head">
              <h3 className="ai-h3">{industry.title}</h3>
              <p className="ai-card-text">{industry.line}</p>
            </div>
            <ul className="ai-industry-jobs">
              {industry.jobs.map((job, j) => {
                const agent = agents.find((a) => a.id === job.agent) ?? agents[0];
                return (
                  <li key={job.text} className="ai-industry-job" style={{ "--i": j } as Vars}>
                    <AgentGlyph kind={agent.glyph} size={40} className="is-surface" />
                    <span className="ai-industry-job-copy">
                      <span className="ai-industry-job-text">{job.text}</span>
                      <span className="ai-industry-job-systems">{job.systems}</span>
                    </span>
                    <span className="ai-industry-job-agent">
                      {agent.name}
                      {agent.tag ? <span className="ai-industry-tag">{agent.tag}</span> : null}
                    </span>
                    {demoable.has(agent.id) ? (
                      <Link to={agentPath(agent.id)} className="ai-industry-try" onClick={scrollToDemo}>
                        See it work <span aria-hidden="true">→</span>
                      </Link>
                    ) : (
                      <span className="ai-industry-try is-empty" aria-hidden="true" />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </InView>
      </div>
    </section>
  );
}

/* ── 07 FAQ ──────────────────────────────────────────────── */

/** FAQPage structured data, so search engines can show the questions and answers. */
const faqSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((g) =>
    g.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  ),
  // Keeps a "</script>" inside the text from closing the tag early.
}).replace(/</g, "\\u003c");

function Faq() {
  const [open, setOpen] = useState("0-0");
  const baseId = useId();

  return (
    <section id="faq" className="ai-section ai-section-tight">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <div className="ai-wrap ai-faq-layout">
        <InView className="ai-faq-aside ai-mask-head">
          <Eyebrow index="05" label="FAQ" />
          <MaskLines className="ai-h2" text="Questions, answered" />
          <p className="ai-muted ai-mask-after">
            Can’t find what you’re looking for? Ask us directly. We reply within one business day.
          </p>
          <div className="ai-faq-contact ai-mask-after">
            <a href={`mailto:${site.email}`} className="ai-faq-email">
              {site.email}
            </a>
            <Link to={DEMO_PATH} className="ai-btn ai-btn-primary">
              Book a demo
            </Link>
          </div>
        </InView>

        <div className="ai-faq-groups">
          {faqGroups.map((group, g) => (
            <div key={group.title} className="ai-faq-group">
              <p className="ai-faq-group-title">{group.title}</p>
              <div className="ai-faq">
                {group.items.map((f, i) => {
                  const id = `${g}-${i}`;
                  const isOpen = open === id;
                  const answerId = `${baseId}-a${id}`;
                  return (
                    <InView key={f.q} className={isOpen ? "ai-faq-item ai-rise is-open" : "ai-faq-item ai-rise"}>
                      <h3 className="ai-faq-q">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={answerId}
                          onClick={() => setOpen(isOpen ? "" : id)}
                        >
                          <span className="ai-chev" aria-hidden="true" />
                          {f.q}
                        </button>
                      </h3>
                      <div id={answerId} className="ai-faq-body" role="region" aria-hidden={!isOpen}>
                        <div>
                          {/* Words stream in when the answer opens, like an agent's reply. */}
                          <p>
                            {f.a.split(" ").map((w, n) => (
                              <span key={n} className="ai-faq-word" style={{ "--w": n } as Vars}>
                                {w}{" "}
                              </span>
                            ))}
                          </p>
                          {f.link ? (
                            <Link
                              to={f.link.to}
                              className="ai-faq-link"
                              tabIndex={isOpen ? undefined : -1}
                              onClick={f.link.to.endsWith("#try") ? scrollToDemo : undefined}
                            >
                              {f.link.label} <span aria-hidden="true">→</span>
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    </InView>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 08 Contact CTA ──────────────────────────────────────── */

const callSteps = [
  { title: "Tell us the process", detail: "Which job takes up your team’s time.", time: "5 min" },
  { title: "Watch it run on your data", detail: "An agent handles it on a sandbox copy.", time: "20 min" },
  { title: "Leave with a pilot plan", detail: "Scope, timeline and price.", time: "5 min" },
];

// Three wires from the chip's pins converge on the button, echoing the hero circuit.
const ctaWires = ["M0 10 H52 L70 18 H150", "M0 24 H150", "M0 38 H52 L70 30 H150"];

function ClosingCta() {
  const [process, setProcess] = useState<FirstProcessId | null>(null);
  const chosen = firstProcesses.find((p) => p.id === process && p.id !== "other");

  return (
    <section className="ai-cta-section" data-theme="dark">
      <InView className="ai-cta ai-rise ai-mask-head">
        <div className="ai-hero-bg" aria-hidden="true" />
        <div className="ai-cta-copy">
          <MaskLines className="ai-cta-title" text="Talk to us about your first agent" />
          <p className="ai-mask-after">
            Tell us which process takes up your team’s time. We’ll show you an agent doing it, on your data, in a 30-minute
            call.
          </p>

          <ol className="ai-call-steps">
            {callSteps.map((step, i) => (
              <li key={step.title} className="ai-call-step" style={{ "--i": i } as Vars}>
                <span className="ai-call-step-n" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="ai-call-step-copy">
                  <strong>{step.title}</strong>
                  <span>{step.detail}</span>
                </span>
                <span className="ai-call-step-time">{step.time}</span>
              </li>
            ))}
          </ol>

          <div className="ai-cta-pick" role="group" aria-label="Your first process (optional)">
            <span className="ai-cta-pick-label">Your first process</span>
            <div className="ai-cta-chips">
              {firstProcesses.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={process === p.id}
                  className={process === p.id ? "ai-cta-chip is-on" : "ai-cta-chip"}
                  onClick={() => setProcess(process === p.id ? null : p.id)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="ai-cta-plug">
            <span className="ai-cta-core" aria-hidden="true">
              AI
            </span>
            <svg className="ai-cta-wires" viewBox="0 0 150 48" fill="none" aria-hidden="true">
              {ctaWires.map((d) => (
                <path key={d} d={d} pathLength={1} className="ai-cta-wire" />
              ))}
              {ctaWires.map((d, i) => (
                <path
                  key={`pulse-${d}`}
                  d={d}
                  pathLength={1000}
                  className="ai-trace-pulse"
                  style={{ "--delay": `${1200 + i * 700}ms` } as Vars}
                />
              ))}
            </svg>
            <Link to={demoPathFor(chosen?.id)} className="ai-btn ai-btn-paper ai-cta-btn">
              {chosen ? `Book a demo: ${chosen.label}` : "Book a demo"} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </InView>
    </section>
  );
}

/* ── 09 Refract Software ─────────────────────────────────── */

function MoreFromLabs() {
  return (
    <section className="ai-section ai-section-tight">
      <div className="ai-wrap">
        <InView className="ai-mask-head">
          <MaskLines
            className="ai-h2"
            style={{ textAlign: "center", fontSize: "clamp(30px,3.6cqi,48px)", marginBottom: "clamp(32px,4cqi,48px)" }}
            text="Explore more from Refract Labs"
          />
        </InView>
        <div className="ai-row">
          {softwareLinks.map((s, i) => (
            <InView key={s.t} col={i} className="ai-software ai-rise">
              <Link to={s.to} className="ai-software-card">
                <AgentGlyph kind={s.glyph} className="is-teal" />
                <span className="ai-software-kicker">Refract Software</span>
                <span className="ai-h3" style={{ margin: 0 }}>
                  {s.t}
                </span>
                <span className="ai-muted" style={{ fontSize: 15 }}>
                  {s.d}
                </span>
                <span className="ai-software-more">Learn more →</span>
              </Link>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AILanding() {
  usePageMeta(
    "Refract AI — AI agents for business",
    "Ready-to-deploy AI agents for customer support, collections and back-office work, connected to M-Pesa, WhatsApp and the systems you already run.",
    "/ai",
  );
  const pageRef = useRef<HTMLDivElement>(null);
  useSnapScroll(pageRef);

  return (
    <div ref={pageRef} className="ai-page">
      <Hero />
      <HowItWorks />
      <Platform />
      <Reach />
      <TryAgent />
      <Industries />
      <Faq />
      <ClosingCta />
      <MoreFromLabs />
    </div>
  );
}
