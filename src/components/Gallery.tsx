"use client";

import Image from "next/image";
import { useState } from "react";
import type { Media } from "@/content/media";
import { Lightbox } from "./Lightbox";

export function Gallery({ images }: { images: Media[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <ul className="mosaic">
        {images.map((img, i) => (
          <li key={img.src} className="mosaic__item">
            <button type="button" className="mosaic__btn" onClick={() => setOpen(i)} aria-label={`View ${img.alt}`}>
              <Image src={img.src} alt="" fill sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 40vw" />
              <span className="mosaic__caption">{img.alt}</span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={images} index={open} onIndex={setOpen} />
    </>
  );
}
