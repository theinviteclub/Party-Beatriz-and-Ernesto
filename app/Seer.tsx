import type { CSSProperties } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Vidente com cartas de tarot que viram sozinhas, bola de cristal e mãos que se movem. */
const CARDS = [
  { x: 52, label: "XVIII", delay: 0 },
  { x: 165, label: "XVII", delay: 1.4 },
  { x: 278, label: "XIX", delay: 2.8 },
];

function Face({ kind }: { kind: number }) {
  if (kind === 0) {
    return <image href={`${BASE_PATH}/arte/lua.png`} x="-22" y="-28" width="44" height="55" />;
  }
  if (kind === 1) {
    return <image href={`${BASE_PATH}/arte/estrela.png`} x="-26" y="-30" width="52" height="60" />;
  }
  // O Sol
  return (
    <g>
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x="-2" y="-34" width="4" height="14" fill="#d9a441" transform={`rotate(${i * 30})`} />
      ))}
      <circle r="17" fill="url(#sGold)" />
      <circle cx="-5" cy="-3" r="1.6" fill="#5a3a0c" /><circle cx="5" cy="-3" r="1.6" fill="#5a3a0c" />
      <path d="M-5 5 q5 4 10 0" fill="none" stroke="#5a3a0c" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

export default function Seer({ className }: { className?: string }) {
  return (
    <svg className={`seer ${className ?? ""}`} viewBox="0 0 400 560" role="img" aria-label="Vidente revelando cartas de tarot">
      <defs>
        <linearGradient id="sGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6dc94" /><stop offset=".5" stopColor="#c8962f" /><stop offset="1" stopColor="#8a5f14" />
        </linearGradient>
        <radialGradient id="sBall" cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" /><stop offset=".35" stopColor="#b9a6ff" stopOpacity=".8" /><stop offset="1" stopColor="#3a1b7a" stopOpacity=".95" />
        </radialGradient>
        <radialGradient id="sGlow"><stop offset="0" stopColor="#d9a441" stopOpacity=".55" /><stop offset="1" stopColor="#d9a441" stopOpacity="0" /></radialGradient>
      </defs>

      {/* cartas */}
      {CARDS.map((c, i) => (
        <g key={c.label} transform={`translate(${c.x} 6)`}>
          <g className="seer-card" style={{ animationDelay: `${-c.delay}s` } as CSSProperties}>
            <g className="seer-back" style={{ animationDelay: `${c.delay}s` } as CSSProperties}>
              <rect width="70" height="112" rx="7" fill="#6b1a2b" stroke="url(#sGold)" strokeWidth="3" />
              <rect x="7" y="7" width="56" height="98" rx="4" fill="none" stroke="#d9a441" strokeWidth="1" />
              <g transform="translate(35 56) scale(.5)">
                <Face kind={1} />
              </g>
            </g>
            <g className="seer-front" style={{ animationDelay: `${c.delay}s` } as CSSProperties}>
              <rect width="70" height="112" rx="7" fill="#f4e8c6" stroke="url(#sGold)" strokeWidth="3" />
              <rect x="7" y="7" width="56" height="98" rx="4" fill="none" stroke="#9a6a1a" strokeWidth="1" />
              <g transform="translate(35 52) scale(.85)"><Face kind={i} /></g>
              <text x="35" y="100" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="9" fill="#6b1a2b" letterSpacing="2">{c.label}</text>
            </g>
          </g>
        </g>
      ))}

      {/* brilho */}
      <ellipse cx="200" cy="330" rx="170" ry="150" fill="url(#sGlow)" className="seer-aura" />

      {/* vidente */}
      <g className="seer-body">
        <path d="M96 470 C96 350 140 290 200 290 C260 290 304 350 304 470Z" fill="#3a1450" stroke="url(#sGold)" strokeWidth="2.5" />
        <path d="M200 290 V470" stroke="#d9a441" strokeWidth="1.5" opacity=".7" />
        <path d="M150 300 C170 330 230 330 250 300" fill="none" stroke="#d9a441" strokeWidth="2" />
        <path d="M200 168 C146 168 128 220 128 262 C128 292 160 304 200 304 C240 304 272 292 272 262 C272 220 254 168 200 168Z" fill="#2a0f3d" stroke="url(#sGold)" strokeWidth="2.5" />
        <ellipse cx="200" cy="244" rx="38" ry="46" fill="#120a22" />
        <g className="seer-eyes">
          <ellipse cx="185" cy="240" rx="5" ry="3.4" fill="#f0cf86" /><ellipse cx="215" cy="240" rx="5" ry="3.4" fill="#f0cf86" />
        </g>
        <path d="M192 262 q8 5 16 0" fill="none" stroke="#a8803a" strokeWidth="2" strokeLinecap="round" />
        <polygon points="200,176 204,186 214,188 206,194 208,204 200,198 192,204 194,194 186,188 196,186" fill="url(#sGold)" />
      </g>

      {/* mesa e bola de cristal */}
      <path d="M40 470 H360 L376 548 H24Z" fill="#7a1a2e" stroke="url(#sGold)" strokeWidth="2.5" />
      <path d="M40 470 H360" stroke="#d9a441" strokeWidth="3" />
      {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${34 + i * 24} 548 v10`} stroke="#d9a441" strokeWidth="2" />)}
      <g className="seer-ball">
        <ellipse cx="200" cy="470" rx="42" ry="8" fill="#000" opacity=".35" />
        <path d="M168 468 H232 L224 454 H176Z" fill="url(#sGold)" />
        <circle cx="200" cy="420" r="38" fill="url(#sBall)" stroke="#d9a441" strokeWidth="1.5" />
        <path d="M182 404 q8 -10 20 -8" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".8" />
        <circle className="seer-spark" cx="210" cy="428" r="2.6" fill="#fff" />
        <circle className="seer-spark s2" cx="192" cy="434" r="1.8" fill="#fff" />
      </g>

      {/* mãos */}
      <g className="seer-hand hl"><ellipse cx="128" cy="400" rx="17" ry="12" fill="#e0b48a" stroke="#6b4a10" strokeWidth="1.5" /><path d="M116 392 l-3 -9 M124 389 l-1 -10 M133 389 l1 -10 M141 392 l4 -8" stroke="#e0b48a" strokeWidth="5" strokeLinecap="round" /></g>
      <g className="seer-hand hr"><ellipse cx="272" cy="400" rx="17" ry="12" fill="#e0b48a" stroke="#6b4a10" strokeWidth="1.5" /><path d="M284 392 l3 -9 M276 389 l1 -10 M267 389 l-1 -10 M259 392 l-4 -8" stroke="#e0b48a" strokeWidth="5" strokeLinecap="round" /></g>
    </svg>
  );
}
