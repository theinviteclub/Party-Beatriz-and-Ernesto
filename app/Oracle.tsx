const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const art = (name: string) => `${BASE_PATH}/arte/${name}.webp`;

const GOLD = "#b8862b";
const INK = "#2a1a10";

function Spark({ x, y, s = 6, c = "#e8c46a" }: { x: number; y: number; s?: number; c?: string }) {
  return <polygon transform={`translate(${x} ${y})`} points={`0,${-s} ${s * 0.25},${-s * 0.25} ${s},0 ${s * 0.25},${s * 0.25} 0,${s} ${-s * 0.25},${s * 0.25} ${-s},0 ${-s * 0.25},${-s * 0.25}`} fill={c} />;
}

function Star8({ x, y, r, fill = "#e8c46a" }: { x: number; y: number; r: number; fill?: string }) {
  const pts = Array.from({ length: 16 }, (_, i) => {
    const a = (Math.PI / 8) * i - Math.PI / 2;
    const rr = i % 2 === 0 ? (i % 4 === 0 ? r : r * 0.68) : r * 0.2;
    return `${(x + rr * Math.cos(a)).toFixed(1)},${(y + rr * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return <polygon points={pts} fill={fill} stroke="#8a5f14" strokeWidth=".8" strokeLinejoin="round" />;
}

type Kind = "moon" | "star" | "sun";
const META: Record<Kind, { n: string; name: string }> = {
  moon: { n: "XVIII", name: "A LUA" },
  star: { n: "XVII", name: "A ESTRELA" },
  sun: { n: "XIX", name: "O SOL" },
};

function Art({ kind }: { kind: Kind }) {
  if (kind === "moon") {
    return (
      <g>
        <rect x="16" y="42" width="168" height="232" fill="#1d3874" />
        <rect x="16" y="42" width="168" height="232" fill="url(#moonSky)" />
        {[[34, 62], [160, 70], [46, 150], [158, 140], [100, 56], [30, 110], [172, 104]].map(([x, y], i) => <Spark key={i} x={x} y={y} s={4} />)}
        {Array.from({ length: 16 }, (_, i) => (
          <line key={i} x1="100" y1="116" x2="100" y2="58" stroke="#e8c46a" strokeWidth="2" strokeLinecap="round" transform={`rotate(${i * 22.5} 100 116)`} opacity=".7" />
        ))}
        <circle cx="100" cy="116" r="44" fill="#ded3b0" stroke="#6b5a30" strokeWidth="2" />
        <circle cx="116" cy="108" r="38" fill="#24448a" />
        <path d="M72 100 q-6 10 2 17 q-6 4 -2 11 q4 6 12 4" fill="none" stroke="#6b5a30" strokeWidth="2" strokeLinecap="round" />
        <path d="M78 106 q5 -3 9 0" fill="none" stroke="#6b5a30" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="26" y="190" width="30" height="58" fill="#3a3d58" /><rect x="144" y="190" width="30" height="58" fill="#3a3d58" />
        {[26, 36, 46].map((x) => <rect key={x} x={x} y="184" width="9" height="8" fill="#3a3d58" />)}
        {[144, 154, 164].map((x) => <rect key={x} x={x} y="184" width="9" height="8" fill="#3a3d58" />)}
        <rect x="16" y="244" width="168" height="30" fill="#5a6a3c" />
        <path d="M84 274 Q92 258 100 250 Q112 240 108 226 Q104 214 100 206 L112 206 Q120 220 122 232 Q124 246 114 258 Q108 268 116 274Z" fill="#6ec1e6" opacity=".9" />
        {[[66, 236], [134, 236]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${i ? -1 : 1} 1)`}>
            <ellipse cx="0" cy="6" rx="9" ry="12" fill="#d18a3c" /><circle cx="2" cy="-8" r="6.5" fill="#d18a3c" />
            <polygon points="-1,-14 2,-22 5,-14" fill="#d18a3c" /><polygon points="4,-14 8,-21 9,-12" fill="#d18a3c" />
          </g>
        ))}
      </g>
    );
  }
  if (kind === "sun") {
    return (
      <g>
        <rect x="16" y="42" width="168" height="232" fill="#8aa0b4" />
        {Array.from({ length: 24 }, (_, i) => (
          <polygon key={i} points="100,116 94,30 106,30" fill={i % 2 ? "#e8c46a" : "#6f8aa6"} transform={`rotate(${i * 15} 100 116)`} />
        ))}
        <rect x="16" y="42" width="168" height="232" fill="none" />
        <circle cx="100" cy="116" r="36" fill="#f0c242" stroke="#b8862b" strokeWidth="2.5" />
        <circle cx="100" cy="116" r="28" fill="none" stroke="#d99a1a" strokeWidth="1.2" strokeDasharray="2 3" />
        <path d="M84 108 q6 -4 10 0 M106 108 q6 -4 10 0" fill="none" stroke="#5a3a0c" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M100 112 v12 q-4 2 -6 0" fill="none" stroke="#5a3a0c" strokeWidth="2" strokeLinecap="round" />
        <path d="M90 134 q10 7 20 0" fill="none" stroke="#5a3a0c" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="16" y="214" width="168" height="60" fill="#d9b25a" />
        <rect x="16" y="214" width="168" height="8" fill="#f3e0a8" />
        <path d="M150 168 q22 10 8 34 q-14 24 6 50 l-18 0 q-18 -26 -2 -52 q12 -20 6 -32Z" fill="#c0392b" />
        {[[40, 246], [76, 252], [124, 250], [160, 244]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <circle r="13" fill="none" stroke="#f0c242" strokeWidth="5" strokeDasharray="3 2.6" />
            <circle r="7" fill="#7a4a1a" />
          </g>
        ))}
        <ellipse cx="100" cy="248" rx="22" ry="12" fill="#f5efe0" stroke="#8a7a5a" strokeWidth="1" />
        <circle cx="84" cy="238" r="8" fill="#f5efe0" stroke="#8a7a5a" strokeWidth="1" />
      </g>
    );
  }
  // estrela
  return (
    <g>
      <rect x="16" y="42" width="168" height="232" fill="#244a8a" />
      <rect x="16" y="42" width="168" height="232" fill="url(#starSky)" />
      <Star8 x={100} y={98} r={44} />
      {[[40, 70], [160, 72], [34, 130], [168, 128], [58, 172], [144, 170], [100, 168]].map(([x, y], i) => <Star8 key={i} x={x} y={y} r={11} />)}
      <rect x="16" y="226" width="168" height="48" fill="#55603a" />
      <ellipse cx="100" cy="252" rx="62" ry="16" fill="#5ab0d8" />
      <ellipse cx="100" cy="252" rx="42" ry="9" fill="none" stroke="#e9f6ff" strokeWidth="1.5" />
      <ellipse cx="100" cy="252" rx="20" ry="4.5" fill="none" stroke="#e9f6ff" strokeWidth="1.5" />
      <path d="M70 208 q12 -14 28 -6 l-6 12 q-10 -4 -16 4Z" fill="#d9a441" stroke="#8a5f14" strokeWidth="1" />
      <path d="M92 210 q6 14 4 30 M98 212 q8 12 8 28" stroke="#9fd8f5" strokeWidth="3" strokeLinecap="round" fill="none" />
    </g>
  );
}

