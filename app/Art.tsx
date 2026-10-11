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

/** Castelo pintado ao luar (PNG com fundo transparente). */
export function Castle({ className, style }: P) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} style={style} src={`${BASE_PATH}/arte/castelo.webp`} alt="" aria-hidden="true" width={1800} height={600} />;
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

/** Vela pintada com castiçal; a chama é uma imagem separada para poder tremer. */
export function Candle({ className, style }: P) {
  return (
    <span className={`candle-art ${className ?? ""}`} style={style} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="candle-flame" src={`${BASE_PATH}/arte/chama.webp`} alt="" width={300} height={745} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="candle-body" src={`${BASE_PATH}/arte/vela.webp`} alt="" width={283} height={900} />
    </span>
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
