import { useId, type ReactNode } from "react"

/**
 * The site's illustration set: matte "clay" objects used for every feature
 * icon (services, engagements, case-study beats and the Refract AI agents).
 * Each object is a flat SVG shape stacked into a solid (an extrusion falling
 * down and to the right, lit from the top left), with a soft sheen and a
 * contact shadow. Colours come from the --clay-* custom properties (set on
 * :root, with light-mode and Refract AI overrides), so the set follows the
 * theme. Small UI glyphs (arrows, chevrons, social logos) stay as line icons.
 */

export type ServiceArtKind =
  // Service categories
  | "software"
  | "infrastructure"
  | "design"
  | "strategy"
  | "support"
  // Homepage extras and engagements
  | "next"
  | "build"
  | "care"
  | "team"
  // Individual services and case-study beats
  | "globe"
  | "phone"
  | "rocket"
  | "bolt"
  | "link"
  | "cycle"
  | "database"
  | "monitor"
  | "check"
  | "target"
  | "workflow"
  // Refract AI agents and the agent loop
  | "headset"
  | "coins"
  | "idcard"
  | "swap"
  | "chart"
  | "wave"
  | "message"
  | "scan"
  | "shield"
  | "inbox"
  // Contact and legal pages
  | "document"
  | "calendar"

type Paint = "fill" | "stroke"
type Ids = { face: string; sheen: string; blur: string; recess: string }
type Ctx = { ids: Ids; shape: (name: string) => string }

/** Stacks copies of a shape to form its sides, then lays the lit face on top. */
function Solid({
  href,
  ids,
  depth,
  dx = 0.45,
  dy = 1,
  paint = "fill",
  width,
}: {
  href: string
  ids: Ids
  depth: number
  dx?: number
  dy?: number
  paint?: Paint
  width?: number
}) {
  const layers = []
  for (let i = depth; i >= 1; i--) {
    const colour = i <= 2 ? "var(--clay-lo)" : "var(--clay-edge)"
    layers.push(
      <use
        key={i}
        href={`#${href}`}
        transform={`translate(${(i * dx).toFixed(2)} ${(i * dy).toFixed(2)})`}
        {...(paint === "fill" ? { fill: colour } : { stroke: colour, fill: "none", strokeWidth: width })}
      />,
    )
  }
  const face = `url(#${ids.face})`
  const sheen = `url(#${ids.sheen})`
  return (
    <>
      {layers}
      <use href={`#${href}`} {...(paint === "fill" ? { fill: face } : { stroke: face, fill: "none", strokeWidth: width })} />
      <use href={`#${href}`} {...(paint === "fill" ? { fill: sheen } : { stroke: sheen, fill: "none", strokeWidth: width })} />
    </>
  )
}

function Defs({ ids, children }: { ids: Ids; children?: ReactNode }) {
  return (
    <defs>
      <linearGradient id={ids.face} gradientUnits="userSpaceOnUse" x1="30" y1="20" x2="210" y2="220">
        <stop offset="0" style={{ stopColor: "var(--clay-hi)" }} />
        <stop offset="0.5" style={{ stopColor: "var(--clay-mid)" }} />
        <stop offset="1" style={{ stopColor: "var(--clay-lo)" }} />
      </linearGradient>
      <linearGradient id={ids.recess} gradientUnits="userSpaceOnUse" x1="200" y1="210" x2="40" y2="30">
        <stop offset="0" style={{ stopColor: "var(--clay-mid)" }} />
        <stop offset="1" style={{ stopColor: "var(--clay-edge)" }} />
      </linearGradient>
      <radialGradient id={ids.sheen} gradientUnits="userSpaceOnUse" cx="70" cy="50" r="150">
        <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
        <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <filter id={ids.blur} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="9" />
      </filter>
      {children}
    </defs>
  )
}

