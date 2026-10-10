import { useEffect, useMemo, useRef, useState } from "react";
import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import land110 from "world-atlas/land-110m.json";

type LonLat = [number, number];

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
const centreAt = (t: number): [number, number, number] => [-(22 + 34 * Math.sin((t / SWING_MS) * Math.PI * 2)), -12, 0];

/**
 * An orthographic globe with the continents, Nairobi pinned and routes out to
 * other cities. It turns slowly while on screen and holds still for reduced
 * motion.
 */
export default function ReachGlobe() {
  const ref = useRef<SVGSVGElement>(null);
  const [rotate, setRotate] = useState(() => centreAt(0));

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      setRotate(centreAt(now - start));
      frame = requestAnimationFrame(tick);
    };
    // Only spin while the globe is on screen.
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry.isIntersecting) frame = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

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
    <div className="ai-earth">
      <svg ref={ref} viewBox={`0 0 ${SIZE} ${SIZE}`} className="ai-earth-svg" aria-hidden="true">
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
