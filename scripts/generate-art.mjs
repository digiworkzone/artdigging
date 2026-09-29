// Generates the placeholder artwork SVGs in public/images.
// Each work is a cut through layered ground with something buried in it.
// Run with `npm run art`. Output is deterministic (seeded per slug).
import { mkdirSync, writeFileSync } from "node:fs";

const root = new URL("../public/images/", import.meta.url);

const palettes = {
  laterite: ["#110c09", "#221610", "#361f14", "#522c1a", "#743d21", "#9a502a", "#c8743a", "#e7b27a"],
  ochre: ["#100d09", "#211910", "#372916", "#56401d", "#7c5c27", "#a67d33", "#d4a94f", "#f0dba6"],
  wood: ["#0e0b09", "#1c1612", "#2e231b", "#443325", "#5e4632", "#7c5e41", "#c8743a", "#e3c69a"],
  bead: ["#0e0a0b", "#1f1215", "#35191c", "#532525", "#7a342c", "#a84835", "#e3a04f", "#f3e3c3"],
  indigo: ["#0a0c11", "#131822", "#1d2433", "#29344b", "#3a4865", "#556585", "#c8743a", "#e9ddc6"],
};

const works = [
  { slug: "what-the-river-kept", palette: "laterite", motif: "river" },
  { slug: "red-earth-ledger", palette: "ochre", motif: "ledger" },
  { slug: "the-carvers-silence", palette: "wood", motif: "vessel" },
  { slug: "stool-for-an-absent-elder", palette: "wood", motif: "stool" },
  { slug: "counting-song", palette: "bead", motif: "beads" },
  { slug: "letters-never-sent", palette: "indigo", motif: "letters" },
];

const artists = [
  { slug: "amara-nwosu", palette: "laterite" },
  { slug: "kofi-mensah-asante", palette: "wood" },
  { slug: "zanele-dube", palette: "bead" },
  { slug: "yohannes-tesfaye", palette: "indigo" },
];