function Shadow({ ids, cx, cy, rx, ry }: { ids: Ids; cx: number; cy: number; rx: number; ry: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="var(--clay-shadow)" filter={`url(#${ids.blur})`} />
}

/** A gear outline (teeth plus a centre hole) as one even-odd path. */
function gearPath(cx: number, cy: number, outer: number, inner: number, hole: number, teeth: number) {
  const points: string[] = []
  const step = (Math.PI * 2) / teeth
  for (let i = 0; i < teeth; i++) {
    const a = i * step
    const corners = [
      [a - step * 0.5, inner],
      [a - step * 0.22, outer],
      [a + step * 0.22, outer],
      [a + step * 0.5, inner],
    ]
    for (const [angle, r] of corners) points.push(`${(cx + Math.cos(angle) * r).toFixed(1)} ${(cy + Math.sin(angle) * r).toFixed(1)}`)
  }
  const ring = `M${points.join(" L")} Z`
  const hollow = `M${cx + hole} ${cy} a${hole} ${hole} 0 1 0 ${-hole * 2} 0 a${hole} ${hole} 0 1 0 ${hole * 2} 0 Z`
  return `${ring} ${hollow}`
}

const GEAR = gearPath(104, 112, 78, 62, 26, 10)
const EDGE = "var(--clay-edge)"
const LED = "var(--clay-led)"

/** Each illustration, drawn in a 240 × 240 box. */
const ART: Record<ServiceArtKind, (c: Ctx) => ReactNode> = {
  software: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <path
          id={shape("code")}
          d="M80 74 L42 120 L80 166 M138 62 L104 178 M162 74 L200 120 L162 166"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="rotate(-12 120 120)"
        />
      </Defs>
      <Shadow ids={ids} cx={124} cy={214} rx={84} ry={11} />
      <Solid href={shape("code")} ids={ids} depth={14} paint="stroke" width={26} />
    </>
  ),

  infrastructure: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <path id={shape("cloud")} d="M66 116 C40 116 36 80 62 76 C62 50 94 38 112 52 C124 28 166 32 170 62 C198 60 206 104 180 116 Z" />
        <rect id={shape("slab")} x="58" y="0" width="128" height="22" rx="9" />
      </Defs>
      <Shadow ids={ids} cx={124} cy={232} rx={78} ry={9} />
      <Solid href={shape("cloud")} ids={ids} depth={12} />
      {[158, 186, 214].map((y, i) => (
        <g key={y} transform={`translate(0 ${y - 22})`}>
          <Solid href={shape("slab")} ids={ids} depth={7} />
          <rect x="72" y="9" width="44" height="4" rx="2" fill={EDGE} opacity="0.7" />
          <circle cx="160" cy="11" r="3.5" fill={i === 0 ? LED : EDGE} />
          <circle cx="172" cy="11" r="3.5" fill={EDGE} />
        </g>
      ))}
    </>
  ),

  design: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <g id={shape("nib")} transform="rotate(-38 120 130)">
          <path d="M120 214 L76 130 C70 118 74 104 86 98 L92 66 L148 66 L154 98 C166 104 170 118 164 130 Z" />
        </g>
        <g id={shape("collar")} transform="rotate(-38 120 130)">
          <rect x="84" y="34" width="72" height="28" rx="8" />
        </g>
      </Defs>
      <Shadow ids={ids} cx={112} cy={214} rx={70} ry={10} />
      <Solid href={shape("collar")} ids={ids} depth={10} />
      <Solid href={shape("nib")} ids={ids} depth={12} />
      <g transform="rotate(-38 120 130)">
        <path d="M120 206 L120 134" stroke={EDGE} strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="120" cy="128" r="8" fill={EDGE} />
      </g>
    </>
  ),

  strategy: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <circle id={shape("disc")} cx="120" cy="120" r="80" />
        <circle id={shape("loop")} cx="120" cy="30" r="13" />
      </Defs>
      <Shadow ids={ids} cx={124} cy={214} rx={74} ry={11} />
      <g transform="rotate(-14 120 120)">
        <Solid href={shape("loop")} ids={ids} depth={8} dx={0.2} paint="stroke" width={9} />
        <Solid href={shape("disc")} ids={ids} depth={16} dx={0.2} />
        <circle cx="120" cy="120" r="62" fill={`url(#${ids.recess})`} />
        {[0, 90, 180, 270].map((a) => (
          <rect key={a} x="117" y="62" width="6" height="12" rx="3" fill="var(--clay-mid)" transform={`rotate(${a} 120 120)`} />
        ))}
        <g transform="rotate(38 120 120)">
          <path d="M120 70 L133 120 L107 120 Z" fill="var(--clay-hi)" />
          <path d="M107 120 L133 120 L120 170 Z" fill={EDGE} />
        </g>
        <circle cx="120" cy="120" r="8" fill="var(--clay-mid)" stroke={EDGE} strokeWidth="2" />
      </g>
    </>
  ),

  support: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <path id={shape("gear")} d={GEAR} fillRule="evenodd" />
        <g id={shape("wrench")} transform="rotate(42 150 132)">
          <path d="M122 96 C102 88 102 48 122 40 L130 60 L154 60 L162 40 C182 48 182 88 162 96 Z" />
          <path d="M130 92 L130 214 a12 12 0 0 0 24 0 L154 92 Z" />
        </g>
      </Defs>
      <Shadow ids={ids} cx={128} cy={220} rx={90} ry={11} />
      <Solid href={shape("gear")} ids={ids} depth={14} />
      <Solid href={shape("wrench")} ids={ids} depth={10} />
    </>
  ),

  next: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <path
          id={shape("arrow")}
          d="M106 204 L106 112 L74 112 L120 48 L166 112 L134 112 L134 204 Q134 212 126 212 L114 212 Q106 212 106 204 Z"
          strokeLinejoin="round"
          transform="rotate(45 120 130)"
        />
      </Defs>
      <Shadow ids={ids} cx={118} cy={214} rx={70} ry={10} />
      <Solid href={shape("arrow")} ids={ids} depth={16} />
    </>
  ),

  // Three blocks stacked into a small tower: building something up.
  build: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <rect id={shape("block-lg")} x="52" y="134" width="110" height="62" rx="16" />
        <rect id={shape("block-md")} x="86" y="82" width="92" height="52" rx="14" />
        <rect id={shape("block-sm")} x="70" y="38" width="64" height="44" rx="12" />
      </Defs>
      <Shadow ids={ids} cx={116} cy={214} rx={78} ry={10} />
      <Solid href={shape("block-lg")} ids={ids} depth={12} />
      <Solid href={shape("block-md")} ids={ids} depth={11} />
      <Solid href={shape("block-sm")} ids={ids} depth={10} />
    </>
  ),

  // A lifebuoy: a clay ring with four lighter bands.
  care: ({ ids, shape }) => {
    const r = 66
    const c = 2 * Math.PI * r
    return (
      <>
        <Defs ids={ids}>
          <circle id={shape("ring")} cx="120" cy="112" r={r} />
        </Defs>
        <Shadow ids={ids} cx={124} cy={212} rx={80} ry={11} />
        <Solid href={shape("ring")} ids={ids} depth={14} dx={0.3} paint="stroke" width={38} />
        <circle
          cx="120"
          cy="112"
          r={r}
          fill="none"
          stroke="var(--clay-hi)"
          strokeWidth="38"
          strokeDasharray={`${c / 10} ${c / 4 - c / 10}`}
          strokeDashoffset={c / 20}
          opacity="0.55"
          transform="rotate(-45 120 112)"
        />
        <circle cx="120" cy="112" r={r} fill="none" stroke={`url(#${ids.sheen})`} strokeWidth="38" />
      </>
    )
  },

  // Two people side by side, the one behind set back and darker.
  team: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <circle id={shape("head-back")} cx="150" cy="70" r="28" />
        <path id={shape("body-back")} d="M98 176 C98 132 120 112 150 112 C180 112 202 132 202 176 Z" />
        <circle id={shape("head-front")} cx="98" cy="92" r="32" />
        <path id={shape("body-front")} d="M38 206 C38 156 64 134 98 134 C132 134 158 156 158 206 Z" />
      </Defs>
      <Shadow ids={ids} cx={120} cy={216} rx={88} ry={10} />
      <g opacity="0.75">
        <Solid href={shape("body-back")} ids={ids} depth={9} />
        <Solid href={shape("head-back")} ids={ids} depth={9} />
      </g>
      <Solid href={shape("body-front")} ids={ids} depth={11} />
      <Solid href={shape("head-front")} ids={ids} depth={11} />
    </>
  ),

  // A sphere with meridians and parallels pressed into it.
  globe: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <circle id={shape("ball")} cx="120" cy="112" r="76" />
      </Defs>
      <Shadow ids={ids} cx={124} cy={212} rx={76} ry={11} />
      <Solid href={shape("ball")} ids={ids} depth={10} dx={0.3} />
      <g fill="none" stroke={EDGE} strokeWidth="4" opacity="0.65" strokeLinecap="round">
        <ellipse cx="120" cy="112" rx="32" ry="76" />
        <path d="M44 112 H196" />
        <path d="M56 76 Q120 94 184 76" />
        <path d="M56 148 Q120 130 184 148" />
      </g>
    </>
  ),

  phone: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <rect id={shape("body")} x="78" y="30" width="86" height="164" rx="22" transform="rotate(-10 120 112)" />
      </Defs>
      <Shadow ids={ids} cx={122} cy={214} rx={64} ry={10} />
      <Solid href={shape("body")} ids={ids} depth={12} />
      <g transform="rotate(-10 120 112)">
        <rect x="89" y="48" width="64" height="122" rx="10" fill={`url(#${ids.recess})`} />
        <rect x="100" y="64" width="34" height="8" rx="4" fill={LED} opacity="0.85" />
        <rect x="100" y="80" width="42" height="6" rx="3" fill="var(--clay-mid)" />
        <circle cx="121" cy="182" r="5" fill={EDGE} />
      </g>
    </>
  ),

  rocket: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <g id={shape("fins")} transform="rotate(35 120 120)">
          <path d="M86 118 L56 166 L88 158 Z" />
          <path d="M154 118 L184 166 L152 158 Z" />
        </g>
        <path id={shape("body")} d="M120 28 C152 52 162 96 156 148 L84 148 C78 96 88 52 120 28 Z" transform="rotate(35 120 120)" />
      </Defs>
      <Shadow ids={ids} cx={112} cy={216} rx={72} ry={10} />
      <g transform="rotate(35 120 120)">
        <path d="M100 152 L140 152 L132 182 L120 206 L108 182 Z" fill={LED} opacity="0.9" />
      </g>
      <Solid href={shape("fins")} ids={ids} depth={9} />
      <Solid href={shape("body")} ids={ids} depth={12} />
      <g transform="rotate(35 120 120)">
        <circle cx="120" cy="88" r="17" fill={EDGE} />
        <circle cx="120" cy="88" r="11" fill={`url(#${ids.recess})`} />
      </g>
    </>
  ),

  bolt: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <path id={shape("bolt")} d="M138 28 L66 130 L112 130 L98 212 L174 100 L126 100 L146 28 Z" strokeLinejoin="round" />
      </Defs>
      <Shadow ids={ids} cx={120} cy={216} rx={64} ry={10} />
      <Solid href={shape("bolt")} ids={ids} depth={14} />
    </>
  ),

  // Two interlocking chain links.
  link: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <rect id={shape("a")} x="34" y="94" width="104" height="56" rx="28" transform="rotate(-35 120 122)" />
        <rect id={shape("b")} x="102" y="94" width="104" height="56" rx="28" transform="rotate(-35 120 122)" />
      </Defs>
      <Shadow ids={ids} cx={122} cy={212} rx={80} ry={10} />
      <Solid href={shape("a")} ids={ids} depth={10} paint="stroke" width={18} />
      <Solid href={shape("b")} ids={ids} depth={10} paint="stroke" width={18} />
    </>
  ),

  // A continuous loop, as drawn for CI/CD.
  cycle: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <path
          id={shape("loop")}
          d="M120 116 C98 82 52 76 46 110 C40 146 94 152 120 116 C146 80 200 86 194 122 C188 156 142 150 120 116 Z"
          strokeLinejoin="round"
        />
      </Defs>
      <Shadow ids={ids} cx={122} cy={196} rx={86} ry={10} />
      <Solid href={shape("loop")} ids={ids} depth={12} paint="stroke" width={22} />
      <circle cx="194" cy="122" r="5" fill={LED} />
    </>
  ),

  // Three stacked discs, each an extruded ellipse.
  database: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <ellipse id={shape("disc")} cx="120" cy="0" rx="66" ry="20" />
      </Defs>
      <Shadow ids={ids} cx={122} cy={216} rx={80} ry={11} />
      {[160, 114, 68].map((y, i) => (
        <g key={y} transform={`translate(0 ${y})`}>
          <Solid href={shape("disc")} ids={ids} depth={30} dx={0} />
          <circle cx="166" cy="26" r="4" fill={i === 2 ? LED : EDGE} />
        </g>
      ))}
    </>
  ),

  monitor: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <rect id={shape("screen")} x="36" y="40" width="168" height="112" rx="14" />
        <rect id={shape("neck")} x="106" y="152" width="28" height="30" rx="4" />
        <rect id={shape("base")} x="76" y="180" width="88" height="16" rx="8" />
      </Defs>
      <Shadow ids={ids} cx={122} cy={214} rx={80} ry={9} />
      <Solid href={shape("neck")} ids={ids} depth={6} />
      <Solid href={shape("base")} ids={ids} depth={7} />
      <Solid href={shape("screen")} ids={ids} depth={10} />
      <rect x="48" y="52" width="144" height="88" rx="6" fill={`url(#${ids.recess})`} />
      <rect x="62" y="68" width="52" height="9" rx="4.5" fill={LED} opacity="0.85" />
      <rect x="62" y="86" width="96" height="7" rx="3.5" fill="var(--clay-mid)" />
      <rect x="62" y="100" width="74" height="7" rx="3.5" fill="var(--clay-mid)" />
    </>
  ),

  // A round badge with a raised tick.
  check: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <circle id={shape("badge")} cx="120" cy="112" r="76" />
        <path id={shape("tick")} d="M86 114 L110 138 L156 90" strokeLinecap="round" strokeLinejoin="round" />
      </Defs>
      <Shadow ids={ids} cx={124} cy={212} rx={76} ry={11} />
      <Solid href={shape("badge")} ids={ids} depth={12} dx={0.3} />
      <circle cx="120" cy="112" r="58" fill={`url(#${ids.recess})`} />
      <Solid href={shape("tick")} ids={ids} depth={6} paint="stroke" width={20} />
    </>
  ),

  // A target with a dart in the centre ring.
  target: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <circle id={shape("board")} cx="112" cy="120" r="78" />
        <path id={shape("dart")} d="M112 120 L184 48" strokeLinecap="round" />
        <path id={shape("fletch")} d="M174 38 L206 30 L198 64 Z" strokeLinejoin="round" />
      </Defs>
      <Shadow ids={ids} cx={116} cy={214} rx={78} ry={11} />
      <Solid href={shape("board")} ids={ids} depth={12} dx={0.3} />
      <circle cx="112" cy="120" r="58" fill={`url(#${ids.recess})`} />
      <circle cx="112" cy="120" r="38" fill="var(--clay-mid)" />
      <circle cx="112" cy="120" r="18" fill={`url(#${ids.recess})`} />
      <Solid href={shape("dart")} ids={ids} depth={4} paint="stroke" width={9} />
      <Solid href={shape("fletch")} ids={ids} depth={5} />
    </>
  ),

  // Three nodes joined by connectors.
  workflow: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <rect id={shape("a")} x="34" y="38" width="66" height="66" rx="16" />
        <rect id={shape("b")} x="140" y="38" width="66" height="66" rx="16" />
        <rect id={shape("c")} x="87" y="140" width="66" height="66" rx="16" />
      </Defs>
      <Shadow ids={ids} cx={120} cy={222} rx={80} ry={9} />
      <path d="M100 71 H140 M67 104 V173 H87 M173 104 V173 H153" fill="none" stroke={EDGE} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <Solid href={shape("a")} ids={ids} depth={10} />
      <Solid href={shape("b")} ids={ids} depth={10} />
      <Solid href={shape("c")} ids={ids} depth={10} />
      <circle cx="120" cy="173" r="7" fill={LED} />
    </>
  ),

  headset: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <path id={shape("band")} d="M60 132 C60 66 180 66 180 132" strokeLinecap="round" />
        <rect id={shape("left")} x="40" y="116" width="38" height="62" rx="16" />
        <rect id={shape("right")} x="162" y="116" width="38" height="62" rx="16" />
        <path id={shape("mic")} d="M180 170 C176 198 156 204 132 204" strokeLinecap="round" />
      </Defs>
      <Shadow ids={ids} cx={120} cy={218} rx={84} ry={10} />
      <Solid href={shape("band")} ids={ids} depth={8} paint="stroke" width={16} />
      <Solid href={shape("mic")} ids={ids} depth={4} paint="stroke" width={8} />
      <Solid href={shape("left")} ids={ids} depth={10} />
      <Solid href={shape("right")} ids={ids} depth={10} />
      <circle cx="128" cy="204" r="9" fill={LED} />
    </>
  ),

  // A small stack of coins.
  coins: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <ellipse id={shape("coin")} cx="0" cy="0" rx="58" ry="18" />
      </Defs>
      <Shadow ids={ids} cx={122} cy={214} rx={82} ry={11} />
      {[
        [112, 180],
        [124, 152],
        [110, 124],
        [126, 96],
      ].map(([x, y], i, all) => (
        <g key={y} transform={`translate(${x} ${y})`}>
          <Solid href={shape("coin")} ids={ids} depth={16} dx={0} />
          {i === all.length - 1 ? <ellipse cx="0" cy="0" rx="40" ry="11" fill="none" stroke={EDGE} strokeWidth="3" opacity="0.7" /> : null}
        </g>
      ))}
    </>
  ),

  idcard: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <rect id={shape("card")} x="30" y="58" width="180" height="116" rx="16" transform="rotate(-8 120 116)" />
      </Defs>
      <Shadow ids={ids} cx={122} cy={208} rx={86} ry={10} />
      <Solid href={shape("card")} ids={ids} depth={10} />
      <g transform="rotate(-8 120 116)">
        <rect x="48" y="80" width="54" height="66" rx="10" fill={`url(#${ids.recess})`} />
        <circle cx="75" cy="104" r="12" fill="var(--clay-mid)" />
        <path d="M56 140 C58 124 92 124 94 140 Z" fill="var(--clay-mid)" />
        <rect x="116" y="90" width="72" height="9" rx="4.5" fill={LED} opacity="0.85" />
        <rect x="116" y="110" width="56" height="8" rx="4" fill={EDGE} />
        <rect x="116" y="128" width="64" height="8" rx="4" fill={EDGE} />
      </g>
    </>
  ),

  // Two arrows passing in opposite directions: matching one side to the other.
  swap: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <path id={shape("right")} d="M46 82 H148 V58 L196 92 L148 126 V102 H46 Q38 102 38 92 Q38 82 46 82 Z" strokeLinejoin="round" />
        <path id={shape("left")} d="M194 140 H92 V116 L44 150 L92 184 V160 H194 Q202 160 202 150 Q202 140 194 140 Z" strokeLinejoin="round" />
      </Defs>
      <Shadow ids={ids} cx={122} cy={212} rx={84} ry={10} />
      <Solid href={shape("right")} ids={ids} depth={10} />
      <Solid href={shape("left")} ids={ids} depth={10} />
    </>
  ),

  // Rising bars with a trend line.
  chart: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <rect id={shape("a")} x="50" y="142" width="36" height="56" rx="9" />
        <rect id={shape("b")} x="102" y="108" width="36" height="90" rx="9" />
        <rect id={shape("c")} x="154" y="72" width="36" height="126" rx="9" />
      </Defs>
      <Shadow ids={ids} cx={122} cy={218} rx={84} ry={9} />
      <Solid href={shape("a")} ids={ids} depth={10} />
      <Solid href={shape("b")} ids={ids} depth={10} />
      <Solid href={shape("c")} ids={ids} depth={10} />
      <path d="M44 118 L96 84 L130 96 L184 44" fill="none" stroke={LED} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M166 38 L194 36 L192 64 Z" fill={LED} strokeLinejoin="round" />
    </>
  ),

  // A sound wave as a row of rounded bars.
  wave: ({ ids, shape }) => {
    const heights = [40, 82, 124, 156, 112, 74, 42]
    return (
      <>
        <Defs ids={ids}>
          {heights.map((h, i) => (
            <rect key={h} id={shape(`bar${i}`)} x={42 + i * 23} y={112 - h / 2} width="16" height={h} rx="8" />
          ))}
        </Defs>
        <Shadow ids={ids} cx={120} cy={212} rx={86} ry={9} />
        {heights.map((h, i) => (
          <Solid key={h} href={shape(`bar${i}`)} ids={ids} depth={8} />
        ))}
      </>
    )
  },

  // A speech bubble with three dots.
  message: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <path
          id={shape("bubble")}
          d="M44 70 Q44 44 70 44 H170 Q196 44 196 70 V128 Q196 154 170 154 H106 L68 190 L74 154 H70 Q44 154 44 128 Z"
          strokeLinejoin="round"
        />
      </Defs>
      <Shadow ids={ids} cx={118} cy={208} rx={80} ry={10} />
      <Solid href={shape("bubble")} ids={ids} depth={12} />
      <circle cx="90" cy="100" r="10" fill={EDGE} />
      <circle cx="120" cy="100" r="10" fill={EDGE} />
      <circle cx="150" cy="100" r="10" fill={LED} />
    </>
  ),

  // A page under a scan line, with the frame's corners.
  scan: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <rect id={shape("page")} x="70" y="40" width="100" height="134" rx="12" />
      </Defs>
      <Shadow ids={ids} cx={122} cy={208} rx={66} ry={9} />
      <Solid href={shape("page")} ids={ids} depth={10} />
      <g fill={EDGE}>
        <rect x="86" y="62" width="58" height="8" rx="4" />
        <rect x="86" y="80" width="68" height="7" rx="3.5" />
        <rect x="86" y="124" width="62" height="7" rx="3.5" />
        <rect x="86" y="140" width="44" height="7" rx="3.5" />
      </g>
      <rect x="54" y="100" width="132" height="8" rx="4" fill={LED} opacity="0.9" />
      <path
        d="M48 54 V34 H68 M172 34 H192 V54 M192 170 V190 H172 M68 190 H48 V170"
        fill="none"
        stroke="var(--clay-mid)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),

  // A shield with a pressed-in tick: deciding within the rules.
  shield: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <path id={shape("shield")} d="M120 30 L186 56 V110 C186 156 158 186 120 204 C82 186 54 156 54 110 V56 Z" strokeLinejoin="round" />
      </Defs>
      <Shadow ids={ids} cx={122} cy={216} rx={70} ry={10} />
      <Solid href={shape("shield")} ids={ids} depth={12} />
      <path d="M92 116 L112 136 L150 94" fill="none" stroke={EDGE} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),

  // An inbox tray with a well in the middle.
  inbox: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <path id={shape("tray")} d="M42 122 L72 58 H168 L198 122 V176 Q198 190 184 190 H56 Q42 190 42 176 Z" strokeLinejoin="round" />
      </Defs>
      <Shadow ids={ids} cx={122} cy={212} rx={84} ry={10} />
      <Solid href={shape("tray")} ids={ids} depth={12} />
      <path d="M78 70 H162 L186 122 H148 L138 142 H102 L92 122 H54 Z" fill={`url(#${ids.recess})`} strokeLinejoin="round" />
      <rect x="100" y="92" width="40" height="8" rx="4" fill={LED} opacity="0.9" />
    </>
  ),

  // Contact and legal pages
  // A page with a folded corner and lines of text.
  document: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <path id={shape("page")} d="M66 34 H146 L180 68 V196 Q180 206 170 206 H66 Q56 206 56 196 V44 Q56 34 66 34 Z" strokeLinejoin="round" transform="rotate(-6 120 120)" />
        <path id={shape("fold")} d="M146 34 V58 Q146 68 156 68 H180 Z" transform="rotate(-6 120 120)" />
      </Defs>
      <Shadow ids={ids} cx={120} cy={220} rx={70} ry={9} />
      <Solid href={shape("page")} ids={ids} depth={10} />
      <use href={`#${shape("fold")}`} fill="var(--clay-lo)" />
      <g transform="rotate(-6 120 120)" fill={EDGE}>
        <rect x="76" y="88" width="68" height="8" rx="4" fill={LED} opacity="0.85" />
        <rect x="76" y="108" width="84" height="7" rx="3.5" />
        <rect x="76" y="126" width="76" height="7" rx="3.5" />
        <rect x="76" y="144" width="84" height="7" rx="3.5" />
        <rect x="76" y="162" width="52" height="7" rx="3.5" />
      </g>
    </>
  ),
  // A desk calendar with rings and one marked day.
  calendar: ({ ids, shape }) => (
    <>
      <Defs ids={ids}>
        <rect id={shape("body")} x="40" y="52" width="160" height="146" rx="18" />
        <rect id={shape("ring")} x="0" y="34" width="14" height="38" rx="7" />
      </Defs>
      <Shadow ids={ids} cx={122} cy={216} rx={84} ry={10} />
      <Solid href={shape("body")} ids={ids} depth={12} />
      <rect x="40" y="52" width="160" height="40" rx="18" fill="var(--clay-mid)" opacity="0.7" />
      {[0, 1, 2].flatMap((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={58 + col * 34}
            y={106 + row * 28}
            width="22"
            height="16"
            rx="5"
            fill={row === 1 && col === 2 ? LED : EDGE}
            opacity={row === 1 && col === 2 ? 0.9 : 0.6}
          />
        )),
      )}
      <g transform="translate(78 0)"><Solid href={shape("ring")} ids={ids} depth={5} /></g>
      <g transform="translate(148 0)"><Solid href={shape("ring")} ids={ids} depth={5} /></g>
    </>
  ),
}

export default function ServiceArt({ kind, className }: { kind: ServiceArtKind; className?: string }) {
  const raw = useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const ids: Ids = { face: `${raw}f`, sheen: `${raw}s`, blur: `${raw}b`, recess: `${raw}r` }
  const shape = (name: string) => `${raw}-${name}`
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true" focusable="false">
      {ART[kind]({ ids, shape })}
    </svg>
  )
}