function CardFront({ kind }: { kind: Kind }) {
  const m = META[kind];
  return (
    <svg className="oc-face oc-front" viewBox="0 0 200 330" aria-hidden="true">
      <defs>
        <linearGradient id="moonSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#14275a" /><stop offset="1" stopColor="#2c5aa8" /></linearGradient>
        <linearGradient id="starSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#12285c" /><stop offset="1" stopColor="#3470b8" /></linearGradient>
      </defs>
      <rect x="2" y="2" width="196" height="326" rx="10" fill="#f2e6c6" stroke={GOLD} strokeWidth="4" />
      <rect x="9" y="9" width="182" height="312" rx="6" fill="none" stroke={GOLD} strokeWidth="1.4" />
      <text x="100" y="31" textAnchor="middle" fontFamily="Cinzel, serif" fontWeight="700" fontSize="16" letterSpacing="3" fill={INK}>{m.n}</text>
      <Art kind={kind} />
      <rect x="16" y="42" width="168" height="232" fill="none" stroke={GOLD} strokeWidth="2" />
      <text x="100" y="304" textAnchor="middle" fontFamily="Cinzel, serif" fontWeight="700" fontSize="17" letterSpacing="3" fill={INK}>{m.name}</text>
    </svg>
  );
}

const CARDS: { kind: Kind; delay: number; tilt: number }[] = [
  { kind: "moon", delay: 0, tilt: -6 },
  { kind: "star", delay: 2.2, tilt: 0 },
  { kind: "sun", delay: 4.4, tilt: 6 },
];

/** Cartas de tarot clássicas que viram sozinhas e uma bola de cristal com luz e brilho. */
export default function Oracle({ className = "" }: { className?: string }) {
  return (
    <div className={`oracle ${className}`} role="img" aria-label="Cartas de tarot que viram e uma bola de cristal brilhando">
      <div className="oracle-cards" aria-hidden="true">
        {CARDS.map((c) => (
          <div className="oc" key={c.kind} style={{ ["--tilt" as string]: `${c.tilt}deg`, ["--d" as string]: `${c.delay}s` }}>
            <div className="oc-float">
              <div className="oc-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="oc-face oc-back" src={art("carta-verso")} alt="" width={526} height={900} />
                <CardFront kind={c.kind} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="ball" aria-hidden="true">
        <div className="ball-halo" />
        <div className="orbit orbit-a">
          {Array.from({ length: 7 }, (_, i) => <i key={i} style={{ ["--a" as string]: `${(360 / 7) * i}deg`, animationDelay: `${-i * 0.4}s` }} />)}
        </div>
        <div className="orbit orbit-b">
          {Array.from({ length: 5 }, (_, i) => <i key={i} style={{ ["--a" as string]: `${(360 / 5) * i + 20}deg`, animationDelay: `${-i * 0.6}s` }} />)}
        </div>
        <div className="ball-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ball-img" src={art("bola")} alt="" width={760} height={891} />
          <div className="ball-glass">
            <div className="ball-shine" />
            <div className="ball-glow" />
            {Array.from({ length: 9 }, (_, i) => (
              <i key={i} className="ball-spark" style={{ left: `${18 + ((i * 29) % 64)}%`, top: `${14 + ((i * 41) % 62)}%`, animationDelay: `${-i * 0.55}s` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
