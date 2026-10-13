"use client";

import { useEffect, useRef } from "react";

/*
 * An illustrated city at dusk, drawn as one inline SVG and kept moving:
 * trains run along two elevated tracks, windows flicker, trees sway, a pipe
 * lets off steam and the layers drift with the pointer. Everything is
 * generated from fixed data so the server and client render the same markup.
 */

const W = 1280;
const H = 720;

type Pt = [number, number];
type Cubic = [Pt, Pt, Pt, Pt];

function cubicAt([a, b, c, d]: Cubic, t: number): Pt {
  const u = 1 - t;
  const k = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return [
    k[0] * a[0] + k[1] * b[0] + k[2] * c[0] + k[3] * d[0],
    k[0] * a[1] + k[1] * b[1] + k[2] * c[1] + k[3] * d[1],
  ];
}

function samplePath(segments: Cubic[], steps = 200) {
  const pts: Pt[] = [];
  for (const seg of segments) for (let i = 0; i <= steps; i++) pts.push(cubicAt(seg, i / steps));
  return pts;
}

function pathLength(pts: Pt[]) {
  let len = 0;
  for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  return len;
}

function yAt(pts: Pt[], x: number) {
  let best = pts[0];
  for (const p of pts) if (Math.abs(p[0] - x) < Math.abs(best[0] - x)) best = p;
  return best[1];
}

function toD(segments: Cubic[]) {
  const [first] = segments;
  return (
    `M ${first[0][0]} ${first[0][1]} ` +
    segments.map(([, b, c, d]) => `C ${b[0]} ${b[1]}, ${c[0]} ${c[1]}, ${d[0]} ${d[1]}`).join(" ")
  );
}

// Seeded random, so every render draws the same city.
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const HIGH_TRACK: Cubic[] = [
  [[-320, 450], [120, 450], [330, 560], [640, 548]],
  [[640, 548], [930, 536], [1100, 430], [1600, 440]],
];
const LOW_TRACK: Cubic[] = [[[1600, 640], [1100, 650], [300, 600], [-320, 630]]];

const highPts = samplePath(HIGH_TRACK);
const lowPts = samplePath(LOW_TRACK);
const HIGH_LEN = pathLength(highPts);
const LOW_LEN = pathLength(lowPts);

type Building = { x: number; top: number; w: number; layer: 0 | 1 | 2 };

// layer 0 = far, 1 = middle, 2 = near
const BUILDINGS: Building[] = [
  { x: 40, top: 230, w: 110, layer: 0 },
  { x: 250, top: 170, w: 90, layer: 0 },
  { x: 470, top: 120, w: 130, layer: 0 },
  { x: 700, top: 200, w: 100, layer: 0 },
  { x: 880, top: 90, w: 120, layer: 0 },
  { x: 1090, top: 160, w: 110, layer: 0 },
  { x: 150, top: 260, w: 120, layer: 1 },
  { x: 360, top: 300, w: 150, layer: 1 },
  { x: 610, top: 250, w: 110, layer: 1 },
  { x: 800, top: 290, w: 130, layer: 1 },
  { x: 990, top: 220, w: 120, layer: 1 },
  { x: -20, top: 10, w: 200, layer: 2 },
  { x: 1100, top: 60, w: 210, layer: 2 },
];

const LAYER = [
  { fill: "#5b6fc4", window: "#4a5cb0", cellW: 10, cellH: 13, winW: 5, winH: 7 },
  { fill: "#6c80d4", window: "#5165bd", cellW: 13, cellH: 16, winW: 7, winH: 9 },
  { fill: "#3a4c9a", window: "#2c3b80", cellW: 16, cellH: 19, winW: 9, winH: 11 },
];

type Window = { x: number; y: number; w: number; h: number; flicker: boolean; delay: number };

function litWindows(b: Building, rand: () => number): Window[] {
  const l = LAYER[b.layer];
  const out: Window[] = [];
  const pad = 10;
  const startCol = Math.ceil((b.x + pad) / l.cellW);
  const endCol = Math.floor((b.x + b.w - pad - l.winW) / l.cellW);
  const startRow = Math.ceil((b.top + 18) / l.cellH);
  const endRow = Math.floor((H - l.winH) / l.cellH);
  for (let c = startCol; c <= endCol; c++) {
    for (let r = startRow; r <= endRow; r++) {
      if (rand() > 0.16) continue;
      out.push({
        x: c * l.cellW + 2,
        y: r * l.cellH + 2,
        w: l.winW,
        h: l.winH,
        flicker: rand() < 0.25,
        delay: Math.round(rand() * 80) / 10,
      });
    }
  }
  return out;
}

