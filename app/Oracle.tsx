const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const art = (name: string) => `${BASE_PATH}/arte/${name}.webp`;

const CARDS = [
  { front: "carta-lua", alt: "Carta A Lua", delay: 0, tilt: -7 },
  { front: "carta-estrela", alt: "Carta A Estrela", delay: 2.2, tilt: 0 },
  { front: "carta-sol", alt: "Carta O Sol", delay: 4.4, tilt: 7 },
];

/** Bola de cristal com luz e brilho e três cartas que viram sozinhas. */
export default function Oracle({ className = "" }: { className?: string }) {
  return (
    <div className={`oracle ${className}`} role="img" aria-label="Bola de cristal e cartas de tarot que viram">
      <div className="oracle-cards" aria-hidden="true">
        {CARDS.map((c) => (
          <div className="oc" key={c.front} style={{ ["--tilt" as string]: `${c.tilt}deg`, ["--d" as string]: `${c.delay}s` }}>
            <div className="oc-float">
              <div className="oc-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="oc-face oc-back" src={art("carta-verso")} alt="" width={526} height={900} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="oc-face oc-front" src={art(c.front)} alt="" width={526} height={900} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="ball" aria-hidden="true">
        <div className="ball-halo" />
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
