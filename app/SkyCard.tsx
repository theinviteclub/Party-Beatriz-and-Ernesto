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

export default function SkyCard({ w = 400, h = 700, count = 74, className = "" }: { w?: number; h?: number; count?: number; className?: string }) {
  const r = rng(20261017 + w);
  const cx = w / 2;
  const items = Array.from({ length: count }, (_, i) => {
    const x = 18 + r() * (w - 36);
    const y = 18 + r() * (h - 36);
    const inCenter = ((x - cx) / (w * 0.4)) ** 2 + ((y - h / 2) / 190) ** 2 < 1;
    const kind = i % 5 === 0 ? "a" : i % 3 === 0 ? "s" : "d";
    const size = 4 + r() * 9;
    return { x, y, inCenter, kind, size, key: i };
  });
  return (
    <svg className={`skycard-art ${className}`} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`scSky${w}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a1030" /><stop offset=".6" stopColor="#101b4a" /><stop offset="1" stopColor="#16265a" />
        </linearGradient>
        <radialGradient id={`scSun${w}`}><stop offset="0" stopColor="#ffe9a8" stopOpacity=".55" /><stop offset="1" stopColor="#ffe9a8" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#scSky${w})`} />
      <circle cx={cx} cy="108" r="120" fill={`url(#scSun${w})`} />

      {items.map((it) =>
        it.kind === "a" ? <Asterisk key={it.key} x={it.x} y={it.y} r={it.size} o={it.inCenter ? 0.28 : 0.9} />
        : it.kind === "s" ? <Spark key={it.key} x={it.x} y={it.y} r={it.size * 0.9} o={it.inCenter ? 0.3 : 0.95} />
        : <circle key={it.key} cx={it.x} cy={it.y} r={1.2 + it.size * 0.1} fill={GOLD} opacity={it.inCenter ? 0.35 : 0.8} />,
      )}

      <g className="sc-sun" stroke={GOLD} strokeLinecap="round">
        {Array.from({ length: 48 }, (_, i) => {
          const a = (i * 7.5 * Math.PI) / 180;
          const r1 = 30, r2 = i % 2 ? 54 : 78;
          return <line key={i} x1={cx + r1 * Math.cos(a)} y1={108 + r1 * Math.sin(a)} x2={cx + r2 * Math.cos(a)} y2={108 + r2 * Math.sin(a)} strokeWidth={i % 2 ? 1 : 1.5} />;
        })}
      </g>
      <circle cx={cx} cy="108" r="24" fill={GOLD} stroke="#8a5f14" strokeWidth="1.5" />
      <circle cx={cx} cy="108" r="17" fill="none" stroke="#fff3c9" strokeWidth="1" opacity=".7" />

      <rect x="12" y="12" width={w - 24} height={h - 24} rx="10" fill="none" stroke={GOLD} strokeWidth="1.2" />
      {[[12, 12], [w - 12, 12], [12, h - 12], [w - 12, h - 12]].map(([x, y], i) => <Spark key={i} x={x} y={y} r={9} o={1} />)}
    </svg>
  );
}
