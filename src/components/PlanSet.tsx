"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { Sheet } from "@/content/projects";
import { Lightbox } from "./Lightbox";

export function PlanSet({ sheets }: { sheets: Sheet[] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const sheet = sheets[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    const next = (active + dir + sheets.length) % sheets.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="planset">
      <div className="planset__tabs" role="tablist" aria-label="Drawing sheets" onKeyDown={onKeyDown}>
        {sheets.map((s, i) => (
          <button
            key={s.label}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel`}
            tabIndex={i === active ? 0 : -1}
            className="planset__tab"
            onClick={() => setActive(i)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} className="planset__panel">
        <button type="button" className="planset__sheet" onClick={() => setOpen(active)} aria-label={`Open ${sheet.image.alt} full screen`}>
          <Image
            key={sheet.image.src}
            src={sheet.image.src}
            alt={sheet.image.alt}
            width={sheet.image.width}
            height={sheet.image.height}
            sizes="(max-width: 1000px) 100vw, 70vw"
            className="planset__img"
          />
          <span className="planset__expand">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            </svg>
            Zoom
          </span>
        </button>
        <p className="planset__caption">{sheet.image.alt}</p>
      </div>

      <Lightbox items={sheets.map((s) => s.image)} index={open} onIndex={setOpen} zoomable />
    </div>
  );
}
