import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import land110 from "world-atlas/land-110m.json";

type LonLat = [number, number];
type Rotation = [number, number, number];

const SIZE = 600;
const NAIROBI: LonLat = [36.82, -1.29];
const DESTINATIONS: { name: string; at: LonLat }[] = [
  { name: "London", at: [-0.13, 51.51] },
  { name: "Dubai", at: [55.27, 25.2] },
  { name: "Lagos", at: [3.38, 6.52] },
  { name: "Johannesburg", at: [28.05, -26.2] },
  { name: "Mumbai", at: [72.88, 19.08] },
  { name: "Cairo", at: [31.24, 30.04] },
];

type Topology = Parameters<typeof feature>[0];
const topology = land110 as unknown as Topology;
const land = feature(topology, topology.objects.land);
const graticule = geoGraticule10();
const sphere = { type: "Sphere" } as const;

/** Centre longitude swings around East Africa so Nairobi always faces the viewer. */
const SWING_MS = 26000;
const centreAt = (t: number): Rotation => [-(22 + 34 * Math.sin((t / SWING_MS) * Math.PI * 2)), -12, 0];

/** How far the globe can tilt towards either pole while dragging, in degrees. */
const MAX_TILT = 70;
/** After a drag, how long the globe rests before easing back to its swing. */
const IDLE_MS = 2500;
/** Per-frame decay of the spin that carries on after a flick. */
const FRICTION = 0.94;
/** Arrow keys turn the globe by this many degrees. */
const KEY_STEP = 10;

const clampTilt = (phi: number) => Math.max(-MAX_TILT, Math.min(MAX_TILT, phi));
/** Shortest signed difference between two longitudes, in degrees. */
const lonDelta = (from: number, to: number) => ((((to - from) % 360) + 540) % 360) - 180;

/**
 * An orthographic globe with the continents, Nairobi pinned and routes out to
 * other cities. It swings slowly around East Africa while on screen, and can
 * be dragged with a mouse, finger or pen (or turned with the arrow keys). A
 * flick keeps it spinning briefly; after a short rest it eases back to its
 * swing. With reduced motion it holds still unless the visitor turns it.
 */
