import type { CSSProperties } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const img = (name: string) => `${BASE_PATH}/${name}`;

export type HeroVariant = "a" | "b" | "c" | "d";

type Piece = { src: string; className: string; style?: CSSProperties };

const CLOUD = img("nuvem.png");
const S1 = img("estrela1.png");
const S2 = img("estrela2.png");
const S3 = img("estrela3.png");
const S4 = img("estrela4.png");

// Cada variante é só uma lista de peças posicionadas sobre o fundo roxo.
const PIECES: Record<HeroVariant, Piece[]> = {
  // A · moldura de nuvens nos quatro cantos (como a referência)
  a: [
    { src: CLOUD, className: "p cloud", style: { top: "-6%", left: "-8%", width: "62%", transform: "rotate(180deg)" } },
    { src: CLOUD, className: "p cloud", style: { top: "-4%", right: "-14%", width: "52%", transform: "scaleY(-1)" } },
    { src: CLOUD, className: "p cloud", style: { bottom: "-5%", left: "-14%", width: "60%", transform: "scaleX(-1)" } },
    { src: CLOUD, className: "p cloud", style: { bottom: "-6%", right: "-8%", width: "58%" } },
    { src: S1, className: "p", style: { top: "2%", left: "4%", width: "12%" } },
    { src: S1, className: "p", style: { top: "12%", right: "3%", width: "14%", transform: "rotate(8deg)" } },
    { src: S2, className: "p", style: { top: "17%", left: "62%", width: "9%" } },
    { src: S4, className: "p", style: { top: "44%", left: "3%", width: "8%" } },
    { src: S3, className: "p", style: { top: "49%", right: "3%", width: "8%" } },
    { src: S2, className: "p", style: { bottom: "11%", left: "9%", width: "13%" } },
    { src: S4, className: "p", style: { bottom: "9%", left: "50%", width: "7%" } },
    { src: S1, className: "p", style: { bottom: "4%", right: "2%", width: "13%", transform: "rotate(-6deg)" } },
  ],
  // B · nuvens subindo de baixo, estrela grande no centro
  b: [
    { src: CLOUD, className: "p cloud", style: { bottom: "-8%", left: "-30%", width: "82%", transform: "scaleX(-1)" } },
    { src: CLOUD, className: "p cloud", style: { bottom: "-10%", right: "-24%", width: "90%" } },
    { src: S2, className: "p", style: { top: "8%", left: "50%", width: "26%", transform: "translateX(-50%)" } },
    { src: S4, className: "p", style: { top: "6%", left: "8%", width: "9%" } },
    { src: S4, className: "p", style: { top: "20%", right: "8%", width: "11%" } },
    { src: S3, className: "p", style: { top: "40%", left: "6%", width: "8%" } },
    { src: S4, className: "p", style: { top: "56%", right: "6%", width: "7%" } },
  ],
  // C · carta de tarot: moldura dourada, numeral romano, nuvens topo e base
  c: [
    { src: CLOUD, className: "p cloud", style: { top: "-4%", left: "-12%", width: "80%", transform: "rotate(180deg)" } },
    { src: CLOUD, className: "p cloud", style: { bottom: "-4%", right: "-12%", width: "80%" } },
    { src: S4, className: "p", style: { top: "9%", right: "12%", width: "11%" } },
    { src: S4, className: "p", style: { top: "14%", right: "26%", width: "6%" } },
    { src: S3, className: "p", style: { bottom: "18%", left: "12%", width: "9%" } },
    { src: S4, className: "p", style: { bottom: "24%", left: "24%", width: "5%" } },
  ],
  // D · diagonal: nuvem no canto superior esquerdo e inferior direito, estrelas altas
  d: [
    { src: CLOUD, className: "p cloud", style: { top: "-8%", left: "-22%", width: "88%", transform: "rotate(180deg)" } },
    { src: CLOUD, className: "p cloud", style: { bottom: "-8%", right: "-22%", width: "88%" } },
    { src: S1, className: "p", style: { top: "6%", right: "8%", width: "20%" } },
    { src: S1, className: "p", style: { bottom: "8%", left: "6%", width: "14%", transform: "rotate(-10deg)" } },
    { src: S4, className: "p", style: { top: "46%", left: "4%", width: "9%" } },
    { src: S4, className: "p", style: { top: "38%", right: "6%", width: "7%" } },
    { src: S2, className: "p", style: { top: "30%", left: "10%", width: "8%" } },
  ],
};

export const HERO_NAMES: Record<HeroVariant, string> = {
  a: "Moldura de nuvens",
  b: "Nuvens subindo",
  c: "Carta de tarot",
  d: "Diagonal",
};

export default function Hero({ variant = "a", dateLabel, time }: { variant?: HeroVariant; dateLabel: string; time: string }) {
  return (
    <section className="hero-stage" id="inicio">
      <div className={`portrait portrait-${variant}`}>
        {variant === "c" && <div className="tarot-frame" aria-hidden="true" />}
        {PIECES[variant].map((piece, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={index} src={piece.src} alt="" aria-hidden="true" className={piece.className} style={piece.style} />
        ))}
        <div className="portrait-copy">
          {variant === "c" && <span className="tarot-numeral">XVII</span>}
          <p className="eyebrow">Uma noite de lua, tarot e estrelas</p>
          <h1><span>Beatriz</span><em>&</em><span>Ernesto</span></h1>
          <p className="party-name">Save the date</p>
          <div className="date-lockup"><span>{dateLabel}</span><strong>{time}</strong></div>
          <p className="hero-note">Separe a data e escolha sua carta favorita.</p>
        </div>
        <a className="scroll" href="#tema">deslize ↓</a>
      </div>
    </section>
  );
}
