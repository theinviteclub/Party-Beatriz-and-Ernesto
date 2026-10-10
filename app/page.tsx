"use client";

import { useEffect, useRef, useState } from "react";
import { Candle, Castle, Divider, Goblet, Moon, Seal, Star } from "./Art";
import Oracle from "./Oracle";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const COUPLE = { first: "Beatriz", second: "Ernesto" };
const TIME = "19h30";
const VENUE = { name: "Velho Monge", address: "R. Feira de Santana, 17 - Parque 10 de Novembro" };
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(`${VENUE.name} ${VENUE.address} Manaus`);
const EVENT_DATE = new Date("2026-10-17T19:30:00-04:00");
// Mesmo Formspree do save the date da Ju: as respostas chegam no e-mail dela. O campo "evento" separa as duas festas.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgqaybl";

function pad(value: number) {
  return String(Math.max(0, value)).padStart(2, "0");
}

/** Revela o conteúdo quando entra na tela. */
function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: { children: React.ReactNode; className?: string; delay?: number; as?: "div" | "section" | "li" | "article" }) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    document.body.classList.add("rv-ready");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // @ts-expect-error ref genérico para tags variáveis
    <Tag ref={ref} className={`rv ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/** Folha de pergaminho com borda rasgada. */
function Parchment({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`sheet ${className}`}>
      <div className="parchment">{children}</div>
    </div>
  );
}

function Sky() {
  return (
    <div className="sky" aria-hidden="true">
      {Array.from({ length: 46 }, (_, i) => (
        <i key={i} style={{ left: `${(i * 37 + 11) % 100}%`, top: `${(i * 53 + 7) % 100}%`, animationDelay: `${-(i % 9) * 0.6}s`, scale: String(0.5 + (i % 5) * 0.3) }} />
      ))}
    </div>
  );
}

function Countdown({ date }: { date: Date }) {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const update = () => {
      const d = Math.max(0, date.getTime() - Date.now());
      setRemaining({ days: Math.floor(d / 86400000), hours: Math.floor((d / 3600000) % 24), minutes: Math.floor((d / 60000) % 60), seconds: Math.floor((d / 1000) % 60) });
    };
    update();
    const t = window.setInterval(update, 1000);
    return () => window.clearInterval(t);
  }, [date]);
  const labels: Record<string, string> = { days: "dias", hours: "horas", minutes: "min", seconds: "seg" };
  return (
    <div className="countdown" aria-label="Contagem regressiva para o banquete">
      {Object.entries(remaining).map(([key, value]) => (
        <div className="countdown-item" key={key}>
          <strong>{key === "days" ? value : pad(value)}</strong>
          <span>{labels[key]}</span>
        </div>
      ))}
    </div>
  );
}

function ics(date: Date) {
  const f = (d: Date) => {
    const p = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}T${p(d.getHours())}${p(d.getMinutes())}00`;
  };
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Beatriz e Ernesto//Save the Date//PT-BR",
    "BEGIN:VEVENT", "UID:beatriz-ernesto-medieval@save-the-date", `DTSTAMP:${f(new Date())}`,
    `DTSTART:${f(date)}`, `DTEND:${f(new Date(date.getTime() + 5 * 3600000))}`,
    "SUMMARY:Banquete de Beatriz e Ernesto",
    `LOCATION:${VENUE.name} - ${VENUE.address}`.replace(/,/g, "\\,"),
    `DESCRIPTION:Por decreto do reino\\, uma noite medieval de banquete\\, lua e boas histórias. Horário: ${TIME}.`,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
}

