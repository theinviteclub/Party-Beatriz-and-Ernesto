import { HERO_NAMES, type HeroVariant } from "../Hero";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Options() {
  return (
    <main className="options">
      <h1>Opções de capa</h1>
      {(Object.keys(HERO_NAMES) as HeroVariant[]).map((v) => (
        <a key={v} href={`${BASE_PATH}/opcoes/${v}`}>{v.toUpperCase()} · {HERO_NAMES[v]}</a>
      ))}
    </main>
  );
}