function hash(str) {
  let h = 2166136261;
  for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

const f = (n) => n.toFixed(1);

function defs(pal, W, H) {
  return `<defs>
  <radialGradient id="glow"><stop offset="0" stop-color="${pal[7]}" stop-opacity="0.55"/><stop offset="1" stop-color="${pal[6]}" stop-opacity="0"/></radialGradient>
  <radialGradient id="vignette" cx="0.5" cy="0.45" r="0.75"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.65"/></radialGradient>
  <filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.09"/></feComponentTransfer></filter>
</defs>
<rect width="${W}" height="${H}" fill="${pal[0]}"/>`;
}

function finish(W, H) {
  return `<rect width="${W}" height="${H}" fill="url(#vignette)"/>
<rect width="${W}" height="${H}" filter="url(#grain)"/>`;
}

function band(r, W, H, y, amp, color) {
  const freq = 0.6 + r() * 1.8;
  const phase = r() * Math.PI * 2;
  let d = `M0 ${H} L0 ${f(y)}`;
  const steps = 48;
  for (let i = 0; i <= steps; i++) {
    const x = (W / steps) * i;
    const yy = y + Math.sin((x / W) * Math.PI * 2 * freq + phase) * amp + (r() - 0.5) * amp * 0.3;
    d += ` L${f(x)} ${f(yy)}`;
  }
  return `<path d="${d} L${W} ${H} Z" fill="${color}"/>`;
}

function strata(r, pal, W, H, { top, count, amp, thin = false }) {
  const bands = [];
  let y = top;
  for (let i = 0; i < count; i++) {
    const depth = i / count;
    // Deeper layers trend darker; one lit seam somewhere in the middle.
    const idx = Math.max(1, Math.min(5, Math.round(5 - depth * 3 + (r() - 0.5) * 2)));
    bands.push({ y, color: pal[idx] });
    const gap = thin ? 8 + r() * 60 : 40 + r() * 90;
    y += gap;
    if (y > H) break;
  }
  const seam = 1 + Math.floor(r() * (bands.length - 2));
  bands[seam].color = pal[6];
  bands[seam + 1] && (bands[seam + 1].y = bands[seam].y + 3 + r() * 6);
  return bands.map((b) => ({ ...b, svg: band(r, W, H, b.y, amp, b.color) }));
}

// Draws bands above `buryY`, then the motif, then the bands below it,
// so the lower ground covers the motif and it reads as buried.
function buried(bands, buryY, motif) {
  const above = bands.filter((b) => b.y < buryY).map((b) => b.svg);
  const below = bands.filter((b) => b.y >= buryY).map((b) => b.svg);
  return [...above, motif, ...below].join("\n");
}

const motifs = {
  river(r, pal, W, H) {
    const bands = strata(r, pal, W, H, { top: H * 0.22, count: 12, amp: 18 });
    let d = `M${f(W * 0.2)} 0`;
    let x = W * 0.2;
    for (let y = 0; y <= H; y += H / 10) {
      x = W * 0.25 + Math.sin(y / 140 + r()) * W * 0.22;
      d += ` S${f(x + 60)} ${f(y - 40)} ${f(x)} ${f(y)}`;
    }
    const river = `<path d="${d}" fill="none" stroke="${pal[0]}" stroke-width="34" stroke-linecap="round" opacity="0.85"/>
<path d="${d}" fill="none" stroke="${pal[7]}" stroke-width="2" opacity="0.5"/>`;
    return bands.map((b) => b.svg).join("\n") + "\n" + river +
      `\n<circle cx="${f(W * 0.62)}" cy="${f(H * 0.58)}" r="${f(W * 0.3)}" fill="url(#glow)"/>`;
  },
  ledger(r, pal, W, H) {
    const bands = strata(r, pal, W, H, { top: H * 0.12, count: 40, amp: 6, thin: true });
    return bands.map((b) => b.svg).join("\n") +
      `\n<circle cx="${f(W * 0.5)}" cy="${f(H * 0.5)}" r="${f(W * 0.35)}" fill="url(#glow)" opacity="0.6"/>`;
  },
  vessel(r, pal, W, H) {
    const cx = W * 0.5, cy = H * 0.6, w = W * 0.2, h = H * 0.22;
    const bands = strata(r, pal, W, H, { top: H * 0.2, count: 11, amp: 14 });
    const body = `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(w * 2.2)}" fill="url(#glow)"/>
<path d="M${f(cx - w * 0.45)} ${f(cy - h)} Q${f(cx - w * 0.5)} ${f(cy - h * 0.6)} ${f(cx - w * 1.1)} ${f(cy - h * 0.1)} Q${f(cx - w * 1.2)} ${f(cy + h * 0.6)} ${f(cx)} ${f(cy + h * 0.75)} Q${f(cx + w * 1.2)} ${f(cy + h * 0.6)} ${f(cx + w * 1.1)} ${f(cy - h * 0.1)} Q${f(cx + w * 0.5)} ${f(cy - h * 0.6)} ${f(cx + w * 0.45)} ${f(cy - h)} Z" fill="${pal[1]}"/>
<ellipse cx="${f(cx)}" cy="${f(cy - h)}" rx="${f(w * 0.45)}" ry="${f(h * 0.06)}" fill="none" stroke="${pal[7]}" stroke-width="3"/>`;
    return buried(bands, cy + h * 0.25, body);
  },
  stool(r, pal, W, H) {
    const cx = W * 0.5, cy = H * 0.56, w = W * 0.26;
    const bands = strata(r, pal, W, H, { top: H * 0.24, count: 10, amp: 12 });
    const stool = `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(w * 1.6)}" fill="url(#glow)" opacity="0.7"/>
<g fill="${pal[1]}">
<path d="M${f(cx - w)} ${f(cy - 70)} Q${f(cx)} ${f(cy - 20)} ${f(cx + w)} ${f(cy - 70)} L${f(cx + w)} ${f(cy - 52)} Q${f(cx)} ${f(cy - 2)} ${f(cx - w)} ${f(cy - 52)} Z"/>
<rect x="${f(cx - w * 0.28)}" y="${f(cy - 30)}" width="${f(w * 0.56)}" height="90" rx="10"/>
<rect x="${f(cx - w * 0.8)}" y="${f(cy + 58)}" width="${f(w * 1.6)}" height="20" rx="4"/>
</g>
<path d="M${f(cx - w)} ${f(cy - 70)} Q${f(cx)} ${f(cy - 20)} ${f(cx + w)} ${f(cy - 70)}" fill="none" stroke="${pal[7]}" stroke-width="2" opacity="0.7"/>`;
    return buried(bands, cy + 40, stool);
  },
  beads(r, pal, W, H) {
    const cx = W * 0.5, cy = H * 0.55;
    const bands = strata(r, pal, W, H, { top: H * 0.16, count: 12, amp: 10 });
    let dots = `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(W * 0.42)}" fill="url(#glow)" opacity="0.8"/>`;
    for (let ring = 1; ring < 15; ring++) {
      const rad = ring * 20;
      const n = Math.floor((2 * Math.PI * rad) / 13);
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + ring * 0.3;
        const gold = r() < 0.025;
        dots += `<circle cx="${f(cx + Math.cos(a) * rad)}" cy="${f(cy + Math.sin(a) * rad)}" r="${gold ? 4.2 : 3.4}" fill="${gold ? pal[6] : pal[4 + Math.floor(r() * 2)]}" opacity="${gold ? 1 : 0.8}"/>`;
      }
    }
    return buried(bands, cy + 150, dots);
  },
  letters(r, pal, W, H) {
    const cx = W * 0.5, cy = H * 0.5, pw = W * 0.5, ph = H * 0.42;
    const bands = strata(r, pal, W, H, { top: H * 0.3, count: 11, amp: 16 });
    let lines = "";
    for (let y = 40; y < ph - 30; y += 22) {
      let d = `M40 ${y}`;
      for (let x = 40; x < pw - 40; x += 14) d += ` L${x} ${f(y + (r() - 0.5) * 5)}`;
      lines += `<path d="${d}" fill="none" stroke="${pal[3]}" stroke-width="1.4" opacity="${f(0.35 + r() * 0.4)}"/>`;
    }
    const page = `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(W * 0.4)}" fill="url(#glow)" opacity="0.5"/>
<g transform="translate(${f(cx - pw / 2)} ${f(cy - ph / 2)}) rotate(-4 ${f(pw / 2)} ${f(ph / 2)})">
<rect width="${f(pw)}" height="${f(ph)}" fill="${pal[7]}" opacity="0.88"/>${lines}
</g>`;
    return buried(bands, cy + ph * 0.1, page);
  },
};

