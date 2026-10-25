"use client";

import { useEffect, useId, useState } from "react";

const TOPICS = ["Job opportunity", "Residential", "Commercial", "Interior", "Collaboration", "Something else"];

// A request-for-information sheet. There is no backend: sending opens the
// visitor's email app with the subject and message already filled in.
export function RfiForm({ email }: { email: string }) {
  const id = useId();
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "missing" | "sent">("idle");
  // set after mount so the server render and the visitor's timezone can't disagree
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }));
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setState("missing");
      return;
    }
    const subject = `RFI: ${topic}${name.trim() ? ` from ${name.trim()}` : ""}`;
    const body = `${message.trim()}\n\n${name.trim() || ""}`.trim();
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setState("sent");
  };

  return (
    <form className="rfi" onSubmit={onSubmit} noValidate data-cad-ignore>
      <header className="rfi__head">
        <span className="rfi__title">Request for information</span>
        <span className="rfi__meta">
          RFI 001
          <br />
          {today}
        </span>
      </header>

      <div className="rfi__row">
        <span className="rfi__label">To</span>
        <span>Janna Darlene P. Sagaysay</span>
      </div>

      <label className="rfi__row" htmlFor={`${id}-name`}>
        <span className="rfi__label">From</span>
        <input id={`${id}-name`} className="rfi__input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name and studio" autoComplete="name" />
      </label>

      <div className="rfi__row" role="radiogroup" aria-labelledby={`${id}-topic-label`}>
        <span id={`${id}-topic-label`} className="rfi__label">Regarding</span>
        <div className="rfi__topics">
          {TOPICS.map((t) => (
            <label key={t} className="rfi__topic">
              <input type="radio" name={`${id}-topic`} value={t} checked={topic === t} onChange={() => setTopic(t)} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </div>

      <label className="rfi__row rfi__row--message" htmlFor={`${id}-message`}>
        <span className="rfi__label">Message</span>
        <textarea
          id={`${id}-message`}
          className="rfi__input rfi__textarea"
          rows={5}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (state === "missing") setState("idle");
          }}
          placeholder="Project, timeline, or the role you have in mind"
          aria-invalid={state === "missing"}
          aria-describedby={`${id}-status`}
        />
      </label>

      <footer className="rfi__foot">
        <p id={`${id}-status`} className="rfi__status" aria-live="polite" data-state={state}>
          {state === "missing" && "Add a message so Janna knows what this is about."}
          {state === "sent" && "Your email app should open with this filled in. If it doesn't, use the address on the left."}
          {state === "idle" && "Opens your email app with this filled in."}
        </p>
        <button type="submit" className="rfi__send">Send RFI</button>
      </footer>
    </form>
  );
}
