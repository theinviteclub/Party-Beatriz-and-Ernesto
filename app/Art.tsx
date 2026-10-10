import type { CSSProperties } from "react";

type P = { className?: string; style?: CSSProperties };

const GOLD = (
  <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stopColor="#f6dc94" /><stop offset=".5" stopColor="#c8962f" /><stop offset="1" stopColor="#8a5f14" />
  </linearGradient>
);

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Lua crescente com rosto (pintura recortada do brasão). */
export function Moon({ className, style }: P) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} style={style} src={`${BASE_PATH}/arte/lua.png`} alt="Lua crescente dourada" width={258} height={323} />;
}

/** Estrela de oito pontas (pintura recortada do brasão). */
export function Star({ className, style }: P) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} style={style} src={`${BASE_PATH}/arte/estrela.png`} alt="" aria-hidden="true" width={178} height={205} />;
}

/** Brasão com monograma. */
export function Crest({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 140 170" role="img" aria-label="Brasão de Beatriz e Ernesto">
      <defs>{GOLD}</defs>
      <path d="M70 6 L22 18 V80 C22 118 54 148 70 160 C86 148 118 118 118 80 V18 Z" fill="#6b1a2b" stroke="url(#gold)" strokeWidth="5" strokeLinejoin="round" />
      <path d="M70 18 L32 27 V80 C32 110 58 134 70 144 C82 134 108 110 108 80 V27 Z" fill="none" stroke="#d9a441" strokeWidth="1.2" />
      <path d="M78 34 A22 22 0 1 0 98 72 A17 17 0 1 1 78 34Z" fill="url(#gold)" />
      <text x="52" y="108" textAnchor="middle" fontFamily="Uncial Antiqua, serif" fontSize="26" fill="#f4e8c6">B</text>
      <text x="70" y="108" textAnchor="middle" fontFamily="Uncial Antiqua, serif" fontSize="16" fill="#d9a441">&amp;</text>
      <text x="88" y="108" textAnchor="middle" fontFamily="Uncial Antiqua, serif" fontSize="26" fill="#f4e8c6">E</text>
      <path d="M44 124 Q70 138 96 124" fill="none" stroke="#d9a441" strokeWidth="1.5" />
    </svg>
  );
}

/** Silhueta de castelo. */
export function Castle({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 600 150" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path
        fill="currentColor"
        d="M0 150 V118 H24 V100 H34 V108 H44 V100 H54 V118 H90 V82 H100 V90 H110 V82 H120 V90 H130 V82 H140 V118 H180 V70 L196 44 L212 70 V118 H250 V96 H262 V104 H274 V96 H286 V104 H298 V96 H310 V118 H340 V60 H350 V68 H360 V60 H370 V68 H380 V60 H390 V118 H420 V76 L438 36 L456 76 V118 H492 V90 H502 V98 H512 V90 H522 V98 H532 V90 H542 V118 H570 V104 H580 V112 H590 V104 H600 V150 Z"
      />
      <rect x="192" y="88" width="8" height="16" rx="4" fill="#0b1030" opacity=".7" />
      <rect x="434" y="86" width="8" height="18" rx="4" fill="#0b1030" opacity=".7" />
      <rect x="360" y="82" width="7" height="14" rx="3.5" fill="#0b1030" opacity=".7" />
    </svg>
  );
}

export function Goblet({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 130" role="img" aria-label="Cálice">
      <defs>{GOLD}</defs>
      <path d="M18 8 H82 C82 52 70 66 56 70 V98 H72 V110 H28 V98 H44 V70 C30 66 18 52 18 8Z" fill="url(#gold)" stroke="#6b4a10" strokeWidth="2" strokeLinejoin="round" />
      <path d="M22 18 H78 C78 34 74 40 70 44 C58 40 42 40 30 44 C26 40 22 34 22 18Z" fill="#6b1a2b" opacity=".85" />
      <circle cx="50" cy="84" r="5" fill="#6b1a2b" stroke="#6b4a10" />
    </svg>
  );
}

export function Candle({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 40 110" aria-hidden="true">
      <path className="flame" d="M20 2 C28 16 30 26 20 34 C10 26 12 16 20 2Z" fill="#ffd46b" />
      <path className="flame" d="M20 14 C24 22 24 27 20 31 C16 27 16 22 20 14Z" fill="#fff4cf" />
      <rect x="17" y="34" width="6" height="6" fill="#3a1420" />
      <path d="M8 42 H32 V100 H8Z" fill="#efe0b4" stroke="#8a6a3a" strokeWidth="1.5" />
      <path d="M8 42 C12 52 14 46 18 52 C22 46 26 56 32 44" fill="#f8f0d4" />
      <rect x="4" y="100" width="32" height="8" rx="2" fill="#8a5f14" />
    </svg>
  );
}

export function Crown({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 70" aria-hidden="true">
      <defs>{GOLD}</defs>
      <path d="M8 58 L14 14 L34 36 L50 6 L66 36 L86 14 L92 58 Z" fill="url(#gold)" stroke="#6b4a10" strokeWidth="2" strokeLinejoin="round" />
      <rect x="8" y="58" width="84" height="8" rx="2" fill="#8a5f14" />
      <circle cx="50" cy="6" r="4" fill="#6b1a2b" /><circle cx="14" cy="14" r="3.5" fill="#6b1a2b" /><circle cx="86" cy="14" r="3.5" fill="#6b1a2b" />
    </svg>
  );
}

export function Ring({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 80 90" aria-hidden="true">
      <defs>{GOLD}</defs>
      <circle cx="40" cy="58" r="24" fill="none" stroke="url(#gold)" strokeWidth="8" />
      <polygon points="40,4 54,18 40,32 26,18" fill="#6b1a2b" stroke="url(#gold)" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

export function Quill({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" aria-hidden="true">
      <path d="M110 6 C70 10 38 40 26 84 C46 76 56 70 66 60 C60 70 50 84 30 92 L14 112 L10 108 L26 90 C20 70 40 20 110 6Z" fill="#f4e8c6" stroke="#6b4a10" strokeWidth="2" strokeLinejoin="round" />
      <path d="M100 14 C70 30 48 52 30 88" fill="none" stroke="#8a6a3a" strokeWidth="1.5" />
    </svg>
  );
}

export function Seal({ className, style, children }: P & { children?: React.ReactNode }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 4 C62 2 70 10 80 12 C90 18 90 30 94 40 C98 52 90 62 88 72 C84 84 72 86 62 92 C52 98 42 94 32 90 C20 86 14 76 10 66 C6 54 8 44 12 34 C16 22 24 14 34 10 C40 7 45 5 50 4Z" fill="#7a1a2e" />
      <path d="M50 12 C60 10 66 18 76 20 C84 24 84 34 88 42 C90 52 84 60 82 68 C78 78 68 80 60 86 C52 90 44 88 36 84 C26 80 20 72 18 64 C14 54 16 46 20 38 C24 28 30 22 38 18 C44 15 47 13 50 12Z" fill="none" stroke="#a8324a" strokeWidth="2" />
      {children}
    </svg>
  );
}

/** Divisor ornamental. */
export function Divider({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 320 24" aria-hidden="true">
      <path d="M0 12 H122 M198 12 H320" stroke="currentColor" strokeWidth="1.2" />
      <path d="M122 12 C132 2 142 2 150 12 C142 22 132 22 122 12Z M198 12 C188 2 178 2 170 12 C178 22 188 22 198 12Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <polygon points="160,2 170,12 160,22 150,12" fill="currentColor" />
    </svg>
  );
}
