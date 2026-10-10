"use client";

import { useEffect, useState } from "react";
import Hero from "./Hero";

const COUPLE = { first: "Beatriz", second: "Ernesto" };
const TIME = "19h30";
const VENUE = { name: "Velho Monge", address: "R. Feira de Santana, 17 - Parque 10 de Novembro" };
const EVENT_DATE: Date | null = new Date("2026-10-17T19:30:00-04:00");
// TODO: trocar pelo formulário do casal (https://formspree.io/f/xxxx). Vazio = formulário desativado.
const FORMSPREE_ENDPOINT = "";

const MOOD_SLOTS = 8;

function pad(value: number) {
  return String(Math.max(0, value)).padStart(2, "0");
}

function Countdown({ date }: { date: Date }) {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const difference = Math.max(0, date.getTime() - Date.now());
      setRemaining({
        days: Math.floor(difference / 86400000),
        hours: Math.floor((difference / 3600000) % 24),
        minutes: Math.floor((difference / 60000) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [date]);

  return (
    <div className="countdown" aria-label="Contagem regressiva para a festa">
      {Object.entries(remaining).map(([key, value]) => (
        <div className="countdown-item" key={key}>
          <strong>{key === "days" ? value : pad(value)}</strong>
          <span>{({ days: "dias", hours: "horas", minutes: "min", seconds: "seg" } as Record<string, string>)[key]}</span>
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
    "BEGIN:VEVENT", "UID:beatriz-ernesto-halloween@save-the-date", `DTSTAMP:${f(new Date())}`,
    `DTSTART:${f(date)}`, `DTEND:${f(new Date(date.getTime() + 5 * 3600000))}`,
    "SUMMARY:Festa de Beatriz e Ernesto",
    `LOCATION:${VENUE.name} - ${VENUE.address}`.replace(/,/g, "\\,"),
    `DESCRIPTION:Noite medieval\\, lua e estrelas. Horário: ${TIME}.`,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
}

function saveCalendar() {
  if (!EVENT_DATE) return;
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

  function addGuest() {
    setGuests((current) => [...current, { name: "" }]);
  }

  function updateGuest(index: number, value: string) {
    setGuests((current) => current.map((guest, i) => (i === index ? { name: value } : guest)));
  }

  function removeGuest(index: number) {
    setGuests((current) => current.filter((_, i) => i !== index));
  }

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
      <div className="rsvp-card rsvp-sent">
        <p>✦ Resposta enviada!</p>
        <h3>{attending === "yes" ? "Vossa presença será celebrada no banquete!" : attending === "maybe" ? "O reino aguardará com esperança!" : "Que pena, fareis falta ao banquete!"}</h3>
      </div>
    );
  }

  return (
    <form className="rsvp-card" onSubmit={handleSubmit}>
      <div className="rsvp-toggle">
        <button type="button" className={attending === "yes" ? "is-active" : ""} onClick={() => setAttending("yes")}>Eu vou ✦</button>
        <button type="button" className={attending === "maybe" ? "is-active" : ""} onClick={() => setAttending("maybe")}>Talvez</button>
        <button type="button" className={attending === "no" ? "is-active" : ""} onClick={() => setAttending("no")}>Não vou poder</button>
      </div>

      {attending && (
        <div className="rsvp-fields">
          <label>
            Seu nome
            <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Como você se chama?" />
          </label>

          {(attending === "yes" || attending === "maybe") && (
            <div className="rsvp-guests">
              <span>Vai levar acompanhante?</span>
              {guests.map((guest, index) => (
                <div className="rsvp-guest-row" key={index}>
                  <input
                    value={guest.name}
                    onChange={(event) => updateGuest(index, event.target.value)}
                    placeholder={`Nome do acompanhante ${index + 1}`}
                  />
                  <button type="button" onClick={() => removeGuest(index)} aria-label="Remover acompanhante">✕</button>
                </div>
              ))}
              <button type="button" className="rsvp-add" onClick={addGuest}>＋ Adicionar acompanhante</button>
            </div>
          )}

          <button type="submit" className="button primary" disabled={status === "sending"}>
            {status === "sending" ? "Enviando..." : "Confirmar resposta"}
          </button>
          {status === "error" && (
            <p className="rsvp-error">
              {FORMSPREE_ENDPOINT ? "Não consegui enviar. Tenta de novo em instantes." : "O formulário ainda não está ativo."}
            </p>
          )}
        </div>
      )}
    </form>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="stars" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => <i key={index} style={{ left: `${(index * 37) % 100}%`, top: `${(index * 53) % 100}%`, animationDelay: `${-index * 0.4}s`, scale: 0.6 + (index % 4) * 0.5 }} />)}
    </div>
  );
}

export default function Home() {
  const dateLabel = EVENT_DATE ? "Data" : "Data em breve";

  return (
    <main>
      <Hero variant="a" dateLabel="Sáb · 17.10.2026" time={TIME} />

      <section className="ticker" aria-hidden="true"><div>✦ POR DECRETO DO REINO ✦ BANQUETE ✦ LUA ✦ ESTRELAS ✦ BOAS HISTÓRIAS ✦ POR DECRETO DO REINO ✦ BANQUETE ✦ LUA ✦ ESTRELAS ✦ BOAS HISTÓRIAS</div></section>

      <section className="intro section" id="tema">
        <div className="section-number">01 / O TEMA</div>
        <div className="intro-grid">
          <div className="intro-copy">
            <h2>Venha <em>celebrar</em> com a gente!</h2>
            <div className="body-copy">
              <p>Por decreto do reino, {COUPLE.first} e {COUPLE.second} convidam vossa senhoria para uma noite medieval de banquete, lua cheia e céu estrelado.</p>
              <p>Boa companhia, boas histórias e mais um ano para celebrar.</p>
              <p><b>Não precisa usar fantasia.</b> A ideia é apenas entrar no clima da noite do jeito que você se sentir confortável.</p>
            </div>
          </div>
          <div className="slot slot-tall" data-slot="intro">imagem do tema</div>
        </div>
      </section>

      <section className="dress section">
        <div className="section-number light">02 / DICAS</div>
        <div className="dress-heading">
          <h2>Anota essas <span>dicas</span></h2>
          <p>Para quem quiser entrar no clima</p>
        </div>
        <div className="tips-grid">
          <article className="tip-card">
            <span>Veludo e brocado</span>
            <p>Tons de vinho, azul-noite, dourado e verde-musgo combinam com a noite.</p>
          </article>
          <article className="tip-card">
            <span>Pequenos detalhes</span>
            <p>Uma coroa, uma capa, um anel ou um broche já contam. Fantasia completa é opcional.</p>
          </article>
          <article className="tip-card">
            <span>Do jeito que ficar bem</span>
            <p>Conforto em primeiro lugar: o importante é aparecer.</p>
          </article>
          <article className="tip-card tip-card-note">
            <span>Sobre o local</span>
            <p>{VENUE.name}, no Parque 10 de Novembro.</p>
          </article>
        </div>
        <p className="only-rule">A única regra é <em>vir se divertir!</em></p>
      </section>

      <section className="details section" id="detalhes">
        <div className="section-number">03 / ANOTE AÍ</div>
        <div className="details-title"><p>vós estais convidados</p><h2>{COUPLE.first}<br /><em>&</em><br />{COUPLE.second}</h2></div>
        <div className="detail-cards">
          <article><span>Data</span><strong>{EVENT_DATE ? EVENT_DATE.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : dateLabel}</strong></article>
          <article><span>Horário</span><strong>{TIME}</strong></article>
          <article><span>Local</span><strong>{VENUE.name}</strong><small>{VENUE.address}</small></article>
        </div>
        {EVENT_DATE && <Countdown date={EVENT_DATE} />}
      </section>

      <section className="rsvp section" id="presenca">
        <div className="section-number">04 / VOCÊ VAI?</div>
        <div className="rsvp-heading">
          <h2>Confirme sua<br /><em>presença</em></h2>
          <p>Conte pra gente se você vem e se leva alguém junto.</p>
        </div>
        <div className="rsvp-form-wrap">
          <RsvpForm />
        </div>
      </section>

      <section className="gallery section">
        <div className="section-number">05 / REFERÊNCIAS</div>
        <div className="refs-heading">
          <h2>Mood da<br /><em>noite</em></h2>
          <p>Algumas referências de look e clima pra te inspirar.</p>
        </div>
        <div className="moodboard">
          {Array.from({ length: MOOD_SLOTS }, (_, index) => (
            <div key={index} className="slot" data-slot={`mood-${index + 1}`}>referência {index + 1}</div>
          ))}
        </div>
      </section>

      <section className="mission section">
        <div className="mission-card">
          <p className="section-number light">06 / PRA NÃO ESQUECER</p>
          <h2>Até o banquete...</h2>
          <ol>
            <li><b>01</b><span>Reservar a data.</span><i>○</i></li>
            <li><b>02</b><span>Separar um detalhe medieval (se quiser).</span><i>○</i></li>
            <li><b>03</b><span>Confirmar presença ao reino.</span><i>○</i></li>
            <li><b>04</b><span>Anotar o endereço: {VENUE.name}.</span><i>○</i></li>
          </ol>
          <p className="mission-foot">O resto vem depois —<br /><em>por enquanto, só guarde a data.</em></p>
        </div>
      </section>

      <section className="closing section">
        <Stars count={20} />
        <p className="closing-top">{COUPLE.first} & {COUPLE.second} —</p>
        <h2>vós vindes ao <em>banquete</em>?</h2>
        <div className="actions centered">
          {EVENT_DATE && <button className="button primary" onClick={saveCalendar}>＋ Salvar na agenda</button>}
          <a className="button ghost" href="#presenca">Confirmar presença ☾</a>
        </div>
        <p className="last-line">Boa companhia, boas histórias e mais um ano para celebrar.</p>
      </section>
      <footer>
        <div className="footer-row">
          <span>{COUPLE.first} & {COUPLE.second}</span>
          <span>✦ Save the Date ✦</span>
        </div>
      </footer>
    </main>
  );
}
