import { Candle } from "./Art";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const art = (name: string) => `${BASE_PATH}/arte/${name}.webp`;

const CARDS = [
  { src: "carta-lua", delay: 0, tilt: -7 },
  { src: "carta-estrela", delay: 0.7, tilt: 1 },
  { src: "carta-sol", delay: 1.4, tilt: 7 },
];

/** Mesa de veludo: as cartas são lançadas, viram, e são recolhidas; a bola brilha com luzes ao redor. */
export default function Oracle({ className = "" }: { className?: string }) {
  return (
    <div className={`oracle ${className}`} role="img" aria-label="Mesa de tarot com bola de cristal e cartas sendo lançadas">
      <div className="o-table" aria-hidden="true" />
      <Candle className="o-candle oc1" />
      <Candle className="o-candle oc2" />

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

      <div className="oracle-cards" aria-hidden="true">
        {CARDS.map((c) => (
          <div className="oc" key={c.src} style={{ ["--tilt" as string]: `${c.tilt}deg`, ["--d" as string]: `${c.delay}s` }}>
            <div className="oc-slide">
              <div className="oc-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="oc-face oc-back" src={art("carta-verso")} alt="" width={600} height={900} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="oc-face oc-front" src={art(c.src)} alt="" width={600} height={900} />
              </div>
            </div>
            <div className="oc-shadow" />
          </div>
        ))}
      </div>
    </div>
  );
}