function saveCalendar() {
  const url = URL.createObjectURL(new Blob([ics(EVENT_DATE)], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "beatriz-e-ernesto.ics";
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

type Guest = { name: string };
type RsvpStatus = "idle" | "sending" | "sent" | "error";

function RsvpForm() {
  const [attending, setAttending] = useState<"yes" | "maybe" | "no" | null>(null);
  const [name, setName] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [status, setStatus] = useState<RsvpStatus>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!attending || !name.trim()) return;
    if (!FORMSPREE_ENDPOINT) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: "Confirmação · Beatriz & Ernesto (17/10)",
          evento: "Beatriz & Ernesto · 17/10/2026",
          nome: name.trim(),
          vai: attending === "yes" ? "Sim" : attending === "maybe" ? "Talvez" : "Não",
          acompanhantes: guests.map((g) => g.name.trim()).filter(Boolean).join(", ") || "Nenhum",
        }),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rsvp-sent">
        <p>✦ Resposta enviada ao reino!</p>
        <h3>{attending === "yes" ? "Vossa presença será celebrada no banquete!" : attending === "maybe" ? "O reino aguardará com esperança!" : "Que pena, fareis falta ao banquete!"}</h3>
      </div>
    );
  }

  return (
    <form className="rsvp-form" onSubmit={handleSubmit}>
      <div className="rsvp-toggle">
        <button type="button" className={attending === "yes" ? "is-active" : ""} onClick={() => setAttending("yes")}>Eu vou ✦</button>
        <button type="button" className={attending === "maybe" ? "is-active" : ""} onClick={() => setAttending("maybe")}>Talvez</button>
        <button type="button" className={attending === "no" ? "is-active" : ""} onClick={() => setAttending("no")}>Não vou poder</button>
      </div>
      {attending && (
        <div className="rsvp-fields">
          <label>
            Vosso nome
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Como vos chamais?" />
          </label>
          {attending !== "no" && (
            <div className="rsvp-guests">
              <span>Levareis acompanhante?</span>
              {guests.map((guest, index) => (
                <div className="rsvp-guest-row" key={index}>
                  <input
                    value={guest.name}
                    onChange={(e) => setGuests((c) => c.map((g, i) => (i === index ? { name: e.target.value } : g)))}
                    placeholder={`Nome do acompanhante ${index + 1}`}
                  />
                  <button type="button" onClick={() => setGuests((c) => c.filter((_, i) => i !== index))} aria-label="Remover acompanhante">✕</button>
                </div>
              ))}
              <button type="button" className="rsvp-add" onClick={() => setGuests((c) => [...c, { name: "" }])}>＋ Adicionar acompanhante</button>
            </div>
          )}
          <button type="submit" className="btn btn-wine" disabled={status === "sending"}>{status === "sending" ? "Enviando..." : "Confirmar resposta"}</button>
          {status === "error" && <p className="rsvp-error">{FORMSPREE_ENDPOINT ? "Não consegui enviar. Tenta de novo em instantes." : "O formulário ainda não está ativo."}</p>}
        </div>
      )}
    </form>
  );
}


/** Easter egg: tocar 3 vezes no brasão revela os cavaleiros do reino. */
function KnightsModal({ onClose }: { onClose: () => void }) {
  const [missing, setMissing] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  return (
    <div className="knights-backdrop" role="dialog" aria-modal="true" aria-label="Os cavaleiros do reino" onClick={onClose}>
      <div className="knights-sheet" onClick={(e) => e.stopPropagation()}>
        <Parchment>
          <p className="section-number">Segredo do reino</p>
          <h2>Os <em>cavaleiros</em> do reino</h2>
          <Divider className="divider" />
          {missing ? (
            <p className="center">O retrato dos cavaleiros ainda está sendo pintado pelos artesãos do reino.</p>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="knights-img" src={`${BASE_PATH}/arte/cavaleiros.webp`} alt="Beatriz e Ernesto como cavaleiros do reino" onError={() => setMissing(true)} />
          )}
          <p className="center knights-caption">Sir Ernesto e Lady Beatriz juram guardar a noite de 17 de outubro.</p>
          <div className="actions">
            <button className="btn btn-wine" onClick={onClose}>Fechar o pergaminho</button>
          </div>
        </Parchment>
      </div>
    </div>
  );
}

const DATE_LONG = EVENT_DATE.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "America/Manaus" });