const rand = rng(7);
const WINDOWS = BUILDINGS.map((b) => litWindows(b, rand));

// Pillars under the high track.
const PILLARS = [-40, 180, 400, 620, 840, 1060, 1260].map((x) => ({ x, y: yAt(highPts, x) }));

const TREES: { x: number; y: number; r: number; delay: number }[] = [
  { x: 60, y: 640, r: 70, delay: 0 },
  { x: 180, y: 690, r: 60, delay: 1.2 },
  { x: 470, y: 700, r: 55, delay: 0.6 },
  { x: 900, y: 690, r: 65, delay: 1.8 },
  { x: 1080, y: 600, r: 80, delay: 0.3 },
  { x: 1220, y: 670, r: 75, delay: 1.4 },
];

function Train({
  d,
  len,
  cars,
  dur,
  color,
  stripe,
  reverse = false,
}: {
  d: string;
  len: number;
  cars: number;
  dur: number;
  color: string;
  stripe: string;
  reverse?: boolean;
}) {
  const carLen = 74;
  const gap = 5;
  // The run takes 70% of the loop; the train rests off screen for the rest.
  const travel = dur * 0.7;
  const step = ((carLen + gap) / len) * travel;
  return (
    <>
      {Array.from({ length: cars }, (_, i) => (
        <g key={i}>
          <g transform={reverse ? "scale(-1 1)" : undefined}>
            <rect x={-carLen / 2} y={-24} width={carLen} height={20} rx={5} fill={color} />
            <rect x={-carLen / 2 + 6} y={-19} width={carLen - 12} height={6} rx={2} fill={stripe} />
            <rect x={-carLen / 2} y={-7} width={carLen} height={3} fill="#000" opacity={0.18} />
            {i === 0 ? <rect x={carLen / 2 - 6} y={-21} width={4} height={10} rx={2} fill="#fff4c9" /> : null}
          </g>
          <animateMotion
            dur={`${dur}s`}
            begin={`${-(i * step).toFixed(2)}s`}
            repeatCount="indefinite"
            rotate="auto"
            keyPoints="0;1;1"
            keyTimes="0;0.7;1"
            calcMode="linear"
            path={d}
          />
        </g>
      ))}
    </>
  );
}

