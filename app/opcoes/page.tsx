import { HERO_NAMES, type HeroVariant } from "../Hero";
import { MEDIEVAL_NAMES, type MedievalVariant } from "../HeroMedieval";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Options() {
  const a = Object.keys(HERO_NAMES) as HeroVariant[];
  const b = Object.keys(MEDIEVAL_NAMES) as MedievalVariant[];
  return (
    <main className="options">
      <h1>Opções de capa</h1>
      <h2>Medieval</h2>
      {b.map((v) => <a key={v} href={`${BASE_PATH}/opcoes/${v}`}>{v.toUpperCase()} · {MEDIEVAL_NAMES[v]}</a>)}
      <h2>Nuvens e estrelas</h2>
      {a.map((v) => <a key={v} href={`${BASE_PATH}/opcoes/${v}`}>{v.toUpperCase()} · {HERO_NAMES[v]}</a>)}
    </main>
  );
}