export default function Home() {
  const [knights, setKnights] = useState(false);
  const taps = useRef({ n: 0, t: 0 });
  function crestTap() {
    const now = Date.now();
    taps.current.n = now - taps.current.t < 900 ? taps.current.n + 1 : 1;
    taps.current.t = now;
    if (taps.current.n >= 3) {
      taps.current.n = 0;
      setKnights(true);
    }
  }

  return (
    <main>
      <Sky />
      {knights && <KnightsModal onClose={() => setKnights(false)} />}

      {/* 1 · Capa */}
      <section className="hero" id="inicio">
        <Moon className="hero-moon" />
        <Star className="hero-star hs1" />
        <Star className="hero-star hs2" />
        <Star className="hero-star hs3" />
        <img className="hero-cloud hc-l" src={`${BASE_PATH}/nuvem.png`} alt="" aria-hidden="true" />
        <img className="hero-cloud hc-r" src={`${BASE_PATH}/nuvem.png`} alt="" aria-hidden="true" />
        <Castle className="hero-castle" />
        <Parchment className="hero-sheet">
          <p className="eyebrow">Por decreto do reino</p>
          <h1><span>{COUPLE.first}</span><em>&amp;</em><span>{COUPLE.second}</span></h1>
          <Divider className="divider" />
          <p className="decree">convidam vossa senhoria para uma noite medieval de banquete, lua e boas histórias.</p>
          <div className="date-lockup">
            <span>Sábado</span>
            <strong>XVII · X · MMXXVI</strong>
            <span>17 de outubro de 2026 · às {TIME}</span>
          </div>
          <div className="actions">
            <button className="btn btn-wine" onClick={saveCalendar}>＋ Salvar na agenda</button>
            <a className="btn btn-ghost" href="#presenca">Confirmar presença</a>
          </div>
        </Parchment>
        <a className="scroll" href="#decreto">deslizai para ler o decreto ↓</a>
      </section>

      <div className="ribbon" aria-hidden="true">
        <div>Que a lua nos guie, as estrelas nos reúnam e o banquete seja longo ✦ Que a lua nos guie, as estrelas nos reúnam e o banquete seja longo ✦ Que a lua nos guie, as estrelas nos reúnam e o banquete seja longo ✦ Que a lua nos guie, as estrelas nos reúnam e o banquete seja longo ✦ </div>
      </div>

      {/* 2 · O decreto */}
      <section className="block" id="decreto">
        <div className="container two-col">
          <Reveal>
            <Parchment>
              <p className="section-number">I · O decreto</p>
              <h2>Vinde <em>celebrar</em> conosco</h2>
              <Divider className="divider" />
              <p>Por decreto do reino, {COUPLE.first} e {COUPLE.second} convidam vossa senhoria para uma noite medieval de banquete, lua cheia e céu estrelado.</p>
              <p>Boa companhia, boas histórias e mais um ano para celebrar.</p>
            </Parchment>
          </Reveal>
          <Reveal className="crest-wrap" delay={150}>
            <img className="crest" onClick={crestTap} src={`${BASE_PATH}/arte/brasao.webp`} alt="Brasão de Beatriz e Ernesto, com lua, estrela e as iniciais B & E" width={760} height={1013} />
            <Star className="crest-star cs1" />
            <Star className="crest-star cs2" />
          </Reveal>
        </div>
      </section>

      {/* 4 · Detalhes */}
      <section className="block" id="detalhes">
        <div className="container">
          <Reveal className="title-center">
            <p className="section-number light">II · Do dia e do lugar</p>
            <h2 className="light">Vós estais <em>convidados</em></h2>
          </Reveal>
          <div className="seals">
            <Reveal><article className="seal-card">
              <Seal className="seal"><text x="50" y="62" textAnchor="middle" fontSize="38" fill="#e8c46a" fontFamily="Uncial Antiqua, serif">17</text></Seal>
              <span>Data</span><strong>{DATE_LONG}</strong>
            </article></Reveal>
            <Reveal delay={120}><article className="seal-card">
              <Seal className="seal"><circle cx="50" cy="50" r="20" fill="none" stroke="#e8c46a" strokeWidth="3" /><path d="M50 36 V50 L60 56" stroke="#e8c46a" strokeWidth="3" fill="none" strokeLinecap="round" /></Seal>
              <span>Horário</span><strong>{TIME}</strong>
            </article></Reveal>
            <Reveal delay={240}><article className="seal-card">
              <Seal className="seal"><path d="M50 26 C38 26 32 36 32 44 C32 58 50 76 50 76 C50 76 68 58 68 44 C68 36 62 26 50 26Z" fill="none" stroke="#e8c46a" strokeWidth="3" /><circle cx="50" cy="44" r="6" fill="#e8c46a" /></Seal>
              <span>Local</span><strong>{VENUE.name}</strong><small>{VENUE.address}</small>
              <a className="link" href={MAPS_URL} target="_blank" rel="noopener noreferrer">Ver no mapa ↗</a>
            </article></Reveal>
          </div>
          <Reveal className="title-center"><Countdown date={EVENT_DATE} /></Reveal>
        </div>
      </section>

      {/* 5 · Presença */}
      <section className="block" id="presenca">
        <div className="container two-col rsvp-grid">
          <Reveal>
            <Parchment>
              <p className="section-number">III · Resposta ao reino</p>
              <h2>Vós vindes ao <em>banquete</em>?</h2>
              <Divider className="divider" />
              <p>Enviai vosso nome para que seja incluído na lista e dizei se levais alguém convosco.</p>
              <RsvpForm />
            </Parchment>
          </Reveal>
          <Reveal className="quill-wrap" delay={150}>
            <Oracle />
            <Candle className="candle c1" />
            <Candle className="candle c2" />
          </Reveal>
        </div>
      </section>

      {/* 7 · Encerramento */}
      <section className="closing">
        <Moon className="closing-moon" />
        <Candle className="candle cl1" />
        <Candle className="candle cl2" />
        <Reveal className="closing-copy">
          <Goblet className="closing-goblet" />
          <p className="eyebrow light">{COUPLE.first} &amp; {COUPLE.second}</p>
          <h2 className="light">Mais um ano em volta do <em>sol</em></h2>
          <p className="light-note">Venha brindar com a gente mais uma volta ao redor do sol.</p>
          <div className="actions center-actions">
            <button className="btn btn-gold" onClick={saveCalendar}>＋ Salvar na agenda</button>
            <a className="btn btn-ghost-light" href="#presenca">Confirmar presença</a>
          </div>
        </Reveal>
        <Castle className="closing-castle" />
      </section>

      <footer>
        <span>{COUPLE.first} &amp; {COUPLE.second}</span>
        <span>✦ Save the Date · 17.10.2026 ✦</span>
      </footer>
    </main>
  );
}