function artwork({ slug, palette, motif }) {
  const W = 800, H = 1000;
  const pal = palettes[palette];
  const r = rng(hash(slug));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
${defs(pal, W, H)}
${motifs[motif](r, pal, W, H)}
${finish(W, H)}
</svg>
`;
}

function portrait({ slug, palette }) {
  const W = 900, H = 900;
  const pal = palettes[palette];
  const r = rng(hash(slug));
  const cx = W * (0.42 + r() * 0.16), cy = H * (0.42 + r() * 0.16);
  const p1 = r() * 6, p2 = r() * 6;
  const accentRing = 8 + Math.floor(r() * 10);
  let rings = `<circle cx="${f(cx)}" cy="${f(cy)}" r="${W * 0.35}" fill="url(#glow)" opacity="0.5"/>`;
  for (let i = 1; i < 30; i++) {
    const rad = i * 15;
    let d = "";
    for (let k = 0; k <= 96; k++) {
      const a = (k / 96) * Math.PI * 2;
      const wob = 1 + 0.06 * Math.sin(a * 3 + p1 + i * 0.12) + 0.03 * Math.sin(a * 7 + p2);
      d += `${k ? "L" : "M"}${f(cx + Math.cos(a) * rad * wob)} ${f(cy + Math.sin(a) * rad * wob)}`;
    }
    const accent = i === accentRing;
    rings += `<path d="${d}Z" fill="none" stroke="${accent ? pal[6] : pal[4 + (i % 2)]}" stroke-width="${accent ? 5 : 3.5}" opacity="${accent ? 1 : f(0.45 + (1 - i / 30) * 0.5)}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
${defs(pal, W, H)}
${rings}
${finish(W, H)}
</svg>
`;
}

function hero() {
  const W = 1600, H = 1000;
  const pal = palettes.laterite;
  const r = rng(hash("hero"));
  const bands = strata(r, pal, W, H, { top: H * 0.38, count: 14, amp: 22 });
  const cx = W * 0.68, cy = H * 0.74;
  const orb = `<circle cx="${cx}" cy="${cy}" r="360" fill="url(#glow)"/>
<circle cx="${cx}" cy="${cy}" r="70" fill="${pal[1]}"/>
<circle cx="${cx}" cy="${cy}" r="70" fill="none" stroke="${pal[7]}" stroke-width="2" opacity="0.8"/>
<circle cx="${cx}" cy="${cy}" r="110" fill="none" stroke="${pal[6]}" stroke-width="1" opacity="0.35"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice">
${defs(pal, W, H)}
${buried(bands, cy + 20, orb)}
${finish(W, H)}
</svg>
`;
}

// Refuge in Community: many small forms gathered under one arc of shelter.
function refuge() {
  const W = 1600, H = 1000;
  const pal = palettes.ochre;
  const r = rng(hash("refuge-in-community"));
  const bands = strata(r, pal, W, H, { top: H * 0.3, count: 13, amp: 18 });
  const cx = W * 0.64, base = H * 0.72, span = 330;
  let crowd = `<circle cx="${cx}" cy="${base - 80}" r="420" fill="url(#glow)"/>
<path d="M${cx - span} ${base} A${span} ${span * 0.8} 0 0 1 ${cx + span} ${base}" fill="none" stroke="${pal[7]}" stroke-width="3" opacity="0.9"/>
<path d="M${cx - span - 22} ${base} A${span + 22} ${(span + 22) * 0.8} 0 0 1 ${cx + span + 22} ${base}" fill="none" stroke="${pal[6]}" stroke-width="1" opacity="0.45"/>`;
  for (let i = 0; i < 150; i++) {
    // Denser toward the centre, all inside the arc.
    const t = (r() + r() + r()) / 3 - 0.5;
    const x = cx + t * span * 1.8;
    const room = Math.sqrt(Math.max(0, 1 - ((x - cx) / span) ** 2)) * span * 0.8;
    const y = base - 8 - r() * Math.max(0, room - 30);
    const size = 4 + r() * 9;
    const lit = r() < 0.08;
    crowd += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(size)}" fill="${lit ? pal[7] : pal[1 + Math.floor(r() * 3)]}" opacity="${lit ? 0.95 : 0.9}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice">
${defs(pal, W, H)}
${buried(bands, base - 10, crowd)}
${finish(W, H)}
</svg>
`;
}

mkdirSync(new URL("curatorial/", root), { recursive: true });
writeFileSync(new URL("curatorial/refuge-in-community.svg", root), refuge());
mkdirSync(new URL("works/", root), { recursive: true });
mkdirSync(new URL("artists/", root), { recursive: true });
for (const w of works) writeFileSync(new URL(`works/${w.slug}.svg`, root), artwork(w));
for (const a of artists) writeFileSync(new URL(`artists/${a.slug}.svg`, root), portrait(a));
writeFileSync(new URL("hero.svg", root), hero());
console.log(`Wrote ${works.length} works, ${artists.length} portraits, hero and curatorial art to public/images`);
