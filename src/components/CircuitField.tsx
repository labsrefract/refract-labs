import { useSyncExternalStore } from "react";

const TILE = 800;

function subscribe(onStoreChange: () => void) {
  const phone = window.matchMedia("(max-width: 40rem)");
  const tablet = window.matchMedia("(max-width: 64rem)");
  phone.addEventListener("change", onStoreChange);
  tablet.addEventListener("change", onStoreChange);
  return () => {
    phone.removeEventListener("change", onStoreChange);
    tablet.removeEventListener("change", onStoreChange);
  };
}

function circuitScale() {
  if (window.matchMedia("(max-width: 40rem)").matches) return 0.4;
  if (window.matchMedia("(max-width: 64rem)").matches) return 0.68;
  return 1;
}

function serverScale() {
  return 1;
}

function Pad({
  cx,
  cy,
  r = 2.4,
  scale,
}: {
  cx: number;
  cy: number;
  r?: number;
  scale: number;
}) {
  return <circle cx={cx} cy={cy} r={r / scale} />;
}

export default function CircuitField() {
  const scale = useSyncExternalStore(subscribe, circuitScale, serverScale);

  return (
    <svg className="circuit-field" aria-hidden="true">
      <defs>
        <pattern
          id="refract-traces"
          width={TILE}
          height={TILE}
          patternUnits="userSpaceOnUse"
          patternTransform={`scale(${scale})`}
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="miter"
            strokeLinecap="square"
            vectorEffect="nonScalingStroke"
            opacity="0.42"
          >
            <path d="M64 96 H168 L208 136 H292" />
            <path d="M520 56 V148 L560 188 H700" />
            <path d="M88 620 H200 L248 572 H360" />
            <path d="M640 520 L688 568 V700" />
          </g>
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="miter"
            strokeLinecap="square"
            vectorEffect="nonScalingStroke"
          >
            <path d="M40 220 H140 L188 268 V360 L228 400 H340" />
            <path d="M300 80 V168 L348 216 H460 L508 264 V340" />
            <path d="M580 240 H700 L748 288 V400" />
            <path d="M120 480 V560 L168 608 H280 L328 656 V740" />
            <path d="M400 480 H520 L568 528 H680 L728 576" />
            <path d="M48 740 H160 L200 700 H280" />
            <path d="M720 80 H640 L600 120 V200" />
            <path d="M380 640 L428 688 H540" />
          </g>
          <g fill="currentColor">
            <Pad scale={scale} cx={40} cy={220} />
            <Pad scale={scale} cx={340} cy={400} />
            <Pad scale={scale} cx={300} cy={80} />
            <Pad scale={scale} cx={508} cy={340} />
            <Pad scale={scale} cx={580} cy={240} />
            <Pad scale={scale} cx={748} cy={400} />
            <Pad scale={scale} cx={120} cy={480} />
            <Pad scale={scale} cx={328} cy={740} />
            <Pad scale={scale} cx={400} cy={480} />
            <Pad scale={scale} cx={728} cy={576} />
            <Pad scale={scale} cx={48} cy={740} />
            <Pad scale={scale} cx={280} cy={700} />
            <Pad scale={scale} cx={720} cy={80} />
            <Pad scale={scale} cx={600} cy={200} />
            <Pad scale={scale} cx={380} cy={640} />
            <Pad scale={scale} cx={540} cy={688} />
            <Pad scale={scale} cx={64} cy={96} r={1.8} />
            <Pad scale={scale} cx={292} cy={136} r={1.8} />
            <Pad scale={scale} cx={520} cy={56} r={1.8} />
            <Pad scale={scale} cx={700} cy={188} r={1.8} />
            <Pad scale={scale} cx={88} cy={620} r={1.8} />
            <Pad scale={scale} cx={360} cy={572} r={1.8} />
            <Pad scale={scale} cx={640} cy={520} r={1.8} />
            <Pad scale={scale} cx={688} cy={700} r={1.8} />
            <Pad scale={scale} cx={188} cy={268} r={2} />
            <Pad scale={scale} cx={348} cy={216} r={2} />
            <Pad scale={scale} cx={168} cy={608} r={2} />
            <Pad scale={scale} cx={568} cy={528} r={2} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#refract-traces)" />
    </svg>
  );
}
