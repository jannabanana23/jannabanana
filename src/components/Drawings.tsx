"use client";

import Image from "next/image";
import { useState } from "react";
import type { Media } from "@/content/media";
import { Lightbox } from "./Lightbox";

// Portrait sheets (like an exploded axonometric) sit in a sticky column on the
// left while the landscape drawings scroll past on the right.
export function Drawings({ images }: { images: Media[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const tall = images.filter((m) => m.height > m.width);
  const wide = images.filter((m) => m.height <= m.width);

  const figure = (img: Media) => (
    <figure key={img.src} className="drawing">
      <button type="button" className="drawing__btn" onClick={() => setOpen(images.indexOf(img))} aria-label={`Zoom into ${img.alt}`}>
        <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(max-width: 1000px) 100vw, 60vw" />
      </button>
      <figcaption className="drawing__caption">{img.alt}</figcaption>
    </figure>
  );

  return (
    <>
      <div className={tall.length ? "drawings drawings--split" : "drawings"}>
        {tall.length > 0 && <div className="drawings__tall">{tall.map(figure)}</div>}
        <div className="drawings__wide">{wide.map(figure)}</div>
      </div>
      <Lightbox items={images} index={open} onIndex={setOpen} zoomable />
    </>
  );
}
