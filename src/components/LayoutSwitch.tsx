"use client";

import Image from "next/image";
import { useState } from "react";
import type { Sheet } from "@/content/projects";

export function LayoutSwitch({ options }: { options: Sheet[] }) {
  const [active, setActive] = useState(0);
  const first = options[0].image;

  return (
    <div className="switch">
      <div className="switch__stage" style={{ aspectRatio: `${first.width} / ${first.height}` }}>
        {options.map((o, i) => (
          <Image
            key={o.image.src}
            src={o.image.src}
            alt={o.image.alt}
            fill
            sizes="(max-width: 1000px) 100vw, 70vw"
            className="switch__img"
            data-active={i === active}
            aria-hidden={i !== active}
          />
        ))}
      </div>
      <div className="switch__controls" role="group" aria-label="Classroom arrangement">
        {options.map((o, i) => (
          <button
            key={o.label}
            type="button"
            aria-pressed={i === active}
            className="switch__option"
            onClick={() => setActive(i)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
