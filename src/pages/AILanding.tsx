import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Link, useSearchParams } from "react-router";
import AgentGlyph from "../components/AgentGlyph";
import Reveal from "../components/Reveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { useSnapScroll } from "../hooks/useSnapScroll";
import {
  agents,
  auditLog,
  channels,
  DEMO_PATH,
  demoAgents,
  faqs,
  languages,
  softwareLinks,
  steps,
  systems,
  tasks,
  useCases,
  volumeBars,
  volumePeak,
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

/**
 * Adds `is-open` to the element once its top edge is 70% of the way up the
 * viewport. Used for the section that closes over the hero like a car window.
 */
function useWindowOpen<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const open = () => el.classList.add("is-open");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      open();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        open();
        io.disconnect();
      },
      { rootMargin: "0px 0px -30% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
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
  const [tab, setTab] = useState(0);
  const panelId = useId();
  const windowRef = useWindowOpen<HTMLElement>();

  return (
    <section ref={windowRef} id="how-it-works" className="ai-section ai-section-ruled ai-window">
      <div className="ai-wrap">
        <Reveal className="ai-head">
          <div className="ai-tabs" role="tablist" aria-label="About Refract AI">
            {["What it is", "How it works"].map((label, i) => (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={tab === i}
                aria-controls={panelId}
                className={tab === i ? "ai-tab is-active" : "ai-tab"}
                onClick={() => setTab(i)}
              >
                {label}
              </button>
            ))}
          </div>
          <h2 className="ai-h2" style={{ maxWidth: 780 }}>
            Put AI to work inside the tools you already use
          </h2>
        </Reveal>

        <div className="ai-row">
          <Reveal className="ai-card ai-card-ink ai-chat-card" style={{ flex: "1 1 260px", minHeight: 420 }}>
            <div className="ai-chat-head">
              <span>WhatsApp · Support agent</span>
              <span>09:41</span>
            </div>
            <div className="ai-chat-body">
              <span className="ai-bubble is-in" lang="sw">
                Nimelipa kupitia M-Pesa lakini oda bado inaonyesha haijalipwa.
              </span>
              <span className="ai-bubble is-out" lang="sw">
                Nimepata malipo yako ya KES 4,500. Oda #10482 sasa imelipiwa. Asante!
              </span>
              <span className="ai-chat-meta">resolved in 6s · no hand-off</span>
            </div>
            <span className="ai-chat-foot">Try Refract AI on your own data, with a pilot in weeks.</span>
          </Reveal>

          <Reveal className="ai-card ai-tab-card" style={{ flex: "2.2 1 440px" }} delay={80}>
            <div id={panelId} role="tabpanel">
              {tab === 0 ? (
                <div className="ai-tab-intro">
                  <p className="ai-tab-statement">
                    Refract AI agents read from your systems, take actions with your permissions and report back to your team.
                  </p>
                  <p className="ai-muted" style={{ maxWidth: 440, fontSize: 16 }}>
                    Customers reach them on WhatsApp, SMS and the web. Your staff work with them from the inbox and dashboard
                    they already use.
                  </p>
                </div>
              ) : (
                <ol className="ai-steps">
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
              )}
            </div>
            <div className="ai-marquees" aria-hidden="true">
              <div className="ai-marquee">
                {[...tasks, ...tasks].map((t, i) => (
                  <span key={i} className="ai-pill">
                    <span className="ai-diamond is-sm" />
                    {t}
                  </span>
                ))}
              </div>
              <div className="ai-marquee is-reverse">
                {[...systems, ...systems].map((s, i) => (
                  <span key={i} className="ai-pill is-mono">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 03 Platform ─────────────────────────────────────────── */

function Platform() {
  return (
    <section className="ai-section ai-section-tight">
      <div className="ai-wrap ai-stack">
        <Reveal className="ai-head" style={{ marginBottom: "clamp(20px,3cqi,40px)" }}>
          <Eyebrow index="02" label="Platform" />
          <h2 className="ai-h2" style={{ maxWidth: 680 }}>
            Everything your agents need to do real work
          </h2>
        </Reveal>

        <div className="ai-row">
          <Reveal className="ai-card ai-card-hover" style={{ flex: "2 1 420px", minHeight: 400 }}>
            <h3 className="ai-h3">Every channel your customers use</h3>
            <p className="ai-card-text" style={{ maxWidth: 380 }}>
              WhatsApp, SMS, voice, email and web chat, handled by the same agent with the same context.
            </p>
            <div className="ai-card-foot">
              {channels.map((ch) => (
                <div key={ch.c} className="ai-channel">
                  <span className="ai-mono-subtle">{ch.c}</span>
                  <span className="ai-ellipsis">{ch.m}</span>
                  <span className="ai-channel-status">{ch.s}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal
            className="ai-card ai-card-hover"
            style={{ flex: "1 1 260px", minHeight: 400, justifyContent: "flex-end" }}
            delay={80}
          >
            <div className="ai-hub" aria-hidden="true">
              <span className="ai-hub-v" />
              <span className="ai-hub-h" />
              <span className="ai-hub-core">AI</span>
              <span className="ai-hub-node is-top">M-Pesa</span>
              <span className="ai-hub-node is-bottom">ERP</span>
              <span className="ai-hub-node is-left">CRM</span>
              <span className="ai-hub-node is-right">Core bank</span>
            </div>
            <h3 className="ai-h3" style={{ position: "relative" }}>
              One connection for every system
            </h3>
            <p className="ai-card-text" style={{ position: "relative" }}>
              Payments, banking, CRM and ERP connectors, managed in one place.
            </p>
          </Reveal>
        </div>

        <div className="ai-row">
          <Reveal className="ai-card ai-card-hover" style={{ flex: "1 1 220px", minHeight: 360 }}>
            <h3 className="ai-h3">Data privacy and security</h3>
            <p className="ai-card-text">Run in your cloud or ours. Personal data is masked before it reaches a model.</p>
            <dl className="ai-masked">
              <dt>name</dt>
              <dd>J•••• M••••</dd>
              <dt>phone</dt>
              <dd>+254 7•• ••• 412</dd>
              <dt>id</dt>
              <dd>•••••••</dd>
              <dt>hosting</dt>
              <dd className="ai-accent-text">your cloud</dd>
            </dl>
          </Reveal>
          <Reveal className="ai-card ai-card-hover" style={{ flex: "1 1 220px", minHeight: 360 }} delay={80}>
            <h3 className="ai-h3">People approve what matters</h3>
            <p className="ai-card-text">Set limits per action. Above them, the agent asks a person first.</p>
            <div className="ai-approval">
              <span className="ai-approval-head">
                <span>Approval needed</span>
                <span>limit 5,000</span>
              </span>
              <span style={{ fontSize: 15, fontWeight: 600 }}>Refund KES 12,000 to customer #4471</span>
              <div style={{ display: "flex", gap: 8 }} aria-hidden="true">
                <span className="ai-chip-btn is-primary">Approve</span>
                <span className="ai-chip-btn">Review</span>
              </div>
            </div>
          </Reveal>
          <Reveal className="ai-card ai-card-hover" style={{ flex: "1 1 220px", minHeight: 360 }} delay={160}>
            <h3 className="ai-h3">Speaks your customers’ languages</h3>
            <p className="ai-card-text">English and Kiswahili by default, with French and more on request.</p>
            <div className="ai-card-foot">
              {languages.map((l) => (
                <div key={l.c} className="ai-lang">
                  <span className="ai-mono-accent" style={{ fontSize: 11, paddingTop: 2 }}>
                    {l.c}
                  </span>
                  <span lang={l.c.toLowerCase()}>{l.t}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="ai-row">
          <Reveal className="ai-card ai-card-hover" style={{ flex: "3 1 380px", minHeight: 340 }}>
            <h3 className="ai-h3">Scales with your volume</h3>
            <p className="ai-card-text" style={{ maxWidth: 380 }}>
              Handle month-end peaks and quiet weekends without hiring for the busiest day.
            </p>
            <div className="ai-card-foot" aria-hidden="true">
              <div className="ai-bars">
                {volumeBars.map((h, i) => (
                  <span key={i} className={i === volumePeak ? "is-peak" : undefined} style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="ai-bars-axis">
                <span>1st</span>
                <span>15th</span>
                <span className="ai-accent-text">month-end</span>
              </div>
            </div>
          </Reveal>
          <Reveal className="ai-card ai-card-ink" style={{ flex: "2 1 300px", minHeight: 340 }} delay={80}>
            <h3 className="ai-h3">Every action is logged</h3>
            <p className="ai-card-text ai-ink-muted">A plain-language audit trail your compliance team can read.</p>
            <div className="ai-log">
              {auditLog.map((row, i) => (
                <div key={i}>
                  <span className="ai-log-time">{row.time}</span>
                  {"  "}
                  <span className={row.actor === "policy" ? "ai-log-policy" : "ai-log-actor"}>{row.actor.padEnd(9, " ")}</span>
                  {row.action}
                  {row.result ? <span className="ai-log-ok">{row.result}</span> : null}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 04 Reach ────────────────────────────────────────────── */

const meridians = [0, 1, 2, 3, 4, 5].map((k) => k / 6);
const chords = [15, 30, 45, 60, 75, 0].map((deg) => {
  const r = (deg * Math.PI) / 180;
  const w = Math.cos(r) * 100;
  return { top: `${50 - Math.sin(r) * 50}%`, left: `${50 - w / 2}%`, width: `${w}%` };
});

function Reach() {
  return (
    <section className="ai-section ai-reach">
      <Reveal className="ai-head ai-reach-copy">
        <Eyebrow index="03" label="Nairobi to anywhere" />
        <h2 className="ai-h2">Built in Nairobi, ready wherever you operate</h2>
        <p className="ai-muted" style={{ maxWidth: 520, fontSize: 16 }}>
          Designed around African payment rails, languages and regulation, and just as at home with teams in Europe, the Gulf
          and beyond.
        </p>
      </Reveal>
      <div className="ai-globe-stage" aria-hidden="true">
        <div className="ai-globe">
          {meridians.map((ph) => (
            <span key={ph} className="ai-meridian" style={{ animationDelay: `${-ph * 16}s` }} />
          ))}
          {chords.map((c, i) => (
            <span key={i} className="ai-chord" style={c} />
          ))}
        </div>
        <div className="ai-pin">
          <span className="ai-pin-dot" />
          <span className="ai-pin-rule" />
          <span className="ai-pin-label">Nairobi · 1.29°S 36.82°E</span>
        </div>
        <div className="ai-globe-fade" />
      </div>
    </section>
  );
}

/* ── 05 Try an agent ─────────────────────────────────────── */

function TryAgent() {
  const [params] = useSearchParams();
  const requested = demoAgents.findIndex((a) => a.id === params.get("agent"));
  const [index, setIndex] = useState(requested >= 0 ? requested : 0);
  const [sent, setSent] = useState(false);
  const demo = demoAgents[index];

  return (
    <section id="try" className="ai-section ai-section-tight ai-try">
      <Reveal className="ai-logos">
        {Array.from({ length: 7 }, (_, i) => (
          <span key={i} className="ai-logo-slot">
            CLIENT LOGO
          </span>
        ))}
      </Reveal>
      <Reveal className="ai-demo">
        <div className="ai-demo-grid" aria-hidden="true" />
        <div className="ai-demo-head">
          <span className="ai-demo-mark">
            <span className="ai-diamond is-lg" />
          </span>
          <h2 className="ai-h2" style={{ fontSize: "clamp(32px,3.8cqi,50px)" }}>
            See an agent at work
          </h2>
          <p className="ai-muted" style={{ fontSize: 16 }}>
            Pick an agent and send it a sample task.
          </p>
        </div>
        <div className="ai-demo-picker" role="radiogroup" aria-label="Choose an agent">
          {demoAgents.map((a, i) => (
            <button
              key={a.id}
              type="button"
              role="radio"
              aria-checked={i === index}
              className={i === index ? "ai-demo-option is-active" : "ai-demo-option"}
              onClick={() => {
                setIndex(i);
                setSent(false);
              }}
            >
              <AgentGlyph kind={a.glyph} size={36} className="is-surface" />
              <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>{a.name}</span>
                <span className="ai-muted" style={{ fontSize: 14, lineHeight: 1.4 }}>
                  {a.desc}
                </span>
              </span>
            </button>
          ))}
        </div>
        <div aria-live="polite">
          {sent ? (
            <div className="ai-demo-thread">
              <span className="ai-demo-msg is-user">{demo.prompt}</span>
              <span className="ai-demo-msg is-agent">{demo.reply}</span>
            </div>
          ) : null}
        </div>
        <div className="ai-demo-input">
          <span className="ai-demo-prompt">{demo.prompt}</span>
          <button type="button" className="ai-btn ai-btn-primary ai-demo-send" onClick={() => setSent(true)} disabled={sent}>
            Send ↑
          </button>
        </div>
        <p className="ai-demo-note">Sample data only. Live demos run against a sandbox copy of your systems.</p>
      </Reveal>
    </section>
  );
}

/* ── 06 Use cases ────────────────────────────────────────── */

function UseCases() {
  return (
    <section className="ai-section">
      <div className="ai-wrap">
        <Reveal className="ai-head">
          <Eyebrow index="04" label="Industries" />
          <h2 className="ai-h2" style={{ maxWidth: 620 }}>
            A flexible solution for diverse industries
          </h2>
        </Reveal>
        <div className="ai-row" style={{ gap: 24 }}>
          {useCases.map((u, i) => (
            <Reveal key={u.n} className="ai-usecase" delay={i * 80}>
              <div className="ai-usecase-img">{u.img}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span className="ai-mono-accent">{u.n}</span>
                  <h3 className="ai-h3" style={{ fontSize: 24, margin: 0 }}>
                    {u.title}
                  </h3>
                </div>
                <ul className="ai-list">
                  {u.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 07 FAQ ──────────────────────────────────────────────── */

function Faq() {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <section className="ai-section ai-section-tight">
      <div className="ai-wrap" style={{ maxWidth: 1080 }}>
        <Reveal>
          <h2 className="ai-h2" style={{ textAlign: "center", marginBottom: "clamp(32px,4cqi,48px)" }}>
            Frequently asked questions
          </h2>
        </Reveal>
        <Reveal className="ai-faq">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const answerId = `${baseId}-a${i}`;
            return (
              <div key={f.q} className={isOpen ? "ai-faq-item is-open" : "ai-faq-item"}>
                <h3 className="ai-faq-q">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="ai-chev" aria-hidden="true" />
                    {f.q}
                  </button>
                </h3>
                <div id={answerId} className="ai-faq-body" role="region" aria-hidden={!isOpen}>
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* ── 08 Contact CTA ──────────────────────────────────────── */

const rays = [-72, -62, -52, -42, -32, -22, -12, 0, 12, 22, 32, 42, 52, 62, 72];

function ClosingCta() {
  return (
    <section className="ai-cta-section">
      <Reveal className="ai-cta">
        <div className="ai-cta-rays" aria-hidden="true">
          {rays.map((a, i) => (
            <span
              key={a}
              className="ai-ray"
              style={{ rotate: `${a}deg`, opacity: 1 - Math.abs(a) / 110, "--delay": `${i * 40}ms` } as Vars}
            />
          ))}
        </div>
        <div className="ai-cta-horizon" aria-hidden="true" />
        <div className="ai-cta-copy">
          <h2 className="ai-cta-title">Talk to us about your first agent</h2>
          <p>
            Tell us which process takes up your team’s time. We’ll show you an agent doing it, on your data, in a 30-minute
            call.
          </p>
          <Link to={DEMO_PATH} className="ai-btn ai-btn-paper">
            Book a demo <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

/* ── 09 Refract Software ─────────────────────────────────── */

function MoreFromLabs() {
  return (
    <section className="ai-section ai-section-tight">
      <div className="ai-wrap">
        <Reveal>
          <h2 className="ai-h2" style={{ textAlign: "center", fontSize: "clamp(30px,3.6cqi,48px)", marginBottom: "clamp(32px,4cqi,48px)" }}>
            Explore more from Refract Labs
          </h2>
        </Reveal>
        <div className="ai-row">
          {softwareLinks.map((s, i) => (
            <Reveal key={s.t} className="ai-software" delay={i * 80}>
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
            </Reveal>
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
      <UseCases />
      <Faq />
      <ClosingCta />
      <MoreFromLabs />
    </div>
  );
}
