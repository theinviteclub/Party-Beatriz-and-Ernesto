/** Arte do cartão final: céu azul-noite com estrelas douradas, sol de linhas e nuvens, em moldura de carta. */
const GOLD = "#d9a441";
const CREAM = "#f0d9a0";

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function Asterisk({ x, y, r, o }: { x: number; y: number; r: number; o: number }) {
  const d = r * 0.7;
  return (
    <g stroke={GOLD} strokeWidth={r > 9 ? 1.4 : 1} strokeLinecap="round" opacity={o} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
      <path d={`M0 ${-r} V${r} M${-r} 0 H${r}`} />
      <path d={`M${-d} ${-d} L${d} ${d} M${d} ${-d} L${-d} ${d}`} opacity=".7" />
    </g>
  );
}

function Spark({ x, y, r, o }: { x: number; y: number; r: number; o: number }) {
  return <polygon transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`} opacity={o} fill={GOLD} points={`0,${-r} ${r * 0.22},${-r * 0.22} ${r},0 ${r * 0.22},${r * 0.22} 0,${r} ${-r * 0.22},${r * 0.22} ${-r},0 ${-r * 0.22},${-r * 0.22}`} />;
}

function Cloud({ x, y, s, flip = false }: { x: number; y: number; s: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d="M-70 40 a24 24 0 0 1 6 -46 a30 30 0 0 1 56 -14 a26 26 0 0 1 48 12 a22 22 0 0 1 10 48Z" fill="#33505f" stroke={CREAM} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M-52 14 q10 -14 26 -8 M-10 -2 q14 -16 32 -4 M26 18 q10 -10 22 -4" fill="none" stroke={CREAM} strokeWidth="1.1" strokeLinecap="round" opacity=".85" />
      <path d="M-60 30 q20 -6 34 0 M0 24 q18 -8 36 0" fill="none" stroke="#7fa0ad" strokeWidth="1" opacity=".7" />
    </g>
  );
}

export default function SkyCard() {
  const r = rng(20261017);
  const items = Array.from({ length: 74 }, (_, i) => {
    const x = 18 + r() * 364;
    const y = 18 + r() * 664;
    const inCenter = ((x - 200) / 150) ** 2 + ((y - 350) / 190) ** 2 < 1;
    const kind = i % 5 === 0 ? "a" : i % 3 === 0 ? "s" : "d";
    const size = 4 + r() * 9;
    return { x, y, inCenter, kind, size, key: i };
  });
  return (
    <svg className="skycard-art" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="scSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a1030" /><stop offset=".6" stopColor="#101b4a" /><stop offset="1" stopColor="#1b2f5e" />
        </linearGradient>
        <radialGradient id="scSun"><stop offset="0" stopColor="#ffe9a8" stopOpacity=".55" /><stop offset="1" stopColor="#ffe9a8" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="400" height="700" fill="url(#scSky)" />
      <circle cx="200" cy="108" r="120" fill="url(#scSun)" />

      {items.map((it) =>
        it.kind === "a" ? <Asterisk key={it.key} x={it.x} y={it.y} r={it.size} o={it.inCenter ? 0.28 : 0.9} />
        : it.kind === "s" ? <Spark key={it.key} x={it.x} y={it.y} r={it.size * 0.9} o={it.inCenter ? 0.3 : 0.95} />
        : <circle key={it.key} cx={it.x} cy={it.y} r={1.2 + it.size * 0.1} fill={GOLD} opacity={it.inCenter ? 0.35 : 0.8} />,
      )}

      <g className="sc-sun" stroke={GOLD} strokeLinecap="round">
        {Array.from({ length: 48 }, (_, i) => {
          const a = (i * 7.5 * Math.PI) / 180;
          const r1 = 30, r2 = i % 2 ? 54 : 78;
          return <line key={i} x1={200 + r1 * Math.cos(a)} y1={108 + r1 * Math.sin(a)} x2={200 + r2 * Math.cos(a)} y2={108 + r2 * Math.sin(a)} strokeWidth={i % 2 ? 1 : 1.5} />;
        })}
      </g>
      <circle cx="200" cy="108" r="24" fill={GOLD} stroke="#8a5f14" strokeWidth="1.5" />
      <circle cx="200" cy="108" r="17" fill="none" stroke="#fff3c9" strokeWidth="1" opacity=".7" />

      <Cloud x={70} y={640} s={1.25} />
      <Cloud x={330} y={650} s={1.35} flip />
      <Cloud x={200} y={690} s={1.5} />
      <Cloud x={30} y={140} s={0.7} flip />
      <Cloud x={380} y={190} s={0.6} />

      <rect x="12" y="12" width="376" height="676" rx="10" fill="none" stroke={GOLD} strokeWidth="1.2" />
      {[[12, 12], [388, 12], [12, 688], [388, 688]].map(([x, y], i) => <Spark key={i} x={x} y={y} r={9} o={1} />)}
    </svg>
  );
}