export default function CityScene({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const svg = svgRef.current;
    if (!root || !svg) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;

    // SMIL ignores CSS, so the trains are paused by hand.
    const sync = () => {
      const run = visible && !reduced.matches;
      root.classList.toggle("is-paused", !run);
      if (run) svg.unpauseAnimations();
      else svg.pauseAnimations();
    };
    if (reduced.matches) svg.setCurrentTime(6);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(root);
    reduced.addEventListener("change", sync);

    // Layers drift a little with the pointer.
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (reduced.matches || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const box = root.getBoundingClientRect();
        root.style.setProperty("--px", ((e.clientX - box.left) / box.width - 0.5).toFixed(3));
        root.style.setProperty("--py", ((e.clientY - box.top) / box.height - 0.5).toFixed(3));
      });
    };
    const onLeave = () => {
      root.style.setProperty("--px", "0");
      root.style.setProperty("--py", "0");
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);

    return () => {
      io.disconnect();
      reduced.removeEventListener("change", sync);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  const highD = toD(HIGH_TRACK);
  const lowD = toD(LOW_TRACK);

  return (
    <div ref={rootRef} className={`city-scene ${className ?? ""}`} aria-hidden>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <defs>
          <linearGradient id="city-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2437a0" />
            <stop offset="0.55" stopColor="#3f57cc" />
            <stop offset="0.75" stopColor="#6a6fc8" />
            <stop offset="1" stopColor="#3a4c9a" />
          </linearGradient>
          {LAYER.map((l, i) => (
            <pattern key={i} id={`city-win-${i}`} width={l.cellW} height={l.cellH} patternUnits="userSpaceOnUse">
              <rect width={l.cellW} height={l.cellH} fill={l.fill} />
              <rect x={2} y={2} width={l.winW} height={l.winH} fill={l.window} />
            </pattern>
          ))}
        </defs>

        <rect width={W} height={H} fill="url(#city-sky)" />

        <g className="city-cloud" style={{ animationDuration: "90s" }}>
          <ellipse cx={200} cy={110} rx={120} ry={18} fill="#fff" opacity={0.12} />
          <ellipse cx={260} cy={96} rx={70} ry={14} fill="#fff" opacity={0.1} />
        </g>
        <g className="city-cloud" style={{ animationDuration: "130s", animationDelay: "-60s" }}>
          <ellipse cx={700} cy={60} rx={160} ry={16} fill="#fff" opacity={0.1} />
        </g>

        {([0, 1, 2] as const).map((layer) => (
          <g key={layer} className={`city-layer city-layer-${layer}`}>
            {BUILDINGS.map((b, i) =>
              b.layer === layer ? (
                <g key={i}>
                  <rect x={b.x} y={b.top} width={b.w} height={H - b.top} fill={`url(#city-win-${layer})`} />
                  <rect x={b.x} y={b.top} width={b.w} height={6} fill="#000" opacity={0.12} />
                  {WINDOWS[i].map((w, j) => (
                    <rect
                      key={j}
                      x={w.x}
                      y={w.y}
                      width={w.w}
                      height={w.h}
                      fill="#ffcf6b"
                      className={w.flicker ? "city-flicker" : undefined}
                      style={w.flicker ? { animationDelay: `${w.delay}s` } : undefined}
                    />
                  ))}
                </g>
              ) : null,
            )}

            {layer === 0 ? (
              // Aircraft warning light on the tallest tower.
              <circle cx={940} cy={78} r={4} fill="#ff5a3c" className="city-beacon" />
            ) : null}

            {layer === 1 ? (
              <>
                {/* Orange service pipes threading between buildings. */}
                <path
                  d="M 270 330 V 400 Q 270 420 290 420 H 340 Q 360 420 360 440 V 520"
                  className="city-pipe"
                />
                <path d="M 720 300 H 760 Q 780 300 780 320 V 470" className="city-pipe" />
                <path d="M 930 380 Q 950 380 950 360 V 330 Q 950 310 970 310 H 1000" className="city-pipe" />
                {[0, 1, 2].map((i) => (
                  <circle
                    key={i}
                    cx={720}
                    cy={290}
                    r={10}
                    fill="#fff"
                    className="city-steam"
                    style={{ animationDelay: `${i * 1.3}s` }}
                  />
                ))}
              </>
            ) : null}

            {layer === 2 ? (
              <>
                {/* Billboard with a flickering sign. */}
                <rect x={40} y={120} width={80} height={110} rx={4} fill="#c8743a" />
                <rect x={50} y={132} width={60} height={86} rx={2} fill="#f6e2c2" className="city-sign" />
                <path d="M 1130 260 V 330 Q 1130 350 1110 350 H 1060 V 470" className="city-pipe city-pipe-thick" />
              </>
            ) : null}
          </g>
        ))}

        <g className="city-layer city-layer-2">
          {PILLARS.map((p) => (
            <rect key={p.x} x={p.x - 9} y={p.y} width={18} height={H - p.y} fill="#7d8ccc" />
          ))}
          <path d={highD} fill="none" stroke="#9aa7de" strokeWidth={16} />
          <path d={highD} fill="none" stroke="#5a69ad" strokeWidth={3} transform="translate(0 6)" />
          <Train d={highD} len={HIGH_LEN} cars={6} dur={16} color="#e8743a" stripe="#ffd889" />

          <path d={lowD} fill="none" stroke="#8592cf" strokeWidth={14} />
          <Train d={lowD} len={LOW_LEN} cars={4} dur={13} color="#d9e0f7" stripe="#4a5cb0" />
        </g>

        <g className="city-layer city-layer-3">
          {TREES.map((t) => (
            <g key={t.x} className="city-tree" style={{ animationDelay: `${-t.delay}s` }}>
              <circle cx={t.x} cy={t.y} r={t.r} fill="#1f4a3a" />
              <circle cx={t.x - t.r * 0.45} cy={t.y + t.r * 0.2} r={t.r * 0.7} fill="#2a5e45" />
              <circle cx={t.x + t.r * 0.4} cy={t.y - t.r * 0.25} r={t.r * 0.55} fill="#34704f" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