export default function ReachGlobe() {
  const ref = useRef<SVGSVGElement>(null);
  const [rotate, setRotate] = useState<Rotation>(() => centreAt(0));
  const [dragging, setDragging] = useState(false);

  // Mutable state shared by the pointer handlers and the animation loop.
  const live = useRef({
    rot: centreAt(0) as Rotation,
    drag: null as null | { id: number; x: number; y: number; t: number },
    velocity: [0, 0] as [number, number], // degrees per frame
    lastInput: -Infinity, // performance.now() of the last drag or key press
    reduced: false,
    kick: () => {}, // restarts the loop when it has gone idle
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const state = live.current;
    state.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    let running = false;
    let visible = false;
    let swingStart = 0;

    const commit = () => setRotate([...state.rot] as Rotation);

    const tick = (now: number) => {
      if (!swingStart) swingStart = now;
      let keepGoing = !state.reduced;

      if (state.drag) {
        // Pointer handlers move the globe; nothing to do but keep the loop alive.
        keepGoing = true;
      } else if (Math.abs(state.velocity[0]) > 0.02 || Math.abs(state.velocity[1]) > 0.02) {
        // Carry on spinning after a flick, slowing down each frame.
        state.rot = [state.rot[0] + state.velocity[0], clampTilt(state.rot[1] + state.velocity[1]), 0];
        state.velocity = [state.velocity[0] * FRICTION, state.velocity[1] * FRICTION];
        state.lastInput = now;
        commit();
        keepGoing = true;
      } else if (!state.reduced) {
        const target = centreAt(now - swingStart);
        if (now - state.lastInput < IDLE_MS) {
          // Resting after a drag: hold still.
        } else {
          // Ease back towards the swing; once close enough, follow it exactly.
          const dLon = lonDelta(state.rot[0], target[0]);
          const dLat = target[1] - state.rot[1];
          state.rot =
            Math.abs(dLon) < 0.05 && Math.abs(dLat) < 0.05
              ? target
              : [state.rot[0] + dLon * 0.04, state.rot[1] + dLat * 0.04, 0];
          commit();
        }
      }

      if (keepGoing && visible) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running || !visible) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };
    state.kick = start;

    // Only animate while the globe is on screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        start();
      } else {
        cancelAnimationFrame(frame);
        running = false;
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      state.kick = () => {};
    };
  }, []);

  /** Degrees of rotation per pixel dragged, so the surface tracks the pointer. */
  const degreesPerPixel = () => {
    const width = ref.current?.getBoundingClientRect().width || SIZE;
    return 180 / width;
  };

  const onPointerDown = (e: PointerEvent<SVGSVGElement>) => {
    if (e.button !== 0) return;
    // Only grab the globe itself, not the empty corners of its square.
    const box = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (box.left + box.width / 2);
    const dy = e.clientY - (box.top + box.height / 2);
    if (Math.hypot(dx, dy) > box.width / 2) return;
    const state = live.current;
    state.drag = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now() };
    state.velocity = [0, 0];
    state.lastInput = performance.now();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    state.kick();
  };

  const onPointerMove = (e: PointerEvent<SVGSVGElement>) => {
    const state = live.current;
    const drag = state.drag;
    if (!drag || drag.id !== e.pointerId) return;
    const k = degreesPerPixel();
    const dLon = (e.clientX - drag.x) * k;
    const dLat = -(e.clientY - drag.y) * k;
    const now = performance.now();
    const frames = Math.max(1, (now - drag.t) / 16.7);
    state.rot = [state.rot[0] + dLon, clampTilt(state.rot[1] + dLat), 0];
    state.velocity = [dLon / frames, dLat / frames];
    state.drag = { id: e.pointerId, x: e.clientX, y: e.clientY, t: now };
    state.lastInput = now;
    setRotate([...state.rot] as Rotation);
  };

  const endDrag = (e: PointerEvent<SVGSVGElement>) => {
    const state = live.current;
    if (!state.drag || state.drag.id !== e.pointerId) return;
    // A pointer that stopped before letting go should not fling the globe.
    if (performance.now() - state.drag.t > 80 || state.reduced) state.velocity = [0, 0];
    state.drag = null;
    state.lastInput = performance.now();
    setDragging(false);
    state.kick();
  };

  const onKeyDown = (e: KeyboardEvent<SVGSVGElement>) => {
    const step: Record<string, [number, number]> = {
      ArrowLeft: [-KEY_STEP, 0],
      ArrowRight: [KEY_STEP, 0],
      ArrowUp: [0, KEY_STEP],
      ArrowDown: [0, -KEY_STEP],
    };
    const move = step[e.key];
    if (!move) return;
    e.preventDefault();
    const state = live.current;
    state.velocity = [0, 0];
    state.rot = [state.rot[0] + move[0], clampTilt(state.rot[1] + move[1]), 0];
    state.lastInput = performance.now();
    setRotate([...state.rot] as Rotation);
    state.kick();
  };

  const { path, projection } = useMemo(() => {
    const projection = geoOrthographic()
      .scale(SIZE / 2 - 2)
      .translate([SIZE / 2, SIZE / 2])
      .clipAngle(90)
      .rotate(rotate);
    return { path: geoPath(projection), projection };
  }, [rotate]);

  const centre: LonLat = [-rotate[0], -rotate[1]];
  const facing = (p: LonLat) => geoDistance(p, centre) < Math.PI / 2 - 0.05;
  const [nx, ny] = projection(NAIROBI) ?? [0, 0];

  return (
    <div className={`ai-earth${dragging ? " is-dragging" : ""}`}>
      <svg
        ref={ref}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="ai-earth-svg"
        role="img"
        aria-label="Globe showing routes from Nairobi to London, Dubai, Lagos, Johannesburg, Mumbai and Cairo. Drag or use the arrow keys to turn it."
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
      >
        <path d={path(sphere) ?? undefined} className="ai-earth-sphere" />
        <path d={path(graticule) ?? undefined} className="ai-earth-grid" />
        <path d={path(land) ?? undefined} className="ai-earth-land" />
        {DESTINATIONS.map((d, i) => (
          <path
            key={d.name}
            d={path({ type: "LineString", coordinates: [NAIROBI, d.at] }) ?? undefined}
            pathLength={1}
            className="ai-earth-route"
            style={{ animationDelay: `${i * 0.7}s` }}
          />
        ))}
        {DESTINATIONS.filter((d) => facing(d.at)).map((d) => {
          const [x, y] = projection(d.at) ?? [0, 0];
          return <circle key={d.name} cx={x} cy={y} r={3} className="ai-earth-city" />;
        })}
      </svg>
      {facing(NAIROBI) ? (
        <div className="ai-pin" style={{ left: `${(nx / SIZE) * 100}%`, top: `${(ny / SIZE) * 100}%` }}>
          <span className="ai-pin-dot" />
          <span className="ai-pin-rule" />
          <span className="ai-pin-label">
            Nairobi<span className="ai-pin-coords"> · 1.29°S 36.82°E</span>
          </span>
        </div>
      ) : null}
    </div>
  );
}
