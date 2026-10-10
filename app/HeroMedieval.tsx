export type MedievalVariant = "e" | "f" | "g" | "h";

export const MEDIEVAL_NAMES: Record<MedievalVariant, string> = {
  e: "Pergaminho",
  f: "Tapeçaria",
  g: "Manuscrito",
  h: "Brasão",
};

const Flourish = () => <div className="m-flourish" aria-hidden="true">❦ ✦ ❦</div>;
const ArtSlot = ({ label, className = "" }: { label: string; className?: string }) => (
  <div className={`m-art ${className}`} data-slot={label}>pintura de IA · {label}</div>
);

export default function HeroMedieval({ variant = "e", dateLabel, time }: { variant?: MedievalVariant; dateLabel: string; time: string }) {
  return (
    <section className="hero-stage" id="inicio">
      <div className={`m-portrait m-${variant}`}>
        <span className="m-corner tl" aria-hidden="true">❦</span>
        <span className="m-corner tr" aria-hidden="true">❦</span>
        <span className="m-corner bl" aria-hidden="true">❦</span>
        <span className="m-corner br" aria-hidden="true">❦</span>

        {variant === "e" && <ArtSlot label="moldura / bichos pintados" className="m-art-top" />}
        {variant === "f" && <><ArtSlot label="cortina esquerda" className="m-art-left" /><ArtSlot label="cortina direita" className="m-art-right" /></>}
        {variant === "g" && <ArtSlot label="letra capitular ilustrada" className="m-art-initial" />}
        {variant === "h" && <ArtSlot label="brasão pintado" className="m-art-crest" />}

        <div className="m-copy">
          <p className="m-eyebrow">Por decreto do reino</p>
          <h1><span>Beatriz</span><em>&</em><span>Ernesto</span></h1>
          <Flourish />
          <p className="m-decree">convidam vossa senhoria para uma noite medieval de banquete, lua e boas histórias.</p>
          <div className="m-date"><span>{dateLabel}</span><strong>{time}</strong></div>
          <p className="m-note">Não precisa usar fantasia. A ideia é apenas entrar no clima da noite do jeito que você se sentir confortável.</p>
        </div>
        <a className="m-scroll" href="#tema">Vós vindes ao banquete? ↓</a>
      </div>
    </section>
  );
}
